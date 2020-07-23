import React from 'react'
import { Menu } from 'semantic-ui-react'
import loginStorage from '../../utils/loginStorage'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../reducers/loginReducer'
import { RootState } from '../../store'
import { useHistory } from 'react-router-dom'

const LogoutBar: React.FC = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.login)
    const history = useHistory()

    const toPage = (where: string) => {
        history.push(`/${where}`)
    }

    const handleLogout = () => {
        dispatch(logout())
        loginStorage.logoutUser()
        toPage('login')
    }
    
    if (!user._id) {
        return (
            <div>
                <Menu>
                    <Menu.Item header>Et ole kirjautunut sisään</Menu.Item>
                    <Menu.Item name="login" onClick={() => toPage('login')}>Kirjaudu sisään</Menu.Item>
                </Menu>
            </div>
        )
    }

    return (
        <div>
            <Menu>
                <Menu.Item header>Kirjautunut sisään käyttäjänä {user.username}</Menu.Item>
                <Menu.Item name="mainPage" onClick={() => toPage("find/museums")}>Etusivu</Menu.Item>
                <Menu.Item name="userPage" onClick={() => toPage("user")}>Oma sivu</Menu.Item>
                <Menu.Item name="logout" onClick={handleLogout}>Kirjaudu ulos</Menu.Item>
            </Menu>
        </div>
    )
}

export default LogoutBar