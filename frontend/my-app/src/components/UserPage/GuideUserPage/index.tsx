import React, { useState, useEffect } from 'react'
import { Header, Grid, GridRow, Accordion, Button, GridColumn, Reveal, Popup } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { useParams } from 'react-router-dom'
import { ReservedTour, Museum } from '../../../types'
import { EssentialInformation, RestInformation } from '../../ReservationPage'
import { confirmTour, getUsers } from '../../../reducers/userReducer'
import { allMuseums } from '../../../reducers/museumReducer'

const TourPreview: React.FC<{r: ReservedTour}> = ({r}) => (
    <div>
        <GridRow>
            <Popup
                trigger={
                    <div>
                        <EssentialInformation tour={r} /> 
                    </div>
                }
            >
                <Popup.Header>Kaikki tiedot</Popup.Header>
                <Popup.Content>
                    <RestInformation tour={r} />
                </Popup.Content>
            </Popup>
        </GridRow>
    </div>
)

const GuideUserPage: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.users.users[state.login._id])
    console.log(user)
    

    const [toursToShow, setToursToShow] = useState<ReservedTour[]>([]);

    console.log(toursToShow)

    useEffect(() => {
        if(user && user.type === "Guide") {
            setToursToShow([]);
            user.museums.forEach((m:Museum) => m.reservedTours.forEach((r: ReservedTour) => {
                if(!r.confirmed) {
                    setToursToShow(t => t.concat(r))
                }
            }))
        }
    }, [user])

    if(!user || user.type !== "Guide") {
        return null;
    }

    const userTours = user.reservedTours.map((r: ReservedTour) => r)
    console.log(userTours)
    const takeTour = (tourId: string) => {
        dispatch(confirmTour(tourId, user._id))
    }
    
    

    return (
        <div>
            <Header>{user.name}</Header>
            <Grid textAlign="center">
                <Grid.Row columns={1}>
                    <Header>Opastukset</Header>
                </Grid.Row>
                <GridRow columns={3}>
                    <Grid.Column>
                        <Grid name="ownTours" textAlign="center">
                            <GridRow columns={1}>
                                <Header>Omat opastukset</Header>
                            </GridRow>
                            {userTours.length > 0 && userTours.map((r: ReservedTour) => {
                            return(
                                ((new Date(r.date) >= new Date())) 
                                ?
                                    <div key={r._id}>
                                        <TourPreview r={r} />
                                    </div>
                                : 
                                    null
                            )  
                            })}

                            {userTours.length === 0 && <h3>Ei varattuja opastuksia</h3>}
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid name="freeTours" textAlign="center">
                            <GridRow columns={1}>
                                <Header>Vapaat opastukset</Header>
                            </GridRow>
                            {toursToShow.length > 0 && toursToShow.map((r: ReservedTour) => {
                                return(
                                    (!r.confirmed && (new Date(r.date) >= new Date())) 
                                    ?
                                        <div key={r._id}>
                                            <TourPreview r={r} />
                                            <GridRow>
                                                <Button onClick={() => takeTour(r._id)}>Varaa</Button>
                                            </GridRow>
                                        </div>
                                    : 
                                        null
                                )
                            })}
                            {toursToShow.length === 0 && <h3>Ei vapaita opastuksia</h3>}
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid name="pastTours" textAlign="center">
                            <GridRow columns={1}>
                                <Header>Menneet opastukset</Header>
                            </GridRow>
                            {userTours.length > 0 && userTours.map((r: ReservedTour) => {
                            return(
                                (r.confirmed && (new Date(r.date) < new Date())) 
                                ?
                                    <div key={r._id}>
                                        <TourPreview r={r} />
                                    </div>
                                : 
                                    null
                            )  
                            })}

                            {userTours.length === 0 && <h3>Ei menneitä opastuksia opastuksia</h3>}
                        </Grid>
                    </Grid.Column>
                </GridRow>
            </Grid>
        </div>
    )
}

export default GuideUserPage