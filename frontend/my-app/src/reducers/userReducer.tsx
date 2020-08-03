import { UserAnyType, UserState, NewUser, NewMuseum, Museum, Admin, MessageError, ReservedTour } from "../types"
import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import userService from "../services/userService"
import museumsService from "../services/museumService"

export type Action= 
    |{
        type: "GET_USERS_SUCCESS"
        payload: UserAnyType[]
        notification: MessageError
    }
    |{
        type: "GET_USERS_ERROR"
        notification: MessageError
    }
    | {
        type: "ADD_USER_SUCCESS"
        payload: UserAnyType
        notification: MessageError
    }
    | {
        type: "ADD_USER_ERROR"
        notification: MessageError
    }
    | {
        type: "DELETE_USER_SUCCESS"
        id: UserAnyType["_id"]
        notification: MessageError
    }
    | {
        type: "DELETE_USER_ERROR"
        notification: MessageError
    }
    | {
        type: "UPDATE_USER_SUCCESS"
        payload: UserAnyType
        notification: MessageError
    }
    | {
        type: "UPDATE_USER_ERROR"
        notification: MessageError
    }
    | {
        type: "ADD_USER_TO_MUSEUM_SUCCESS",
        payload: UserAnyType
        notification: MessageError
    }
    | {
        type: "ADD_USER_TO_MUSEUM_ERROR",
        notification: MessageError
    }
    | {
        type: "ADD_MUSEUM_SUCCESS",
        payload: Museum
        id: string
        notification: MessageError
    }
    | {
        type: "ADD_MUSEUM_ERROR",
        notification: MessageError
    } 
    | {
        type: "ADD_RESERVATION_SUCCESS",
        payload: UserAnyType
        notification: MessageError
    }
    | {
        type: "ADD_RESERVATION_ERROR",
        notification: MessageError
    }
    |{
        type: "CONFIRM_TOUR_SUCCESS",
        payload: UserAnyType,
        notification: MessageError
    }
    |{
        type: "CONFIRM_TOUR_ERROR",
        notification: MessageError
    }
    |{
        type: "START_UPDATE"
    }

const initialState: UserState = {
    users: {},
    finished: true,
    notification: {message: "", error: false}
}

const userReducer = (state = initialState, action: Action): UserState => {
    switch(action.type) {
        case 'GET_USERS_SUCCESS':
            return {...state, notification: action.notification, users: {...action.payload.reduce((memo, user: UserAnyType) => ({...memo, [user._id]: user}), {})}}
        case 'GET_USERS_ERROR':
            return {...state, notification: action.notification}
        case 'ADD_USER_SUCCESS':
            return {...state, notification: action.notification, users: {...state.users, [action.payload._id]: action.payload}}
        case 'ADD_USER_ERROR':
            return {...state, notification: action.notification}
        case 'UPDATE_USER_SUCCESS':
            return {...state, notification: action.notification, users: {...state.users, [action.payload._id]: {...action.payload}}}
        case 'UPDATE_USER_ERROR':
            return {...state, notification: action.notification}
        case 'ADD_USER_TO_MUSEUM_SUCCESS':
            return {...state, notification: action.notification, users: {...state.users, [action.payload._id]: {...action.payload}}}
        case 'ADD_USER_TO_MUSEUM_ERROR':
            return {...state, notification: action.notification}
        case 'ADD_MUSEUM_SUCCESS':
            const user = state.users[action.id]
            const admin: Admin | undefined = user.type === "Admin" ? user : undefined
            if(!admin) {
                return state
            }
            const updatedAdmin = {...admin, museums: admin.museums.concat(action.payload)}
            return {...state, finished: true, notification: action.notification, users: {...state.users, [action.id]: updatedAdmin}}
        case 'ADD_MUSEUM_ERROR':
            return {...state, finished: true, notification: action.notification}
        case 'DELETE_USER_SUCCESS':
            return {...state, notification: action.notification, users: Object.values(state.users).filter(u => u._id !== action.id).reduce((memo, user) => ({...memo, [user._id]: user}), {})}
        case 'DELETE_USER_ERROR':
            return {...state, notification: action.notification}
        case 'ADD_RESERVATION_SUCCESS':
            return {...state, notification: action.notification, users: {...state.users, [action.payload._id]: {...action.payload}}}
        case 'ADD_RESERVATION_ERROR':
            return  {...state, notification: action.notification}
        case 'CONFIRM_TOUR_SUCCESS':
            return {...state, notification: action.notification, users: {...state.users, [action.payload._id]: {...action.payload}}}
        case 'CONFIRM_TOUR_ERROR':
            return {...state, notification: action.notification}
        case 'START_UPDATE':
            return {...state, finished: false}
        default:
            return state
    }
}


export const getUsers = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload: UserAnyType[] = await userService.getAll();
            dispatch({
                type:"GET_USERS_SUCCESS",
                payload,
                notification: {message: "", error: false}
            })
        } catch(e) {
            dispatch({
                type: "GET_USERS_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const addUser = (newUser: NewUser): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload: UserAnyType = await userService.addUser(newUser);
            dispatch({
                type: "ADD_USER_SUCCESS",
                payload,
                notification: {message: `${newUser.name} lisätty`, error: false}
            })
        } catch(e) {
            dispatch({
                type: "ADD_USER_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
        
    }
}

export const addMuseum = (newMuseum: NewMuseum, id: UserAnyType["_id"]): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type:"START_UPDATE"
        })
        try {
            const payload: Museum = await museumsService.addMuseum(newMuseum);
            dispatch({
                type:"ADD_MUSEUM_SUCCESS",
                payload,
                id,
                notification: {message: `${newMuseum.museumName} lisätty!`, error: false}
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: "ADD_MUSEUM_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const userToMuseum = (userId: string, museumId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload: UserAnyType = await userService.addUserToMuseum(userId, museumId);
            dispatch({
                type:"ADD_USER_TO_MUSEUM_SUCCESS",
                payload,
                notification: {message: "Käyttäjä lisätty museoon", error: false}
            })
        } catch(e) {
            dispatch({
                type: "ADD_USER_TO_MUSEUM_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const updateUser = (newUser: NewUser, id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload: UserAnyType = await userService.updateUser(newUser, id);
            dispatch({
                type:"UPDATE_USER_SUCCESS",
                payload,
                notification: {message: `${newUser.username} päivitetty!`, error: false}
            })
        } catch(e) {
            dispatch({
                type: "UPDATE_USER_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const deleteUser = (id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            await userService.deleteUser(id);
            dispatch({
                type:"DELETE_USER_SUCCESS",
                id,
                notification: {message: "Käyttäjä poistettu!", error: false}
            })
        } catch (e) {
            dispatch({
                type:"DELETE_USER_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const addReservation = (userId: string, museumId: string, reservation: Omit<ReservedTour, '_id' | 'salary' | 'confirmed' | 'guide' | 'museum'>) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload: UserAnyType = await userService.addReservation(userId, museumId, reservation)
            dispatch({
                type: "ADD_RESERVATION_SUCCESS",
                payload,
                notification: {message: "Varaus lisätty", error: false}
            })
        } catch(e) {
            dispatch({
                type:"ADD_RESERVATION_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const confirmTour = (tourId: string, userId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async(dispatch: Dispatch<Action>) => {
        try{
            const payload = await userService.confirmTour(tourId, userId);
            dispatch({
                type: "CONFIRM_TOUR_SUCCESS",
                payload,
                notification: {message: "Opastus varattu", error: false}
            })
        } catch(e) {
            dispatch({
                type: "CONFIRM_TOUR_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}
export default userReducer