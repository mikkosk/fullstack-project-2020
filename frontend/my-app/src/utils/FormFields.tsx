import React from 'react'
import { ErrorMessage, Field, FieldProps, FieldArray, useFormikContext, useField } from 'formik'
import { Form, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import { OptionField, Museum, ReservedTour, GuidedTour } from '../types';
import DatePicker from 'react-datepicker'
import { museumHoursArray, compareTime, addTime, dateToString, isTime } from './DateTimeFunctions';

interface NumberProps extends FieldProps {
    label: string,
    max: number,
    min: number,
    placeholder: string
}

export const NumberField: React.FC<NumberProps> = ({field, label, min, max, placeholder}) => (
    <Form.Field>
        <label>{label}</label>
        <Field placeholder={placeholder} {...field} type="number" min={min} max={max} />
        <div style={{ color:"red"}}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
);

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
}

export const TextField: React.FC<TextProps> = ({field, label, placeholder}) => (
    <Form.Field>
        <label>{label}</label>
        <Field placeholder={placeholder} {...field}/>
        <div style={{ color:"red"}}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
)

interface TypeProps {
    label: string;
    name: string;
    options: OptionField[];
}

export const SelectField: React.FC<TypeProps> = ({label, name, options}: TypeProps) => (
    <Form.Field>
        <label>{label}</label>
        <Field as="select" className="ui dropdown" name={name}>
            {options.map((o: OptionField) => 
                <option key={o.label} value={o.value}>{o.label}</option>
            )}
        </Field>
    </Form.Field>
)


interface SelectArrayProps {
    label: string;
    name: string;
    options: string[];
}

export const SelectArrayField: React.FC<SelectArrayProps> = ({label, name, options}) => (
    <Form.Field>
        <label>{label}</label>
        <Field as="select" className="ui dropdown" name={name}>
            {options.map((o: string) => 
                <option key={o} value={o}>{o}</option>
            )}
        </Field>
    </Form.Field>
)

export const SelectTwoField: React.FC<SelectArrayProps & {optionsTwo: string}[]> = ({label, name, options}) => (
    <Form.Field>
        <label>{label}</label>
        <Field as="select" className="ui dropdown" name={name}>
            {options.map((o: string) => 
                <option key={o} value={o}>{o}</option>
            )}
        </Field>
    </Form.Field>
)

interface ArrayProps extends FieldProps {
    label: string;
    values: string[]
}
export const ArrayField: React.FC<ArrayProps> = ({field, label, values}) => (
    <Form.Field>
        <label>{label}</label>
        <FieldArray
                        name="possibleLanguages"
                        render={arrayHelpers => (
                            <div>
                                {values && values.length > 0 ? (
                                    values.map((language, index) => (
                                        <div key={index}>
                                            <Field name={`possibleLanguages.${index}`} />
                                            <Button type="button" onClick={() => arrayHelpers.remove(index)}>-</Button>
                                            <Button type="button" onClick={() => arrayHelpers.insert(index, '')}>+</Button>
                                        </div>
                                    ))
                                ) : (
                                    <Button type="button" onClick={() => arrayHelpers.push('')}>Lisää kieli</Button>
                                )}
                            </div>
                        )}
                    />
        <div style={{ color:"red"}}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
)

export const DateField: React.FC<{name: string}> = ({name}) => {
    const { setFieldValue } = useFormikContext()
    const [field] = useField(name)
    return (
        <div>
            <DatePicker 
                selected={(field.value && new Date(field.value)) || null}
                onChange={(value: Date) => {
                    setFieldValue(field.name, value)
                    setFieldValue("time", "")
                }}
                inline
            />
        </div>
    )
}

export const TimeField: React.FC<{museum: Museum, name: string, date: Date, tour: GuidedTour}> = ({museum, name, date, tour}) => {
    const possibleTimes = () => {
        const weekday = date.getDay()
        const openingHours = museumHoursArray(true, museum)
        const closingHours = museumHoursArray(false, museum)
        const start = openingHours[weekday]
        const end = closingHours[weekday]
        const reservedTours = museum.reservedTours.filter((r: ReservedTour) => dateToString(new Date(r.date)) === dateToString(new Date(date)))
        let possible: string[] =[]
        let time = start
        
        if (start === "Suljettu" || end === "Suljettu" ||  (dateToString(new Date()) === dateToString(date)) || new Date() > date
            || !isTime(start) || !isTime(end)
        ) {
            return []
        }

        while(compareTime(time, addTime(end, (-tour.lengthInMinutes))) < 1) {
            const currentTime = time
            const overlapping = reservedTours.find((r: ReservedTour) => r.time === currentTime)
            if(!overlapping) {
                possible = possible.concat(time)
                time = addTime(time, 15)
            }
            else {
                time = addTime(time, overlapping.lengthInMinutes - (overlapping.lengthInMinutes % 15))
                if(overlapping.lengthInMinutes % 15 !== 0) {
                    time = addTime(time, 15)
                }
            }
        }
        return possible
    }
    const { setFieldValue } = useFormikContext()
    const [field] = useField(name)
    const times = possibleTimes()
    return (
        <div>
            <Header>Valittu aika: {field.value}</Header>
            <Grid centered columns={5}>
                {times.length !== 0 && times.map((t:string) => 
                    <GridColumn key={t}>
                        <b onClick={() => setFieldValue(field.name, t)}>{t}</b>
                    </GridColumn>
                )}
                {times.length === 0 && 
                <Header>Ei vapaita aikoja</Header>
                }
            </Grid>
        </div>
    )
}