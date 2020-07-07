import React from 'react'
import { ReservedTour } from '../../types'
import { Formik } from 'formik'

type NewReserved = Pick<ReservedTour, 
    "chosenLanguage" | "groupName" | "numberOfPeople" | "groupAge" | "paymentMethod" | "time" | "date" | "email" | "groupInfo">

interface Props {
    onSubmit: (values: NewReserved) => void;
    onCancel: () => void;
}

const initialValues:NewReserved = {
    chosenLanguage: "",
    groupName: "",
    numberOfPeople: 0,
    groupAge: "",
    paymentMethod: "Cash",
    time: "",
    date: "",
    email: "",
    groupInfo: ""
}

const AddReservedForm: React.FC<Props> = ({ onSubmit, onCancel}) => {
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
            onSubmit(values)
            resetForm()
        }}
        validate={ values => {
            const requiredError = "Kenttä vaaditaan";
            const errors: { [field: string]: string | object} = {};
            if(values.possibleLanguages.length === 0) {
                errors.possibleLanguages = requiredError
            }
            if(!values.lengthInMinutes) {
                errors.lengthInMinutes = requiredError
            }
            if(!values.tourName) {
                errors.tourName = requiredError
            }
            if(!values.maxNumberOfPeople) {
                errors.maxNumberOfPeople = requiredError
            }
            if(!values.price) {
                errors.price = requiredError
            } 
            return errors;
        }
        }
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched}) => {
            return (
                <Form className="form ui">
                    <Field
                        label="Opastuksen nimi"
                        placeholder="Opastuksen nimi"
                        name="tourName"
                        component={TextField}
                    />
                    <Field
                        label="Opastuksen kielet"
                        name="possibleLanguages"
                        component={ArrayField}
                        values={values.possibleLanguages}
                    />
                    <Field
                        label="Opastuksen kesto"
                        placeholder="Opastuksen kesto"
                        name="lengthInMinutes"
                        component={NumberField}
                        min={0}
                        max={1000}
                    />
                    <Field
                        label="Opastuksen hinta"
                        placeholder="Opastuksen hinta"
                        name="price"
                        component={NumberField}
                        min={0}
                        max={1000}
                    />
                    <Field
                        label="Opastuksen maksimikoko"
                        placeholder="Opastuksen maksimikoko"
                        name="maxNumberOfPeople"
                        component={NumberField}
                        min={0}
                        max={1000}
                    />
                    <Field
                        label="Opastuksen lisätiedot"
                        placeholder="Opastuksen lisätiedot"
                        name="tourInfo"
                        component={TextField}
                    />
                    <Button type="submit" name="submit" disabled={!dirty || !isValid}>
                        Lisää!
                    </Button>
                    {initialTour && <Button onClick={onCancel} name="cancelForm" color="red">Peruuta</Button>}
                </Form>
            )
        }}
        </Formik>
    )
}