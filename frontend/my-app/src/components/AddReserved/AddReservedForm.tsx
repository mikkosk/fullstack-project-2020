import React, { useState } from 'react'
import { ReservedTour, Museum, GuidedTour, OptionField } from '../../types'
import { Formik, Field, Form } from 'formik'
import { TextField, SelectField, SelectArrayField, NumberField, DateField, TimeField } from '../../utils/FormFields'
import { Button, Grid, GridColumn, Modal, Header } from 'semantic-ui-react'

interface Props {
    onSubmit: (values: Omit<ReservedTour, '_id' | 'salary' | 'confirmed'>) => void;
    onCancel: () => void;
    tour: GuidedTour;
    museum: Museum;
}

const paymentOptions: OptionField[] = [
    {label: "Käteinen", value: "Cash"},
    {label: "Lasku", value: "Bill"},
    {label: "Maksukortti", value: "Card"},
    {label: "Jokin muu, tarkenna lisätiedoissa", value: "Other"}
]

const AddReservedForm: React.FC<Props> = ({ onSubmit, onCancel, tour, museum}) => {

    const [ready, setReady] = useState<boolean>(false);

    const initialValues:Omit<ReservedTour, '_id' | 'salary' | 'confirmed'> = {
        ...tour,
        chosenLanguage: "",
        groupName: "",
        numberOfPeople: 0,
        groupAge: "",
        paymentMethod: "Cash",
        time: "",
        date: new Date(),
        email: "",
        groupInfo: ""
    }

    return (
        <Formik
        initialValues={{...initialValues, chosenLanguage: Object.values(tour.possibleLanguages)[0]}}
        onSubmit={(values, { resetForm }) => {
            onSubmit(values)
            setReady(false)
            resetForm()
        }}
        validate={ values => {
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
        {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched, handleSubmit}) => {
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
                    <Grid columns={2}>
                        <GridColumn>
                            <DateField
                                name="date"
                            />
                        </GridColumn>
                        <GridColumn>
                            <TimeField
                                name="time"
                                museum={museum}
                                tour={tour}
                                date={values.date}
                            />
                        </GridColumn>
                    </Grid>

                    <Modal textallign="center" open={ready} name="confirm">
                        <Header>Varmistus</Header>
                        <Modal.Content>
                            Hyväksy varaus antamillasi tiedoilla?
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="green"type='submit' name='submit' onClick={() => handleSubmit()}>Varaa!</Button>
                            <Button color="red" type="button" name='closeConfirmation' onClick={() => {console.log("LOL"); setReady(false)}}>Peruuta</Button>
                        </Modal.Actions>
                    </Modal>
                    <Button type="button" onClick={() => setReady(true)} name="ready" disabled={!isValid || !dirty}>
                        Varaa!
                    </Button>
                    <Button type="button" onClick={onCancel} name="cancelForm" color="red">Peruuta</Button>
                    
                </Form>
            )
        }}
        </Formik>
    )
}

export default AddReservedForm