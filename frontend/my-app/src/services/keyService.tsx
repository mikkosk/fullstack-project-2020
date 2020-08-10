import axios from 'axios'

const baseUrl = 'https://obscure-retreat-23913.herokuapp.com/api/key'

const getKey = async (): Promise<string> => {
    const res = await axios.get(baseUrl)
    return res.data
}


export default {
    getKey
}