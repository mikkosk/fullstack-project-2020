import axios from 'axios'
import { UserAnyType, NewUser, ReservedTour } from '../types'
import authenticationHelper from '../utils/authenticationHelper'

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
    const res = await axios.put(`${baseUrl}/${id}`, newUser, authenticationHelper.getAuthenticationHeaders())
    return res.data
}

const addUserToMuseum = async (userId: string, museumId: string): Promise<UserAnyType> => {
    const res = await axios.put(`${baseUrl}/${userId}/museum/${museumId}`, authenticationHelper.getAuthenticationHeaders());
    return res.data
}

const deleteUser = async (id: string) => {
    await axios.delete(`${baseUrl}/${id}`, authenticationHelper.getAuthenticationHeaders());
}

const addReservation = async(userId: string, museumId: string, newReservation: Omit<ReservedTour, '_id' | 'salary' | 'confirmed' | 'guide'>) => {
    const res = await axios.post(`${baseUrl}/${userId}/museum/${museumId}/reservedtour`, newReservation, authenticationHelper.getAuthenticationHeaders())
    return res.data
}


export default {
    getAll,
    getOne,
    addUser,
    deleteUser,
    updateUser,
    addUserToMuseum,
    addReservation
}