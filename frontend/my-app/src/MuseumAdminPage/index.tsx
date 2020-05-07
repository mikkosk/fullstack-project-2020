import React from 'react'
import { Header, Grid, Container } from 'semantic-ui-react'
import TourList from './TourList'

const MuseumAdminPage: React.FC = () => {
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
                    </Grid.Column>
            </Grid>
        </div>
    )
}   

export default MuseumAdminPage;