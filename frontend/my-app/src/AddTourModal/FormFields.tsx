import React from 'react'
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik'
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react'

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
        <Field placeholder={placeholder} {...field} />
        <div style={{ color:"red"}}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
)