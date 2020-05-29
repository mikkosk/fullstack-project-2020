import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from '../../utils/FormFields'
import { Button } from 'semantic-ui-react'

interface Props {
    onSubmit: (values: {username: string, password: string}) => void;
}

const initialValues: {username: string, password: string} = {
    username: "",
    password: ""
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
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
            return errors;
        }}
        >
        {({ isValid, dirty }) => {
            return(
            <Form className="form ui">
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
                <Button type="submit" name="submit" disabled={!dirty || !isValid}>
                       Kirjaudu sisään
                </Button>
            </Form>
            )
        }}
        </Formik>
    )
}