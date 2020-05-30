import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Grid, Header } from 'semantic-ui-react';

export const AdminPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(user)
    if(!user || user.type !== "Admin") {
        return <div>Mitään ei löytynyt</div>
    }

    return (
        <div>
            
            <Grid columns={2} stackable textAlign='center'>
                <Grid.Row>
                    <Header>Käyttäjän {user.username} tiedot</Header>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <h4>Kaikki museot: </h4>
                    </Grid.Column>
                    <Grid.Column>
                        <h4>Käyttäjän tiedot: </h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {user.museums && user.museums.map(m => <Link to={`/museum/${m._id}`}>{m.museumName}</Link>)}
                    </Grid.Column>
                    <Grid.Column>
                        <Grid columns={2} stackable>
                            <Grid.Column>
                                <b>Nimi: </b>
                            </Grid.Column>
                            <Grid.Column>
                                <b>{user.name}</b>
                            </Grid.Column>
                            <Grid.Column>
                                <b>Käyttäjätunnus: </b>
                            </Grid.Column>
                            <Grid.Column>
                                <b>{user.username}</b>
                            </Grid.Column>
                            <Grid.Column>
                                <h4>Tyyppi: </h4>
                            </Grid.Column>
                            <Grid.Column>
                                <b>{user.type}</b>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </div>
    )


}