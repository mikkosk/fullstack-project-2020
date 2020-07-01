import { UserAnyType, UserState, NewUser, NewMuseum, Museum, Admin } from "../types"
import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import userService from "../services/userService"
import museumsService from "../services/museumService"

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
    | {
        type: "ADD_MUSEUM",
        payload: Museum
        id: string
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
        case 'ADD_MUSEUM':
            const user = state.users[action.id]
            const admin: Admin | undefined = user.type === "Admin" ? user : undefined
            if(!admin) {
                return state
            }
            const updatedAdmin = {...admin, museums: admin.museums.concat(action.payload)}
            return {...state, users: {...state.users, [action.id]: updatedAdmin}}
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

export const addMuseum = (newMuseum: NewMuseum, id: UserAnyType["_id"]): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: Museum = await museumsService.addMuseum(newMuseum);
        dispatch({
            type:"ADD_MUSEUM",
            payload,
            id
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