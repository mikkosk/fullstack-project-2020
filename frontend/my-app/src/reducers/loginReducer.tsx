import { LoginState, UserAnyType, LoggedInUser, Museum } from "../types"
import loginService from "../services/loginService"
import { RootState } from "../store"
import { ThunkAction } from "redux-thunk"
import { Dispatch } from "react"

export type Action= 
    | {
        type: "LOGIN"
        payload: LoggedInUser
    }
    | {
        type: "LOGOUT"
    }

const initialState: LoginState = {
    _id: "",
    username: "",
    name: "",
    passwordHash: "",
    type: undefined,
    token: ""
}

const loginReducer = (state = initialState, action: Action): LoginState => {
    switch(action.type) {
        case 'LOGIN':
            const { _id, username, name, passwordHash, type, token} = action.payload
            let museums: Museum[] = [];
            if(action.payload.type === "Admin") {
                museums = action.payload.museums
            }
            return {_id, username, name, passwordHash, type, token, museums}
        case 'LOGOUT':
            return {_id: "", username: "", name: "", passwordHash: "", type: undefined, token: "", museums: []}
        default: 
            return state
    }
}

export const login = (loggedInUser: LoggedInUser): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type:"LOGIN",
            payload: loggedInUser
        })
    }
}

export const logout = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type:"LOGOUT",
        })
    }
}

export default loginReducer