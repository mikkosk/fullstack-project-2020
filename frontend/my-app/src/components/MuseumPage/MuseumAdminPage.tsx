import React from 'react'
import { Header, Grid, GridRow, GridColumn, Icon } from 'semantic-ui-react'
import TourList from './TourList'
import { AddTourForm } from '../AddTour/AddTourForm'
import { useDispatch } from 'react-redux'
import { addTour, removeRequest } from '../../reducers/museumReducer'
import { NewTour, Museum, ReservedTour, Professionals, UserAnyType } from '../../types'
import { useHistory } from 'react-router-dom'
import { dateToString } from '../../utils/DateTimeFunctions'
import { userToMuseum } from '../../reducers/userReducer'


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

    const TourShow: React.FC<{r: ReservedTour}> = ({r}) => (
        <GridRow key={r._id} columns={4} onClick={() => toReservation(r._id)}>
            <GridColumn><b>{r.time} {dateToString(new Date(r.date))}</b></GridColumn>
            <GridColumn><b> {r.tourName}</b></GridColumn>
            <GridColumn><p>{r.groupName}</p></GridColumn>
            <GridColumn><i>{r.guide.name}</i></GridColumn>
        </GridRow>
    )

    if(!museum) {
        return <Header as="h2">Museota ei löytynyt</Header>
    }

    return (
        <div>
            <Header as="h2">Museon opastukset</Header>

            <Grid centered id="basicGrid" columns={1}>
                <Grid centered divided='vertically' columns={2}>
                        <Grid.Column>
                            <Header className="centerText" as="h3">Nykyiset opastukset</Header>
                            <TourList/>
                        </Grid.Column>
                        <Grid.Column>
                            <Header className="centerText" as="h3">Lisää opastus</Header>
                            <div className="centerText">
                                <AddTourForm onSubmit={submitNewTour} onCancel={() => {return}}/>
                            </div>
                        </Grid.Column>
                </Grid>

                <Grid className="addTopMargin">
                    <GridRow columns={3}>
                        <Grid.Column>
                            <Grid>
                                <GridRow centered columns="1">
                                    <Header>Vahvistamattomat opastukset</Header>
                                </GridRow>
                                {museum.reservedTours.map((r: ReservedTour) => (!r.confirmed && (new Date(r.date) >= new Date())) ?
                                    <GridRow key={r._id} columns={1} onClick={() => toReservation(r._id)}>
                                        <TourShow r={r} key={r._id} />
                                    </GridRow>
                                    : null
                                )}
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid>
                                <GridRow centered columns="1">
                                    <Header>Vahvistetut opastukset</Header>
                                </GridRow>
                                {museum.reservedTours.map((r: ReservedTour) => (r.confirmed && (new Date(r.date) >= new Date())) ? 
                                    <GridRow key={r._id} columns={1} onClick={() => toReservation(r._id)}>
                                        <TourShow r={r} key={r._id} />
                                    </GridRow>
                                    : null
                                )}
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid>
                                <GridRow columns="1" centered>
                                    <Header>Menneet opastukset</Header>
                                </GridRow>
                                {museum.reservedTours.map((r: ReservedTour) => (new Date(r.date) < new Date()) ? 
                                    <GridRow key={r._id} columns={1} onClick={() => toReservation(r._id)}>
                                        <TourShow r={r} key={r._id} />
                                    </GridRow>
                                    : null
                                )}
                            </Grid>
                        </Grid.Column>
                    </GridRow>
                </Grid>

                <Grid className="addTopMargin" columns="1">
                    <GridColumn>
                        <Header className="centerText">Käyttäjäpyynnöt</Header>
                    </GridColumn>
                    <Grid name="requests" columns={4}>
                        {museum.userRequests.map((u: Professionals) => {
                            return(
                                <Grid.Row centered key={u._id}>
                                    <Grid.Column>
                                        <div className="centerText">
                                            <p>{u.name}</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column centered className="centerText">
                                        <div className="centerText">
                                            <b>{u.type}</b>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <div className="centerText">
                                            <Icon className="centerText" name="heart outline" color="blue" onClick={() => acceptUser(u._id)}/>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <div className="centerText">
                                            <Icon className="centerText" name="ban" color="red" onClick={() => deleteRequest(u._id)}/>
                                        </div>  
                                    </Grid.Column>  
                                </Grid.Row>
                            )
                        }
                        )}
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}   

export default MuseumAdminPage;