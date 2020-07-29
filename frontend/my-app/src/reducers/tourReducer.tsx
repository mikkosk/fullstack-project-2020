import toursService from "../services/toursService"
import { GuidedTour, TourState, NewTour, MessageError } from "../types"
import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"

export type Action= 
    | {
        type: "GET_ALL_TOURS_SUCCESS"
        payload: GuidedTour[],
        notification: MessageError
    }
    |{
        type: "GET_ALL_TOURS_ERROR"
        notification: MessageError
    }
    | {
        type: "DELETE_TOUR_SUCCESS"
        id: string,
        notification: MessageError
    }
    |{
        type: "DELETE_TOUR_ERROR",
        notification: MessageError
    }
    | {
        type: "UPDATE_TOUR_SUCCESS"
        payload: GuidedTour,
        notification: MessageError
    }
    |{
        type: "UPDATE_TOUR_ERROR",
        notification: MessageError
    }
    |{
        type: "START_UPDATE"
    }

const initialState: TourState = {
    tours: {},
    finished: true,
    notification: {message: "", error: true}
}

const tourReducer = (state = initialState, action: Action): TourState => {
    switch(action.type) {
        case 'GET_ALL_TOURS_SUCCESS':
            return {...state, notification: action.notification, finished: true, tours: {...action.payload.reduce((memo, tour: GuidedTour) => ({...memo, [tour._id]: tour}), {})}}
        case 'GET_ALL_TOURS_ERROR':
            return {...state, notification: action.notification}
        case 'UPDATE_TOUR_SUCCESS':
            return {...state, notification: action.notification, finished: true, tours: {...state.tours, [action.payload._id]: {...action.payload}}}
        case 'UPDATE_TOUR_ERROR':
            return {...state, notification: action.notification}    
        case 'START_UPDATE':
            return {...state, finished: false}
        default: 
            return state
    }
}

export const allTours = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload: GuidedTour[] = await toursService.getAll();
            dispatch({
                type:"GET_ALL_TOURS_SUCCESS",
                payload,
                notification: {message: "", error: false}
            })
        } catch(e) {
            dispatch({
                type:"GET_ALL_TOURS_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const updateTour = (newTour: NewTour, museumId: string, tourId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type:"START_UPDATE"
        })
        try {
            const payload: GuidedTour = await toursService.updateTour(newTour, museumId, tourId);
            dispatch({
                type:"UPDATE_TOUR_SUCCESS",
                payload,
                notification: {message: `${newTour.tourName} päivitetty!`, error: false}
            })
        } catch(e) {
            dispatch({
                type:"UPDATE_TOUR_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export default tourReducer