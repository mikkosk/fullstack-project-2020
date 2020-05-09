import axios from 'axios'
import { GuidedTour, NewTour } from '../types'

const baseUrl = 'http://localhost:3001/museum'

const getAll = async (): Promise<GuidedTour[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addTour = async (newTour: NewTour): Promise<GuidedTour> => {
    const res = await axios.post(baseUrl, newTour)
    console.log(res.data)
    return res.data
}

const deleteTour = async (id: string) => {
    await axios.delete(`${baseUrl}/${id}`);
}

export default {
    getAll,
    addTour,
    deleteTour
}