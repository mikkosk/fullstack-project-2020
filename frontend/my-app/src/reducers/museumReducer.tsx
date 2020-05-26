import museumsService from "../services/museumService"
import { Museum, MuseumState, NewMuseum, NewTour, AddTourPayload, GuidedTour } from "../types"
import { Dispatch, memo } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import toursService from "../services/toursService"

export type Action= 
    | {
        type: "GET_ALL_MUSEUMS"
        payload: Museum[]
    }
    | {
        type: "ADD_MUSEUM"
        payload: Museum
    }
    | {
        type: "DELETE_MUSEUM"
        id: Museum['_id']
    }
    | {
        type: "UPDATE_MUSEUM"
        payload: Museum
    } 
    |{
        type: "ADD_TOUR"
        payload: AddTourPayload
    }
    |{
        type: "DELETE_TOUR"
        museumId: Museum["_id"];
        tourId: GuidedTour["_id"];
    }

const initialState: MuseumState = {
    museums: {}
}

const museumReducer = (state = initialState, action: Action): MuseumState => {
    switch(action.type) {
        case 'GET_ALL_MUSEUMS':
            return {...state, museums: {...action.payload.reduce((memo, museum: Museum) => ({...memo, [museum._id]: museum}), {})}}
        case 'ADD_MUSEUM':
            return {...state, museums: {...state.museums, [action.payload._id]: action.payload}}
        case 'ADD_TOUR':
            return {...state, museums: {...state.museums, [action.payload.museumId]: {
                ...state.museums[action.payload.museumId], offeredTours: [...state.museums[action.payload.museumId].offeredTours, action.payload.tour]
            }}}
        case 'UPDATE_MUSEUM':
            return {...state, museums: {...state.museums, [action.payload._id]: {...action.payload}}}
        case 'DELETE_MUSEUM':
            return {...state, museums: Object.values(state.museums).filter(t => t._id !== action.id).reduce((memo, museum) => ({...memo, [museum._id]: museum}), {})}
        case 'DELETE_TOUR':
            return {...state, museums: {...state.museums, [action.museumId]: {...state.museums[action.museumId], offeredTours: state.museums[action.museumId].offeredTours.filter(t => t._id !== action.tourId)}}}
        default: 
            return state
    }
}

export const allMuseums = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: Museum[] = await museumsService.getAll();
        dispatch({
            type:"GET_ALL_MUSEUMS",
            payload
        })
    }
}

export const addMuseum = (newMuseum: NewMuseum): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: Museum = await museumsService.addMuseum(newMuseum);
        dispatch({
            type:"ADD_MUSEUM",
            payload
        })
    }
}

export const addTour = (newTour: NewTour, museumId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: AddTourPayload = await toursService.addTour(newTour, museumId);
        dispatch({
            type:"ADD_TOUR",
            payload
        })
    }
}

export const updateMuseum = (newMuseum: NewMuseum, id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: Museum = await museumsService.updateMuseum(newMuseum, id);
        dispatch({
            type:"UPDATE_MUSEUM",
            payload
        })
    }
}

export const deleteMuseum = (id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async(dispatch: Dispatch<Action>) => {
        await museumsService.deleteMuseum(id);
        dispatch({
            type:"DELETE_MUSEUM",
            id
        })
    }
}

export const deleteTour = (museumId: string, tourId: string): ThunkAction<void, RootState, unknown, Action> => {
    return async(dispatch: Dispatch<Action>) => {
        await toursService.deleteTour(museumId, tourId);
        dispatch({
            type:"DELETE_TOUR",
            tourId,
            museumId
        })
    }
}

export default museumReducer