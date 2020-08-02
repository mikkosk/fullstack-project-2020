import React from 'react'
import { Header, Segment, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { LoginForm } from './LoginForm'
import { RegisterationForm } from './RegisterationForm'
import loginService from '../../services/loginService'
import loginStorage from '../../utils/loginStorage'
import { NewUser } from '../../types'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { addUser } from '../../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import { addNotification } from '../../reducers/notificationReducer'
import Mapbox from '../../utils/Mapbox'

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const submitLogin = async (credentials: {username: string, password: string}) => {
        console.log(credentials)
        const {username, password} = credentials;
        try {
            const loggedInUser = await loginService.login(username, password);
            if(loggedInUser) {
                loginStorage.saveUser(loggedInUser);
            }
            console.log(loggedInUser)
            dispatch(login(loggedInUser));
            history.push(`/user`)
        } catch {
            dispatch(addNotification({message: "Väärät tunnukset", error: true}))
        }
    }

    const submitRegisteration = async (newUser: NewUser) => {
        console.log(newUser)
        try {
            dispatch(addUser(newUser));
        } catch {
            console.log("Käyttäjää ei voi lisätä")
        }
    }

    return (
        <div>
            <Header as="h1">Kirjaudu sisään tai luo käyttäjä</Header>
            <Grid id="basicGrid" columns={2} relaxed="very" stackable divided>
                <Grid.Column>
                    <LoginForm onSubmit={submitLogin}/>
                </Grid.Column>
                <Grid.Column>
                    <RegisterationForm onSubmit={submitRegisteration}/>
                </Grid.Column>
            </Grid>
        </div>
    )
}