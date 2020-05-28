import React from 'react'
import { Header, Segment, Grid } from 'semantic-ui-react'
import { LoginForm } from './LoginForm'
import { RegisterationForm } from './RegisterationForm'
import loginService from '../services/loginService'
import loginStorage from '../utils/loginStorage'
import { NewUser } from '../types'
import userService from '../services/userService'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginPage: React.FC = () => {
    const dispatch = useDispatch()

    const submitLogin = async (credentials: {username: string, password: string}) => {
        const {username, password} = credentials;
        try {
            const loggedInUser = await loginService.login(username, password);
            if(loggedInUser) {
                loginStorage.saveUser(loggedInUser);
            }
            dispatch(login(loggedInUser));
        } catch {
            console.log("Väärät tunnukset")
        }
    }

    //JATKUU
    const submitRegisteration = async (newUser: NewUser) => {
        const savedUser = await userService.addUser(newUser);
    }

    return (
        <div>
            <Header as="h1">Kirjaudu sisään tai luo käyttäjä</Header>
            <Segment>
                <Grid columns={2} relaxed="very" stackable>
                    <Grid.Column>
                        <LoginForm onSubmit={submitLogin}/>
                    </Grid.Column>
                    <Grid.Column>
                        <RegisterationForm onSubmit={submitRegisteration}/>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )
}