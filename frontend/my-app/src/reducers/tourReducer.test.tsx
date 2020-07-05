import moxios from "moxios";
import thunk, { ThunkDispatch } from "redux-thunk";
import tourReducer, { allTours, updateTour } from './tourReducer';
import { GuidedTour, TourState, MessageError } from '../types';
import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';
import { MockStoreCreator } from "redux-mock-store"
import createMockStore from "redux-mock-store";
import { initialStateEmpty, initialState } from '../../data/testData'

const middlewares: Array<Middleware> = [thunk]
type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>
const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> = 
    createMockStore<RootState, DispatchExts>(middlewares)

const errorNotification: MessageError = {
    message: "Virhe",
    error: true
}
const successNotification: MessageError = {
    message: "Success",
    error: false
}

const errorResp = {
    status: 500,
    response: "Virhe"
}

describe("Tour actions", () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    })

    test('calling AllTours dispatches GET_ALL_TOURS_SUCCESS and returns right objects', async () => {
        const initialState: RootState = initialStateEmpty
        const store = mockStoreCreator(initialState)
        const response: GuidedTour[] = [
                {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"},
                {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "two"}
        ]

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })

        await store.dispatch<any>(allTours())
        const actions = store.getActions()

        expect.assertions(3)
        expect(actions[0].type).toEqual("GET_ALL_TOURS_SUCCESS")
        expect(actions[0].payload[0]).toMatchObject(response[0])
        expect(actions[0].payload[1]).toEqual(response[1])
    })

    test('error when AllTours dispatches GET_ALL_TOURS_ERROR and returns right message', async () => {
        const initialState: RootState = initialStateEmpty
        const store = mockStoreCreator(initialState)

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })

        await store.dispatch<any>(allTours())
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("GET_ALL_TOURS_ERROR")
        expect(actions[0].notification).toEqual(errorNotification)
    })

    test('updateTour dispatches UPDATE_TOUR_SUCCESS and return updated tour', async () => {
        const initial: RootState = initialState;
        const store = mockStoreCreator(initial);
        const response: GuidedTour = 
                {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["One"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"}

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })
        
        await store.dispatch<any>(updateTour(response, initial.museums.museums["iidee"]._id, initial.tours.tours["three"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[1].type).toEqual("UPDATE_TOUR_SUCCESS")
        expect(actions[1].payload).toMatchObject(response)
    })

    test('error when calling updateTour dispatches UPDATE_TOUR_ERROR and returns right message', async () => {
        const initial: RootState = initialState;
        const store = mockStoreCreator(initial);
        const response: GuidedTour = 
                {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["One"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"}

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(updateTour(response, initial.museums.museums["iidee"]._id, initial.tours.tours["three"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[1].type).toEqual("UPDATE_TOUR_ERROR")
        expect(actions[1].notification).toMatchObject(errorNotification)
    })
});


describe('reducers', () => {
    const initialState: TourState = {
        finished: true,
        tours: {
        },
        notification: {
            message: "",
            error: false
        }
    }

    const initialStateNotEmpty: TourState = {
        finished: true,
        tours: {
            "three":
            {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"}
        },
        notification: {
            message: "",
            error: false
        }
    }

    test('GET_ALL_TOURS works correctly', () => {
        const reducer = tourReducer(initialState, {type: "GET_ALL_TOURS_SUCCESS", payload: [
            {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"}
        ],
            notification: {
                message: "Success",
                error: false
            }
        })

        expect(reducer).toEqual({
            finished: true,
            tours: {
                    "three":
                    {lengthInMinutes: 2, 
                    maxNumberOfPeople:2, 
                    possibleLanguages: ["Two"],
                    price: 1, 
                    tourName: "Two", 
                    tourInfo: "Two", 
                    _id: "three"}
            },
            notification: {
                message: "Success",
                error: false
            }
        }
        )
    })

    test('GET_ALL_TOURS_ERROR works correctly', () => {
        const reducer = tourReducer(initialState, {type: "GET_ALL_TOURS_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

    test('UPDATE_TOUR works correctly', () => {
        const reducer = tourReducer(initialStateNotEmpty, {type: "UPDATE_TOUR_SUCCESS", payload: 
            {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["One"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"},
            notification: {
                message: "Success",
                error: false
            }
        })

        expect(reducer).toEqual({
            finished: true,
            tours: {
                    "three":
                    {lengthInMinutes: 2, 
                    maxNumberOfPeople:2, 
                    possibleLanguages: ["One"],
                    price: 1, 
                    tourName: "Two", 
                    tourInfo: "Two", 
                    _id: "three"}
            },
            notification: {
                message: "Success",
                error: false
            }
        }
        )
    })

    test('UPDATE_TOUR_ERROR works correctly', () => {
        const reducer = tourReducer(initialState, {type: "UPDATE_TOUR_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })


})

