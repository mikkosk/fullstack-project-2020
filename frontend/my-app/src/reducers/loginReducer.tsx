import { LoginState, UserAnyType, LoggedInUser } from "../types"
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
            const { _id, username, name, passwordHash, type, token } = action.payload
            return {_id, username, name, passwordHash, type, token}
        case 'LOGOUT':
            return {_id: "", username: "", name: "", passwordHash: "", type: undefined, token: ""}
        default: 
            return state
    }
}

export const login = (username: string, password: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: LoggedInUser = await loginService.login(username, password);
        dispatch({
            type:"LOGIN",
            payload
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