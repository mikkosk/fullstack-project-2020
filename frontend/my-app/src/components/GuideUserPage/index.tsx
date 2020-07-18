import React, { useState } from 'react'
import { Header, Grid, GridRow, Accordion, Button, GridColumn } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useParams } from 'react-router-dom'
import { ReservedTour, Museum } from '../../types'
import { EssentialInformation, RestInformation } from '../ReservationPage'

const GuideUserPage: React.FC<{}> = () => {
    const user = useSelector((state: RootState) => state.users.users[state.login._id])

    const [toursToShow, setToursToShow] = useState<ReservedTour[]>([]);
    if(!user || user.type !== "Guide") {
        return null;
    }

    const userTours = user.reservedTours.map((r: ReservedTour) => r)
    //Tee yksittäinen array

    user.museums.forEach((m:Museum) => m.reservedTours.forEach((r: ReservedTour) => {
        if(!r.confirmed) {
            setToursToShow(toursToShow.concat(r))
        }
    }))

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
                                <GridRow columns={1}>
                                    <Accordion>
                                        <Accordion.Title>
                                            <EssentialInformation tour={r} />
                                        </Accordion.Title>
                                        <Accordion.Content>
                                            <RestInformation tour={r} />
                                        </Accordion.Content>
                                    </Accordion>
                                </GridRow>
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
                                    <GridRow columns={1}>
                                    <Accordion>
                                        <Accordion.Title>
                                            <EssentialInformation tour={r} />
                                        </Accordion.Title>
                                        <Accordion.Content>
                                            <RestInformation tour={r} />
                                        </Accordion.Content>
                                    </Accordion>
                                    <Button>Varaa</Button>
                                </GridRow>
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