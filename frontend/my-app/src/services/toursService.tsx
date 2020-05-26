import axios from 'axios'
import { GuidedTour, NewTour, AddTourPayload } from '../types'

const baseUrl = 'http://localhost:3001/tour'

const getAll = async (): Promise<GuidedTour[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addTour = async (newTour: NewTour, museumId: string): Promise<AddTourPayload> => {
    const res = await axios.post(`${baseUrl}/museum/${museumId}`, newTour)
    return res.data
}

const updateTour = async (newTour: NewTour, museumId: string, tourId: string): Promise<GuidedTour> => {
    const res = await axios.put(`${baseUrl}/${tourId}/museum/${museumId}}`, newTour)
    return res.data
}

const deleteTour = async (museumId: string, tourId: string) => {
    await axios.delete(`${baseUrl}/${tourId}/museum/${museumId}`);
}

export default {
    getAll,
    addTour,
    deleteTour,
    updateTour
}