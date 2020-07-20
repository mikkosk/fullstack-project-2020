import React, { useState, useEffect } from 'react'
import { Header, Grid, GridRow, Accordion, Button, GridColumn, Reveal, Popup } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { useParams } from 'react-router-dom'
import { ReservedTour, Museum } from '../../types'
import { EssentialInformation, RestInformation } from '../ReservationPage'
import { confirmTour } from '../../reducers/userReducer'

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

    const [toursToShow, setToursToShow] = useState<ReservedTour[]>([]);

    useEffect(() => {
        if(user && user.type === "Guide") {
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
    
    const takeTour = (tourId: string) => {
        dispatch(confirmTour(tourId, user._id))
    }
    
    

    return (
        <div>
            <Header>{user.name}</Header>
            <Grid textAlign="center">
                <Grid.Row columns={1}>
                    <Header>Tulevat opastukset</Header>
                </Grid.Row>
                <GridRow columns={2}>
                    <Grid.Column>
                        <Grid textAlign="center">
                            <GridRow columns={1}>
                                <Header>Omat opastukset</Header>
                            </GridRow>
                            {userTours.length > 0 && userTours.map((r: ReservedTour) => {
                            return(
                                <div key={r._id}>
                                    <TourPreview r={r} />
                                </div>
                            )  
                            })}

                            {userTours.length === 0 && <h3>Ei varattuja opastuksia</h3>}
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid textAlign="center">
                            <GridRow columns={1}>
                                <Header>Vapaat opastukset</Header>
                            </GridRow>
                            {toursToShow.length > 0 && toursToShow.map((r: ReservedTour) => {
                                return(
                                    <div key={r._id}>
                                        <TourPreview r={r} />
                                        <GridRow>
                                            <Button onClick={() => takeTour(r._id)}>Varaa</Button>
                                        </GridRow>
                                    </div>
                                )
                            })}
                            {toursToShow.length === 0 && <h3>Ei vapaita opastuksia</h3>}
                        </Grid>
                    </Grid.Column>
                </GridRow>
            </Grid>
        </div>
    )
}

export default GuideUserPage