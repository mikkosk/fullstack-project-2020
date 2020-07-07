import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import TourList from './TourList'
import { AddTourForm } from '../AddTour/AddTourForm'
import { useDispatch, useSelector } from 'react-redux'
import { addTour } from '../../reducers/museumReducer'
import { NewTour, Museum } from '../../types'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'

const MuseumAdminPage: React.FC<{museum: Museum}> = ({ museum }) => {
    const dispatch = useDispatch()

    const submitNewTour = async (newTour: NewTour) => {
        dispatch(addTour(newTour, museum._id))
    }

    if(!museum) {
        return <Header as="h2">Museota ei löytynyt</Header>
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