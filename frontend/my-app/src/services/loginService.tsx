import axios from 'axios'
import { UserAnyType, NewUser, LoggedInUser } from '../types'

const baseUrl = 'http://localhost:3001/login'

const login = async (username: string, password: string): Promise<LoggedInUser> => {
    const res = await axios.post(baseUrl, {username, password})
    return res.data
}


export default {
    login
}