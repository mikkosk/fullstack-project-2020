import {  NotificationState, MessageError } from "../types"
import { Dispatch, memo } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import toursService from "../services/toursService"

export type Action= 
    | {
        type: "ADD_NOTIFICATION"
        notification: MessageError
    }

const initialState: NotificationState = {
    notification: {message: '', error: false}
}

const notificationReducer = (state = initialState, action: Action): NotificationState => {
    switch(action.type) {
        case 'ADD_NOTIFICATION':
            return {...state, notification: action.notification}
        default: 
            return state
    }
}

export const addNotification = (notification: MessageError): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type:"ADD_NOTIFICATION",
            notification
        })
    }
}

export default notificationReducer