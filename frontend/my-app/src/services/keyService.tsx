import axios from 'axios'

const baseUrl = '/api/key'

const getKey = async (): Promise<string> => {
    const res = await axios.get(baseUrl)
    return res.data
}


export default {
    getKey
}