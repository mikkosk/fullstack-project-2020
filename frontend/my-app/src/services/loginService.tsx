import axios from 'axios'
import { LoggedInUser } from '../types'

const baseUrl = '/api/login'

const login = async (username: string, password: string): Promise<LoggedInUser> => {
    const res = await axios.post(baseUrl, {username, password})
    return res.data
}


export default {
    login
}