import toursService from "../services/toursService"
import { GuidedTour, TourState, NewTour, UserAnyType, UserState, NewUser } from "../types"
import { Dispatch, memo } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import userService from "../services/userService"

export type Action= 
    |{
        type: "GET_USERS"
        payload: UserAnyType[]
    }
    | {
        type: "ADD_USER"
        payload: UserAnyType
    }
    | {
        type: "DELETE_USER"
        id: UserAnyType["_id"]
    }
    | {
        type: "UPDATE_USER"
        payload: UserAnyType
    }
    | {
        type: "ADD_USER_TO_MUSEUM",
        payload: UserAnyType
    }

const initialState: UserState = {
    users: {}
}

const userReducer = (state = initialState, action: Action): UserState => {
    switch(action.type) {
        case 'GET_USERS':
            return {...state, users: {...action.payload.reduce((memo, user: UserAnyType) => ({...memo, [user._id]: user}), {})}}
        case 'ADD_USER':
            return {...state, users: {...state.users, [action.payload._id]: action.payload}}
        case 'UPDATE_USER':
            return {...state, users: {...state.users, [action.payload._id]: {...action.payload}}}
        case 'ADD_USER_TO_MUSEUM':
            return {...state, users: {...state.users, [action.payload._id]: {...action.payload}}}
        case 'DELETE_USER':
            return {...state, users: Object.values(state.users).filter(u => u._id !== action.id).reduce((memo, user) => ({...memo, [user._id]: user}), {})}
        default:
            return state
    }
}


export const getUsers = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: UserAnyType[] = await userService.getAll();
        dispatch({
            type:"GET_USERS",
            payload
        })
    }
}

export const addUser = (newUser: NewUser): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: UserAnyType = await userService.addUser(newUser);
        dispatch({
            type: "ADD_USER",
            payload
        })
    }
}

export const userToMuseum = (userId: string, museumId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: UserAnyType = await userService.addUserToMuseum(userId, museumId);
        dispatch({
            type:"ADD_USER_TO_MUSEUM",
            payload
        })
    }
}

export const updateUser = (newUser: NewUser, id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: UserAnyType = await userService.updateUser(newUser, id);
        dispatch({
            type:"UPDATE_USER",
            payload
        })
    }
}

export const deleteUser = (id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        await userService.deleteUser(id);
        dispatch({
            type:"DELETE_USER",
            id
        })
    }
}

export default userReducer