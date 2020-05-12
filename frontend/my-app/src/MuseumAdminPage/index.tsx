import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import TourList from './TourList'
import { AddTourForm } from '../AddTour/AddTourForm'
import { useDispatch } from 'react-redux'
import { addTour } from '../reducers/tourReducer'
import { NewTour } from '../types'

const MuseumAdminPage: React.FC = () => {
    const dispatch = useDispatch()

    const dispatchNewTour = async (newTour: NewTour) => {
        dispatch(addTour(newTour))
    }

    const submitNewTour = async (newTour: NewTour) => {
        await dispatchNewTour(newTour)
    } 

    return (
        <div>
            <Header as="h2">Museon opastukset</Header>
            <Grid divided='vertically' columns={2}>
                    <Grid.Column>
                        <Header as="h4">Nykyiset opastukset</Header>
                        <TourList />
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h4">Lisää opastus</Header>
                        <AddTourForm onSubmit={submitNewTour} onCancel={console.log}/>
                    </Grid.Column>
            </Grid>
        </div>
    )
}   

export default MuseumAdminPage;