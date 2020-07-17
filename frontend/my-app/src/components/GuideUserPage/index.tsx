import React from 'react'
import { Header, Grid, GridRow, Accordion } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useParams } from 'react-router-dom'
import { ReservedTour, Museum } from '../../types'
import { EssentialInformation, RestInformation } from '../ReservationPage'

const GuideUserPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.users.users[state.login._id])

    if(!user || user.type !== "Guide") {
        return null;
    }

    //Tee yksittäinen array
    const allTours: ReservedTour[] = user.museums.map((m:Museum) => m.reservedTours)
    const freeTours = allTours.
    return (
        <div>
            <Header>{user.name}</Header>
            <Grid>
                <Grid.Row columns={1}>
                    <Header>Tulevat opastukset</Header>
                </Grid.Row>
                <GridRow columns={2}>
                <Grid>
                    {user.reservedTours.map((r: ReservedTour) => {
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
                </Grid>
                <Grid>
                    {user.museums.map}
                </Grid>
                </GridRow>
            </Grid>
        </div>
    )
}