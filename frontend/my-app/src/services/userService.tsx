import axios from 'axios'
import { UserAnyType, NewUser } from '../types'

const baseUrl = 'http://localhost:3001/user'

const getAll = async (): Promise<UserAnyType[]> => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getOne = async (id: string): Promise<UserAnyType> => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data;
}

const addUser = async (newUser: NewUser): Promise<UserAnyType> => {
    const res = await axios.post(baseUrl, newUser)
    return res.data
}

const updateUser = async (newUser: NewUser, id: string): Promise<UserAnyType> => {
    const res = await axios.put(`${baseUrl}/${id}`, newUser)
    return res.data
}

const addUserToMuseum = async (userId: string, museumId: string): Promise<UserAnyType> => {
    const res = await axios.put(`${baseUrl}/${userId}/museum/${museumId}`);
    return res.data
}

const deleteUser = async (id: string) => {
    await axios.delete(`${baseUrl}/${id}`);
}


export default {
    getAll,
    getOne,
    addUser,
    deleteUser,
    updateUser,
    addUserToMuseum
}