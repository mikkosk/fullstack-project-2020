import toursService from "../services/toursService"
import { GuidedTour, TourState, NewTour } from "../types"
import { Dispatch, memo } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"

export type Action = 
    | {
        type: "GET_ALL_TOURS"
        payload: GuidedTour[]
    }
    | {
        type: "ADD_TOUR"
        payload: GuidedTour
    }
    | {
        type: "DELETE_TOUR"
        id: string
    }
    | {
        type: "UPDATE_TOUR"
        payload: GuidedTour
    }

const initialState: TourState = {
    tours: {}
}

const tourReducer = (state = initialState, action: Action): TourState => {
    switch(action.type) {
        case 'GET_ALL_TOURS':
            return {...state, tours: {...action.payload.reduce((memo, tour: GuidedTour) => ({...memo, [tour._id]: tour}), {})}}
        case 'ADD_TOUR':
            console.log("lisätty")
            return {...state, tours: {...state.tours, [action.payload._id]: action.payload}}
        case 'UPDATE_TOUR':
            return {...state, tours: {...state.tours, [action.payload._id]: action.payload}}
        case 'DELETE_TOUR':
            return {...state, tours: Object.values(state.tours).filter(t => t._id !== action.id).reduce((memo, tour) => ({...memo, [tour._id]: tour}), {})}
        default: 
            return state
    }
}

export const allTours = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: GuidedTour[] = await toursService.getAll();
        dispatch({
            type:"GET_ALL_TOURS",
            payload
        })
    }
}

export const addTour = (newTour: NewTour): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        console.log("addTour")
        const payload: GuidedTour = await toursService.addTour(newTour);
        console.log(payload);
        dispatch({
            type:"ADD_TOUR",
            payload
        })
    }
}

export const updateTour = (newTour: NewTour, id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: GuidedTour = await toursService.updateTour(newTour, id);
        console.log(payload);
        dispatch({
            type:"ADD_TOUR",
            payload
        })
    }
}

export const deleteTour = (id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async(dispatch: Dispatch<Action>) => {
        await toursService.deleteTour(id);
        dispatch({
            type:"DELETE_TOUR",
            id
        })
    }
}

export default tourReducer