import axios from 'axios'
import { GuidedTour, NewTour, Guide } from '../types'

const baseUrl = 'http://localhost:3001/tour'

const getAll = async (): Promise<GuidedTour[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addTour = async (newTour: NewTour, museumId: string): Promise<GuidedTour> => {
    const res = await axios.post(`${baseUrl}/museum/${museumId}`, newTour)
    return res.data
}

const updateTour = async (newTour: NewTour, id: string): Promise<GuidedTour> => {
    const res = await axios.put(`${baseUrl}/${id}`, newTour)
    return res.data
}

const deleteTour = async (id: string) => {
    await axios.delete(`${baseUrl}/${id}`);
}

export default {
    getAll,
    addTour,
    deleteTour,
    updateTour
}