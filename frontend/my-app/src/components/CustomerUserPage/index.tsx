import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import { useHistory } from 'react-router-dom';
import { Header, Grid, GridRow } from 'semantic-ui-react';
import { ReservedTour } from '../../types';

const CustomerUserPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.users.users[state.login._id]);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(user)
    if(!user || user.type !== "Customer") {
        return <div>Mitään ei löytynyt</div>
    }

    return (
        <div>
            <Header>{user.username}</Header>
            <Grid columns={1}>
                <GridRow>
                    <Header>Varatut opastukset</Header>
                </GridRow>
                {user.reservedTours.map((r: ReservedTour) => 
                    <GridRow>
                        <h4>{r.tourName}</h4>
                        <p>{r.time}</p>
                        <p>{r.date}</p>
                    </GridRow>
                )}
            </Grid>
        </div>
    )
}

export default CustomerUserPage