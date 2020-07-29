import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store';
import { useHistory } from 'react-router-dom';
import { Header, Grid, GridRow, GridColumn } from 'semantic-ui-react';
import { ReservedTour } from '../../../types';
import { dateToString } from '../../../utils/DateTimeFunctions';

const CustomerUserPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.users.users[state.login._id]);
    const history = useHistory();

    if(!user || user.type !== "Customer") {
        return <div>Mitään ei löytynyt</div>
    }
    
    const toReservation = (id: ReservedTour['_id']) => {
        history.push(`/reservation/${id}`)
    }

    return (
        <div>
            <Grid id="basicGrid" centered columns={1}>
                <Header className="title" textAlign='center'>{user.username}</Header>
                <GridRow centered>
                    <Header textAlign='center'>Varatut opastukset</Header>
                </GridRow>
                {user.reservedTours.map((r: ReservedTour) => 
                    <GridRow  name="tourRow" key={r._id} onClick={() => toReservation(r._id)} columns="3">
                        <GridColumn>
                            <h4>{r.tourName} </h4>
                        </GridColumn>
                        <GridColumn>
                            <p>{r.time} </p>
                        </GridColumn>
                        <GridColumn>
                            <p>{dateToString(r.date)}</p>
                        </GridColumn>
                    </GridRow>
                )}
            </Grid>
        </div>
    )
}

export default CustomerUserPage