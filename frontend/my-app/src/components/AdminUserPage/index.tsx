import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Grid, Header, Button } from 'semantic-ui-react';
import AddMuseumModal from './AddMuseumModal';
import { NewMuseum } from '../../types';
import { addMuseum } from '../../reducers/userReducer';

export const AdminPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.users.users[state.login._id]);
    const dispatch = useDispatch();
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);

    console.log(user)
    if(!user || user.type !== "Admin") {
        return <div>Mitään ei löytynyt</div>
    }
    const openModal = (): void => {
        setModalOpen(true)
    }
    const closeModal = (): void => {
        setModalOpen(false)
    }

    const dispatchAddMuseum = async (values: NewMuseum) => {
        dispatch(addMuseum(values, user._id))
        console.log(values)
    }

    const handleSubmit = async (values: NewMuseum) => {
        try {
            await dispatchAddMuseum(values)
        } catch (e) {
            console.log(e.message)
        }
        closeModal()
        window.location.reload()

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
                        {user.museums && user.museums.map(m => 
                            <div key={m._id}><Link to={`/museum/${m._id}`}>{m.museumName}</Link></div>
                        )}
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
            <Button onClick={openModal}>Lisää museo!</Button>
            <AddMuseumModal modalOpen={modalOpen} onSubmit={handleSubmit} onClose={closeModal}/>
        </div>

    )


}