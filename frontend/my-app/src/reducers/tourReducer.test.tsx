import moxios from "moxios";
import thunk, { ThunkDispatch } from "redux-thunk";
import tourReducer, { allTours, updateTour } from './tourReducer';
import { GuidedTour, TourState } from '../types';
import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';
import { MockStoreCreator } from "redux-mock-store"
import createMockStore from "redux-mock-store";
import { initialStateEmptyMuseums, initialStateEmpty, initialState } from '../../data/testData'

const middlewares: Array<Middleware> = [thunk]
type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>
const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> = 
    createMockStore<RootState, DispatchExts>(middlewares)

describe("Tour actions", () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    })

    test('calling AllTours dispatches GET_ALL_TOURS and returns right objects', async () => {
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
        expect(actions[0].type).toEqual("GET_ALL_TOURS")
        expect(actions[0].payload[0]).toMatchObject(response[0])
        expect(actions[0].payload[1]).toEqual(response[1])



    })

    test('updateTour dispatches UPDATE_TOUR and return updated tour', async () => {
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
        expect(actions[0].type).toEqual("UPDATE_TOUR")
        expect(actions[0].payload).toMatchObject(response)
    })
});


describe('reducers', () => {
    const initialState: TourState = {
        tours: {
        }
    }

    const initialStateNotEmpty: TourState = {
        tours: {
            "three":
            {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"}
    }
    }

    test('GET_ALL_TOURS works correctly', () => {
        const reducer = tourReducer(initialState, {type: "GET_ALL_TOURS", payload: [
            {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"}
        ]})

        expect(reducer).toEqual({
            tours: {
                    "three":
                    {lengthInMinutes: 2, 
                    maxNumberOfPeople:2, 
                    possibleLanguages: ["Two"],
                    price: 1, 
                    tourName: "Two", 
                    tourInfo: "Two", 
                    _id: "three"}
            }
        }
        )
    })

    test('UPDATE_TOUR works correctly', () => {
        const reducer = tourReducer(initialStateNotEmpty, {type: "UPDATE_TOUR", payload: 
            {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["One"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"}
        })

        expect(reducer).toEqual({
            tours: {
                    "three":
                    {lengthInMinutes: 2, 
                    maxNumberOfPeople:2, 
                    possibleLanguages: ["One"],
                    price: 1, 
                    tourName: "Two", 
                    tourInfo: "Two", 
                    _id: "three"}
            }
        }
        )
    })


})

