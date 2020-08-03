import React from "react";
import { Grid, Button, Label } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, ImageField } from "../../../utils/FormFields";
import { NewTour, NewMuseum, OptionField } from "../../../types";

const checkTimes = ({mon, tue, wed, thu, fri, sat, sun}: {mon: string, tue: string, wed: string, thu: string, fri: string, sat: string, sun: string}): boolean => {
    if(!mon || !tue || !wed || !thu || !fri || !sat || !sun) {
        return false
    }
    return true;
}

const times = (): OptionField[] => {
    let list: OptionField[] = [];
    let h;
    let m;
    let hString: string;
    let mString: string;
    for(h = 0; h < 24; h++) {
        for(m = 0; m < 60; m += 15) {
            hString = h < 10 ? `0${h.toString()}` : h.toString()
            mString = m === 0 ? `0${m.toString()}` : m.toString()
            list = list.concat({label: `${hString}:${mString}`, value: `${hString}:${mString}`});
        }
    }
    list = list.concat({label: `Suljettu`, value: `closed`})
    return list;
}

const days = [
    {name: "Maanantai", value: "mon"},
    {name: "Tiistai", value: "tue"},
    {name: "Keskiviikko", value: "wed"},
    {name: "Torstai", value: "thu"},
    {name: "Perjantai", value: "fri"},
    {name: "Lauantai", value: "sat"},
    {name: "Sunnuntai", value: "sun"}
]

interface Props {
    onSubmit: (values: NewMuseum) => void;
    onCancel: () => void;
    initialTour?: NewTour
}

const initialValues: NewMuseum = {
    museumName: "",
    museumInfo: "",
    openInfo: "",
    open: {
        mon: "",
        tue: "",
        wed: "",
        thu: "",
        fri: "",
        sat: "",
        sun: ""
    },
    closed: {
        mon: "",
        tue: "",
        wed: "",
        thu: "",
        fri: "",
        sat: "",
        sun: ""
    },
    location: "",
    lat: 0,
    long: 0,
    image: undefined
}
export const AddMuseumForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
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
            if(values.museumName.length === 0) {
                errors.museumName = requiredError
            }
            if(!checkTimes(values.open)) {
                errors.open = requiredError
            }
            if(!checkTimes(values.closed)) {
                errors.closed = requiredError
            }
            if(!values.location) {
                errors.location = requiredError
            }
            if(values.lat === 0) {
                errors.lat = requiredError;
            }
            if(values.long === 0) {
                errors.long = requiredError;
            }
            if(isNaN(values.lat)) {
                errors.lat = "Luvun täytyy olla numero"
            } else if(values.lat < -90 || values.lat > 90) {
                errors.lat = "Luvun täytyy olla -90 ja 90 välillä"
            }
            if(isNaN(values.long)) {
                errors.long = "Luvun täytyy olla numero"
            } else if(values.long < -90 || values.long > 90) {
                errors.long = "Luvun täytyy olla -90 ja 90 välillä"
            }
            
            return errors;
        }
        }
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched}) => {
            return (
                <Form className="form ui">
                    <Field
                        label="Museon nimi"
                        placeholder="Museon nimi"
                        name="museumName"
                        component={TextField}
                    />
                    <Field
                        label="Museon tiedot"
                        placeholder="Museon tiedot"
                        name="museumInfo"
                        component={TextField}
                    />
                    <Field
                        label="Lisätietoja aukiolosta"
                        placeholder="Lisätietoja"
                        name="openInfo"
                        component={TextField}
                    />
                    <Field
                        label="Sijainti"
                        placeholder="Sijainti"
                        name="location"
                        component={TextField}
                    />
                    <Field
                        label="Leveyspiiri (latitude)"
                        placeholder="Leveyspiiri"
                        name="lat"
                        component={TextField}
                    />
                    <Field
                        label="Pituuspiiri (longitude)"
                        placeholder="Pituuspiiri"
                        name="long"
                        component={TextField}
                    />
                    <ImageField
                        name="image"
                    />
                    <Grid className="addTopMargin" columns={7} relaxed stackable >
                        {days.map(d => 
                            <Grid.Column className="centerText" key={d.value}>
                                <div className="bottomMargin">
                                    <Label basic>{d.name}</Label>
                                </div>
                                <SelectField
                                    label="Auki"
                                    name={`open.${d.value}`}
                                    options={times()}
                                />
                                <SelectField
                                    label="Kiinni"
                                    name={`closed.${d.value}`}
                                    options={times()}
                                />
                            </Grid.Column>
                        )}
                    </Grid>
                    <Grid>
                        <Grid.Row centered className="addTopMarginSmall" columns="2">
                            <Button id="submitMuseumModal" type="submit" name="submit" disabled={!dirty || !isValid}>
                                Lisää!
                            </Button>
                            <Button id="cancelMuseumModal" onClick={onCancel} name="cancelForm" color="red">Peruuta</Button>
                        </Grid.Row>
                    </Grid>
                </Form>
            )
        }}
        </Formik>
    )
}

export default AddMuseumForm