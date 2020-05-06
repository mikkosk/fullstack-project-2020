import axios from 'axios'
import { GuidedTour } from '../types'

const baseUrl = 'htto://localhost:3001/museum'

const getAll = async (): Promise<GuidedTour[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

export default {
    getAll
}