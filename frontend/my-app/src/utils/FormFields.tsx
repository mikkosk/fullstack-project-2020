import React from 'react'
import { ErrorMessage, Field, FieldProps, FormikProps, FieldArray } from 'formik'
import { Dropdown, DropdownProps, Form, Button } from 'semantic-ui-react'

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
}

export const TypeField: React.FC<TypeProps> = ({label, name}: TypeProps) => (
    <Form.Field>
        <label>{label}</label>
        <Field as="select" className="ui dropdown" name={name}>
            <option value="Customer" label="Asiakas" />
            <option value="Admin" label="Ylläpitäjä" />
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