import toursService from "../services/toursService"
import { GuidedTour, TourState } from "../types"
import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"

export type Action = 
    | {
        type: "GET_ALL_TOURS"
        payload: GuidedTour[]
    }

const initialState: TourState = {
    tours: []
}

const tourReducer = (state = initialState, action: Action): TourState => {
    switch(action.type) {
        case 'GET_ALL_TOURS':
            return {tours: {...action.payload}}
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

export default tourReducer