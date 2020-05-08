import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import TourList from './TourList'
import { AddTourForm } from '../AddTourModal/AddTourForm'

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
                        <AddTourForm onSubmit={console.log} onCancel={console.log}/>
                    </Grid.Column>
            </Grid>
        </div>
    )
}   

export default MuseumAdminPage;