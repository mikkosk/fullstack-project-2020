import toursService from "../services/toursService"
import { GuidedTour, TourState, NewTour } from "../types"
import { Dispatch, memo } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"

export type Action= 
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

//Päivitä state niin, että museokin päivittyy
//Korjaa testit
const tourReducer = (state = initialState, action: Action): TourState => {
    switch(action.type) {
        case 'GET_ALL_TOURS':
            return {...state, tours: {...action.payload.reduce((memo, tour: GuidedTour) => ({...memo, [tour._id]: tour}), {})}}
        case 'UPDATE_TOUR':
            return {...state, tours: {...state.tours, [action.payload._id]: {...action.payload}}}
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

export const updateTour = (newTour: NewTour, id: string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: GuidedTour = await toursService.updateTour(newTour, id);
        dispatch({
            type:"UPDATE_TOUR",
            payload
        })
    }
}

export default tourReducer