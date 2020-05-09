import toursService from "../services/toursService"
import { GuidedTour, TourState, NewTour } from "../types"
import { Dispatch } from "react"
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

const initialState: TourState = {
    tours: []
}

const tourReducer = (state = initialState, action: Action): TourState => {
    switch(action.type) {
        case 'GET_ALL_TOURS':
            return {...state, tours: {...action.payload}}
        case 'ADD_TOUR':
            return {...state, tours: {...state.tours, [action.payload._id]: action.payload}}
        case 'DELETE_TOUR':
            return {...state, tours: Object.values(state.tours).filter(t => t._id !== action.id)}
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
        const payload: GuidedTour = await toursService.addTour(newTour);
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