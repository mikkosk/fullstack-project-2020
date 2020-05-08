import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, ErrorMessage, getIn, FieldArray } from "formik";
import { NumberField, TextField } from "./FormFields";

interface Props {
    onSubmit: (values: any) => void;
    onCancel: () => void;
}

const initialValues = {
            possibleLanguages: ["here"],
            lengthInMinutes: "",
            tourName: "",
            maxNumberOfPeople: "",
            price: "",
            tourInfo: ""
}
export const AddTourForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
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
                    <FieldArray
                        name="possibleLanguages"
                        render={arrayHelpers => (
                            <div>
                                {values.possibleLanguages && values.possibleLanguages.length > 0 ? (
                                    values.possibleLanguages.map((language, index) => (
                                        <div key={index}>
                                            <Field name={`possibleLanguages.${index}`} />
                                            <Button type="button" onClick={() => arrayHelpers.remove(index)}> - </Button>
                                            <Button type="button" onClick={() => arrayHelpers.insert(index, '')}>+</Button>
                                        </div>
                                    ))
                                ) : (
                                    <Button type="button" onClick={() => arrayHelpers.push('')}>Lisää kieli</Button>
                                )}
                            </div>
                        )}
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
                    <Button type="submit" disabled={!dirty || !isValid}>
                        Lisää!
                    </Button>
                </Form>
            )
        }}
        </Formik>
    )
}

export default AddTourForm