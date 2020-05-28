import axios from 'axios'
import { GuidedTour, NewTour, AddTourPayload } from '../types'
import authenticationHelper from '../utils/authenticationHelper'

const baseUrl = 'http://localhost:3001/tour'

const getAll = async (): Promise<GuidedTour[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addTour = async (newTour: NewTour, museumId: string): Promise<AddTourPayload> => {
    const res = await axios.post(`${baseUrl}/museum/${museumId}`, newTour, authenticationHelper.getAuthenticationHeaders())
    return res.data
}

const updateTour = async (newTour: NewTour, museumId: string, tourId: string): Promise<GuidedTour> => {
    const res = await axios.put(`${baseUrl}/${tourId}/museum/${museumId}}`, newTour, authenticationHelper.getAuthenticationHeaders())
    return res.data
}

const deleteTour = async (museumId: string, tourId: string) => {
    await axios.delete(`${baseUrl}/${tourId}/museum/${museumId}`, authenticationHelper.getAuthenticationHeaders());
}

export default {
    getAll,
    addTour,
    deleteTour,
    updateTour
}