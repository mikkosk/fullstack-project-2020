import axios from 'axios'
import { LoggedInUser } from '../types'

const baseUrl = 'https://obscure-retreat-23913.herokuapp.com/api/login'

const login = async (username: string, password: string): Promise<LoggedInUser> => {
    const res = await axios.post(baseUrl, {username, password})
    return res.data
}


export default {
    login
}