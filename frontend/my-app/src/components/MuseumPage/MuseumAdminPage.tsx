import React from 'react'
import { Header, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import TourList from './TourList'
import { AddTourForm } from '../AddTour/AddTourForm'
import { useDispatch } from 'react-redux'
import { addTour } from '../../reducers/museumReducer'
import { NewTour, Museum, ReservedTour } from '../../types'
import { useHistory } from 'react-router-dom'
import { dateToString } from '../../utils/DateTimeFunctions'

//JATKA LISÄÄMÄLLÄ PYYNTÖJEN VAHVISTUS
const MuseumAdminPage: React.FC<{museum: Museum}> = ({ museum }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const submitNewTour = async (newTour: NewTour) => {
        dispatch(addTour(newTour, museum._id))
    }

    const toReservation = (id: ReservedTour['_id']) => {
        history.push(`/reservation/${id}`)
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
            <Grid>
                <GridRow columns="1">
                    <Header>Vahvistamattomat opastukset</Header>
                </GridRow>
                {museum.reservedTours.map((r: ReservedTour) => r.confirmed ? null :
                    <GridRow key={r._id} columns={3} onClick={() => toReservation(r._id)}>
                        <GridColumn><b>{r.time} {dateToString(new Date(r.date))}</b></GridColumn>
                        <GridColumn><b> {r.tourName}</b></GridColumn>
                        <GridColumn><p>{r.groupName}</p></GridColumn>
                    </GridRow>
                )}
            </Grid>
            <Grid>
                <GridRow columns="1">
                    <Header>Vahvistetut opastukset</Header>
                </GridRow>
                {museum.reservedTours.map((r: ReservedTour) => r.confirmed ? 
                    <GridRow key={r._id} columns={4} onClick={() => toReservation(r._id)}>
                        <GridColumn><b>{r.time} {dateToString(new Date(r.date))}</b></GridColumn>
                        <GridColumn><b> {r.tourName}</b></GridColumn>
                        <GridColumn><p>{r.groupName}</p></GridColumn>
                        <GridColumn><i>{r.guide}</i></GridColumn>
                    </GridRow>
                    : null
                )}
            </Grid>
        </div>
    )
}   

export default MuseumAdminPage;