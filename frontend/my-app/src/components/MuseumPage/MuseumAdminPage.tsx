import React from 'react'
import { Header, Grid, GridRow, GridColumn, Accordion, Icon } from 'semantic-ui-react'
import TourList from './TourList'
import { AddTourForm } from '../AddTour/AddTourForm'
import { useDispatch } from 'react-redux'
import { addTour, removeRequest } from '../../reducers/museumReducer'
import { NewTour, Museum, ReservedTour, Professionals, UserAnyType } from '../../types'
import { useHistory } from 'react-router-dom'
import { dateToString } from '../../utils/DateTimeFunctions'
import { userToMuseum } from '../../reducers/userReducer'

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

    const acceptUser = (userId: UserAnyType['_id']) => {
        dispatch(userToMuseum(userId, museum._id))
        dispatch(removeRequest(userId, museum._id))
    }

    const deleteRequest = (userId: UserAnyType['_id']) => {
        dispatch(removeRequest(userId, museum._id))
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
                        <GridColumn><i>{r.guide.name}</i></GridColumn>
                    </GridRow>
                    : null
                )}
            </Grid>
            <Grid columns="1">
                <GridColumn>
                    <Header>Käyttäjäpyynnöt</Header>
                </GridColumn>
                <Grid columns={4}>
                    {museum.userRequests.map((u: Professionals) => {
                        console.log(u)
                        return(
                            <Grid.Row key={u._id}>
                                <Grid.Column>
                                    <p>{u.name}</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <b>{u.type}</b>
                                </Grid.Column>
                                <Grid.Column>
                                    <Icon name="heart outline" color="green" onClick={() => acceptUser(u._id)}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Icon name="ban" color="red" onClick={() => deleteRequest(u._id)}/>
                                </Grid.Column>  
                            </Grid.Row>
                        )
                    }
                    )}
                </Grid>
            </Grid>
        </div>
    )
}   

export default MuseumAdminPage;