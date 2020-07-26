import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField, SelectField, ArrayField } from '../../utils/FormFields'
import { Button } from 'semantic-ui-react'
import { NewUser, OptionField } from '../../types'

interface Props {
    onSubmit: (values: NewUser) => void;
}

const initialValues: NewUser = {
    name: "",
    username: "",
    password: "",
    type: "Customer",
    languages: [""]
}
const options: OptionField[] = [
    {label: "Asiakas", value: "Customer"},
    {label: "Ylläpitäjä", value: "Admin"},
    {label: "Opas", value: "Guide"},
]

export const RegisterationForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
            onSubmit(values)
            resetForm()
        }}
        validate={ values => {
            const errors: { [field: string]: string | object} = {};
            if(values.username.length === 0) {
                errors.username = "Kenttä vaaditaan"
            }
            if(values.password.length === 0) {
                errors.password = "Kenttä vaaditaan"
            }
            if(values.name.length === 0) {
                errors.name = "Kenttä vaaditaan"
            }
            if(values.type !== "Admin" && values.type !== "Customer" && values.type !== "Guide") {
                errors.type = "Käyttäjän täytyy kuulua johonkin ennalta valittuun ryhmään"
            }
            return errors;
        }}
        >
        {({ values, isValid, dirty }) => {
            return(
            <Form className="form ui">
                <Field
                    label="Nimi"
                    placeholder="Nimi"
                    name="name"
                    component={TextField}
                />
                <Field
                    label="Käyttäjänimi"
                    placeholder="Käyttäjä"
                    name="username"
                    component={TextField}
                />
                <Field
                    label="Salasana"
                    placeholder="Salasana"
                    name="password"
                    component={TextField}
                />
                <SelectField
                    label="Käyttäjätyyppi"
                    name="type"
                    options={options}
                />

                {values.type === "Guide" && 
                    <Field
                        label="Kielitaito"
                        name="languages"
                        component={ArrayField}
                        values={values.languages}
                        fieldName="languages"
                    />
                }
                <Button id="registerationButton" type="submit" name="submit" disabled={!dirty || !isValid}>
                        Lisää käyttäjä
                </Button>
            </Form>
            )
        }}
        </Formik>
    )
}