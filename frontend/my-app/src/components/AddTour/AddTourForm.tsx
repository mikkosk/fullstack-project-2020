import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NumberField, TextField, ArrayField } from "../../utils/FormFields";
import { NewTour } from "../../types";

interface Props {
    onSubmit: (values: NewTour) => void;
    onCancel: () => void;
    initialTour?: NewTour
}

const initialValues: NewTour = {
    possibleLanguages: [""],
    lengthInMinutes: 0,
    tourName: "",
    maxNumberOfPeople: 0,
    price: 0,
    tourInfo: ""
}
export const AddTourForm: React.FC<Props> = ({ onSubmit, onCancel, initialTour }) => {
    return (
        <Formik
        initialValues={initialTour || initialValues}
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
                        fieldName="possibleLanguages"
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

export default AddTourForm