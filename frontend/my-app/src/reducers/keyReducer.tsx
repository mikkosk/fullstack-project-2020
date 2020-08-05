import { KeyState } from "../types"
import { RootState } from "../store"
import { ThunkAction } from "redux-thunk"
import { Dispatch } from "react"
import keyService from "../services/keyService"

export type Action= 
    | {
        type: "GET_KEY"
        payload: string
    }

const initialState: KeyState = {
    mapbox: ""
}

const keyReducer = (state = initialState, action: Action):KeyState => {
    switch(action.type) {
        case 'GET_KEY':
            return {...state, mapbox: action.payload}
        default: 
            return state
    }
}

export const getKey = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload = await keyService.getKey()
            dispatch({
                type:"GET_KEY",
                payload
            })
        } catch {
            return
        }
    }
}


export default keyReducer