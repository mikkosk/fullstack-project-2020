import toursService from "../services/toursService"
import { GuidedTour } from "../types"
import { Dispatch } from "react"

export type Action = 
    | {
        type: "GET_ALL_TOURS"
        payload: GuidedTour[]
    }

const reducer = (state = [], action: Action) => {
    switch(action.type) {
        case 'GET_ALL_TOURS':
            return action.payload
        default: 
            return state
    }
}

export const allTours = () => {
    return async (dispatch: Dispatch<Action>) => {
        const payload: GuidedTour[] = await toursService.getAll();
        dispatch({
            type:"GET_ALL_TOURS",
            payload
        })
    }

}

export default reducer