import React from 'react'
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { allTours, addTour, updateTour, deleteTour } from './tourReducer';
import { GuidedTour, TourState } from '../types';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from '../store';

const middlewares = [thunk]
const createWithMiddleware = applyMiddleware(...middlewares)(createStore)
const mockStore = () => (createWithMiddleware(rootReducer));

describe("Tour actions", () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    })

    test('getting all tours updates store correctly', async () => {
        const store = mockStore()
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
        const expectedState: TourState ={ tours: {
            "three": {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"},
            "two": {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "two"}
            }
    
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })
        
        return store.dispatch<any>(allTours()).then(() =>  {
            const newState = store.getState()
            expect(newState.tours).toMatchObject(expectedState)
        })

    })

    test('adding a tour updates store correctly', () => {
        const store = mockStore()
        const response: GuidedTour = 
                {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"}
        
        const expectedState: TourState ={ tours: {
            "three": {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"},
            }
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })
        
        return store.dispatch<any>(addTour(response)).then(() =>  {
            const newState = store.getState()
            expect(newState.tours).toMatchObject(expectedState)
        })
    })

    test('updating updates store', async () => {
        const store = mockStore()
        const postResponse: GuidedTour = 
                {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"}

                const putResponse: GuidedTour = 
                {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 2, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"}
        
        const initialState: TourState ={ tours: {
            "three": {
                lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"},
                }
            }
            
        const stateAfterUpdate: TourState ={ 
            tours: {
                "three": {
                    ...initialState.tours["three"], price: 2
                }
            } 
        }

        moxios.stubRequest('http://localhost:3001/museum', {
            status: 200,
            response: postResponse
          })
        
        await store.dispatch<any>(addTour(postResponse))
        let newState = store.getState()
        expect(newState.tours).toMatchObject(initialState)

        moxios.stubRequest('http://localhost:3001/museum/three', {
            status: 200,
            response: putResponse
        })

        await store.dispatch<any>(updateTour(putResponse, postResponse._id))
        newState = store.getState()
        expect(newState.tours).toMatchObject(stateAfterUpdate)
    })

    test('deleting updates store', async () => {
        const store = mockStore()
        const postResponse: GuidedTour = 
                {lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"}

        
        const initialState: TourState ={ tours: {
            "three": {
                lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"},
                }
            }
            
        const stateAfterUpdate: TourState ={ 
            tours: {
            } 
        }
        
        moxios.stubRequest('http://localhost:3001/museum', {
            status: 200,
            response: postResponse
          })
        
        await store.dispatch<any>(addTour(postResponse))
        let newState = store.getState()
        expect(newState.tours).toMatchObject(initialState)

        moxios.stubRequest('http://localhost:3001/museum/three', {
            status: 200,
        })

        await store.dispatch<any>(deleteTour(postResponse._id))
        newState = store.getState()
        expect(newState.tours).toMatchObject(stateAfterUpdate)
    })


});