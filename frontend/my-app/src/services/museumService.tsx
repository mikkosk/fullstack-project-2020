import axios from 'axios'
import { Museum, NewMuseum } from '../types'
import authenticationHelper from '../utils/authenticationHelper'

const baseUrl = 'http://localhost:3001/museum'

const getAll = async (): Promise<Museum[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addMuseum = async (newMuseum: NewMuseum): Promise<Museum> => {
    const res = await axios.post(baseUrl, newMuseum, authenticationHelper.getAuthenticationHeaders())
    return res.data
}

const updateMuseum = async (newMuseum: NewMuseum, id: string): Promise<Museum> => {
    const res = await axios.put(`${baseUrl}/${id}`, newMuseum, authenticationHelper.getAuthenticationHeaders())
    return res.data
}

const deleteMuseum = async (id: string) => {
    await axios.delete(`${baseUrl}/${id}`, authenticationHelper.getAuthenticationHeaders());
}

const sendRequest = async (userId: string, museumId: string) => {
    const res = await axios.put(`${baseUrl}/${museumId}/request`, {id: userId})
    console.log(res.data)
    return res.data
}

const removeRequest = async(userId: string, museumId: string) => {
    const res = await axios.put(`${baseUrl}/${museumId}/request/remove`, {id: userId}, authenticationHelper.getAuthenticationHeaders())
    return res.data
}   

export default {
    getAll,
    addMuseum,
    deleteMuseum,
    updateMuseum,
    sendRequest,
    removeRequest
}