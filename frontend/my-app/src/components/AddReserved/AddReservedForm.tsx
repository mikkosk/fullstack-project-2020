import React from 'react'
import { ReservedTour, Museum, GuidedTour, OptionField } from '../../types'
import { Formik, Field, Form } from 'formik'
import { TextField, SelectField, SelectArrayField, NumberField, DateField } from '../../utils/FormFields'
import { Button } from 'semantic-ui-react'

type NewReserved = Pick<ReservedTour, 
    "chosenLanguage" | "groupName" | "numberOfPeople" | "groupAge" | "paymentMethod" | "time" | "date" | "email" | "groupInfo">

interface Props {
    onSubmit: (values: NewReserved) => void;
    onCancel: () => void;
    tour: GuidedTour;
    museum: Museum;
}

const initialValues:NewReserved = {
    chosenLanguage: "",
    groupName: "",
    numberOfPeople: 0,
    groupAge: "",
    paymentMethod: "Cash",
    time: "10:00",
    date: "",
    email: "",
    groupInfo: ""
}

const paymentOptions: OptionField[] = [
    {label: "Käteinen", value: "Cash"},
    {label: "Lasku", value: "Bill"},
    {label: "Maksukortti", value: "Card"},
    {label: "Jokin muu, tarkenna lisätiedoissa", value: "Other"}
]

const AddReservedForm: React.FC<Props> = ({ onSubmit, onCancel, tour, museum}) => {
    return (
        <Formik
        initialValues={{...initialValues, chosenLanguage: Object.values(tour.possibleLanguages)[0]}}
        onSubmit={(values, { resetForm }) => {
            onSubmit(values)
            resetForm()
        }}
        validate={ values => {
            console.log(values)
            const requiredError = "Kenttä vaaditaan";
            const errors: { [field: string]: string | object} = {};
            if(!values.chosenLanguage) {
                errors.chosenLanguage = requiredError
            }
            if(!values.groupName) {
                errors.groupName = requiredError
            }
            if(!values.numberOfPeople) {
                errors.numberOfPeople = requiredError
            }
            if(values.numberOfPeople > tour.maxNumberOfPeople) {
                errors.numberOfPeople = `Liian monta osallistujaa. Max. ${tour.maxNumberOfPeople}`
            }
            if(!values.groupAge) {
                errors.groupAge = requiredError
            }
            if(!values.paymentMethod) {
                errors.paymentMethod = requiredError
            } 
            if(!values.time) {
                errors.time = requiredError
            }
            if(!values.date) {
                errors.date = requiredError
            }
            if(!values.email) {
                errors.email = requiredError
            }
            return errors;
        }
        }
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched}) => {
            console.log(errors)
            console.log(isValid)
            console.log(dirty)
            return (
                <Form className="form ui">
                    <Field
                        label="Ryhmän nimi"
                        placeholder="Ryhmän nimi"
                        name="groupName"
                        component={TextField}
                    />
                    <SelectArrayField
                        label="Valittu kieli"
                        name="chosenLanguage"
                        options={tour.possibleLanguages}
                    />
                    <Field
                        label="Osallistujien määrä"
                        placeholder="Osallistujien määrä"
                        name="numberOfPeople"
                        component={NumberField}
                        min={1}
                        max={tour.maxNumberOfPeople}
                    />
                    <Field
                        label="Osallistujien ikäryhmä"
                        placeholder="Osallistujien ikäryhmä"
                        name="groupAge"
                        component={TextField}
                    />
                    <SelectField
                        label="Maksutapa"
                        name="paymentOptions"
                        options={paymentOptions}
                    />
                    <DateField
                        name="date"
                    />
                    <Field
                        label="Lisätiedot"
                        placeholder="Lisätiedot"
                        name="groupInfo"
                        component={TextField}
                    />

                    <Field
                        label="Sähköposti"
                        placeholder="Sähköposti"
                        name="email"
                        component={TextField}
                    />

                    <Field
                        label="Time"
                        placeholder="Time"
                        name="time"
                        component={TextField}
                    />

                    <Button type="submit" name="submit" disabled={!isValid}>
                        Lisää!
                    </Button>
                    <Button onClick={onCancel} name="cancelForm" color="red">Peruuta</Button>
                </Form>
            )
        }}
        </Formik>
    )
}

export default AddReservedForm