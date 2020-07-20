import museumsService from "../services/museumService"
import { Museum, MuseumState, NewMuseum, NewTour, AddTourPayload, GuidedTour, MessageError } from "../types"
import { Dispatch, memo } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import toursService from "../services/toursService"

export type Action= 
    | {
        type: "GET_ALL_MUSEUMS_SUCCESS"
        payload: Museum[]
        notification: MessageError
    } 
    |{
        type: "GET_ALL_MUSEUMS_ERROR"
        notification: MessageError
    }
    | {
        type: "DELETE_MUSEUM_SUCCESS"
        id: Museum['_id'],
        notification: MessageError
    }
    |{
        type: "DELETE_MUSEUM_ERROR"
        notification: MessageError
    }
    | {
        type: "UPDATE_MUSEUM_SUCCESS"
        payload: Museum
        notification: MessageError
    } 
    | {
        type: "UPDATE_MUSEUM_ERROR"
        notification: MessageError
    }
    |{
        type: "ADD_TOUR_SUCCESS"
        payload: AddTourPayload,
        notification: MessageError
    }
    |{
        type: "ADD_TOUR_ERROR",
        notification: MessageError
    }
    |{
        type: "DELETE_TOUR_SUCCESS"
        museumId: Museum["_id"];
        tourId: GuidedTour["_id"];
        notification: MessageError
    }
    |{
        type: "DELETE_TOUR_ERROR",
        notification: MessageError
    }
    |{
        type: "USER_REQUEST_SUCCESS",
        payload: Museum,
        notification: MessageError,
    }
    |{
        type: "USER_REQUEST_ERROR",
        notification: MessageError,
    }
    |{
        type: "REMOVE_REQUEST_SUCCESS",
        payload: Museum,
        notification: MessageError,
    }
    |{
        type: "REMOVE_REQUEST_ERROR",
        notification: MessageError,
    }
    

const initialState: MuseumState = {
    museums: {},
    finished: true,
    notification: {message: '', error: false}
}

const museumReducer = (state = initialState, action: Action): MuseumState => {
    switch(action.type) {
        case 'GET_ALL_MUSEUMS_SUCCESS':
            return {...state, notification: action.notification, museums: {...action.payload.reduce((memo, museum: Museum) => ({...memo, [museum._id]: museum}), {})}}
        case 'GET_ALL_MUSEUMS_ERROR':
            return {...state, notification: action.notification}
        case 'ADD_TOUR_SUCCESS':
            return {...state, notification: action.notification, museums: {...state.museums, [action.payload.museumId]: {
                ...state.museums[action.payload.museumId], offeredTours: [...state.museums[action.payload.museumId].offeredTours, action.payload.tour]
            }}}
        case 'ADD_TOUR_ERROR':
            return {...state, notification: action.notification}
        case 'UPDATE_MUSEUM_SUCCESS':
            return {...state, notification: action.notification, museums: {...state.museums, [action.payload._id]: {...action.payload}}}
        case 'UPDATE_MUSEUM_ERROR':
            return {...state, notification: action.notification}
        case 'DELETE_MUSEUM_SUCCESS':
            return {...state, notification: action.notification, museums: Object.values(state.museums).filter(t => t._id !== action.id).reduce((memo, museum) => ({...memo, [museum._id]: museum}), {})}
        case 'DELETE_MUSEUM_ERROR':
            return {...state, notification: action.notification}
        case 'DELETE_TOUR_SUCCESS':
            return {...state, notification: action.notification, museums: {...state.museums, [action.museumId]: {...state.museums[action.museumId], offeredTours: state.museums[action.museumId].offeredTours.filter(t => t._id !== action.tourId)}}}
        case 'DELETE_TOUR_ERROR':
            return {...state, notification: action.notification}
        case 'USER_REQUEST_SUCCESS':
            return {...state, notification: action.notification, museums: {...state.museums, [action.payload._id]: {...action.payload}}}
        case 'USER_REQUEST_ERROR':
            return {...state, notification: action.notification}
        case 'REMOVE_REQUEST_SUCCESS':
            return {...state, notification: action.notification, museums: {...state.museums, [action.payload._id]: {...action.payload}}}
        case 'REMOVE_REQUEST_ERROR':
            return {...state, notification: action.notification}
        default: 
            return state
    }
}

export const allMuseums = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload: Museum[] = await museumsService.getAll();
            const notification: MessageError = {
                message: "",
                error: false
            }
            dispatch({
                type:"GET_ALL_MUSEUMS_SUCCESS",
                payload,
                notification: notification
            })
        } catch(e) {
            dispatch({
                type:"GET_ALL_MUSEUMS_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const addTour = (newTour: NewTour, museumId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const payload: AddTourPayload = await toursService.addTour(newTour, museumId);
            dispatch({
                type:"ADD_TOUR_SUCCESS",
                payload,
                notification: {message: `${newTour.tourName} lisätty!`, error: false}
            })
        } catch(e) {
            dispatch({
                type: "ADD_TOUR_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const updateMuseum = (newMuseum: NewMuseum, id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        try{
            const payload: Museum = await museumsService.updateMuseum(newMuseum, id);
            dispatch({
                type:"UPDATE_MUSEUM_SUCCESS",
                payload,
                notification: {message: `${newMuseum.museumName} updated!`, error: false}
            })
        } catch(e) {
            dispatch({
                type: "UPDATE_MUSEUM_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const deleteMuseum = (id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async(dispatch: Dispatch<Action>) => {
        try {
            await museumsService.deleteMuseum(id);
            dispatch({
                type:"DELETE_MUSEUM_SUCCESS",
                id,
                notification: {message: "Museo poistettu", error: false}
            })
        } catch(e) {
            dispatch({
                type: "DELETE_MUSEUM_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const deleteTour = (museumId: string, tourId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async(dispatch: Dispatch<Action>) => {
        try {
            await toursService.deleteTour(museumId, tourId);
            dispatch({
                type:"DELETE_TOUR_SUCCESS",
                tourId,
                museumId,
                notification: {message: "Tour deleted", error: false}
            })
        } catch(e) {
            dispatch({
                type: "DELETE_TOUR_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const sendRequest = (userId: string, museumId: string): ThunkAction<void, RootState, unknown, Action> => {
    console.log("action")
    return async(dispatch: Dispatch<Action>) => {
        try{
            const payload = await museumsService.sendRequest(userId, museumId);
            dispatch({
                type: "USER_REQUEST_SUCCESS",
                payload,
                notification: {message: "Pyyntö lähetetty", error: false}
            })
        } catch(e) {
            dispatch({
                type: "USER_REQUEST_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}

export const removeRequest = (userId: string, museumId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async(dispatch: Dispatch<Action>) => {
        try{
            const payload = await museumsService.removeRequest(userId, museumId);
            dispatch({
                type: "REMOVE_REQUEST_SUCCESS",
                payload,
                notification: {message: "Pyyntö poistettu", error: false}
            })
        } catch(e) {
            dispatch({
                type: "REMOVE_REQUEST_ERROR",
                notification: {message: e.response.data, error: true}
            })
        }
    }
}


export default museumReducer