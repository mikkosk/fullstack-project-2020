import axios from 'axios'
import { Museum, NewMuseum } from '../types'

const baseUrl = 'http://localhost:3001/museum'

const getAll = async (): Promise<Museum[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addMuseum = async (newMuseum: NewMuseum): Promise<Museum> => {
    const res = await axios.post(baseUrl, newMuseum)
    return res.data
}

const updateMuseum = async (newMuseum: NewMuseum, id: string): Promise<Museum> => {
    const res = await axios.put(`${baseUrl}/${id}`, newMuseum)
    return res.data
}

const deleteMuseum = async (id: string) => {
    await axios.delete(`${baseUrl}/${id}`);
}

export default {
    getAll,
    addMuseum,
    deleteMuseum,
    updateMuseum
}