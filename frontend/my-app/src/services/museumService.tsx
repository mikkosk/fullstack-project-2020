import axios from 'axios'
import { Museum, NewMuseum } from '../types'
import authenticationHelper from '../utils/authenticationHelper'
import FormData from 'form-data'

const baseUrl = '/api/museum'

const getAll = async (): Promise<Museum[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addMuseum = async (newMuseum: NewMuseum): Promise<Museum> => {
    let data = new FormData()
    const keys = Object.keys(newMuseum);
    const values = Object.values(newMuseum);
    for(let i = 0; i < keys.length; i++) {
        const currentKey = keys[i]
        if(currentKey !== "image" && currentKey !== "open" && currentKey !== "closed") {
            data.append(currentKey, values[i])
        }
        else if(currentKey !== "image") {
            data.append(currentKey, JSON.stringify(values[i]))
        }
    } 
    if(newMuseum.image) {
        data.append('image', newMuseum.image, newMuseum.image?.name)
    }
    const res = await axios.post(baseUrl, data, {headers: { Authorization: authenticationHelper.getAuthenticationHeaders().headers.Authorization, 'Content-Type': 'multipart/form-data'}})
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