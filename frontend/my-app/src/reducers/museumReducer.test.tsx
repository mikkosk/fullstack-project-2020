import moxios from "moxios";
import thunk, { ThunkDispatch } from "redux-thunk";
import museumReducer, { allMuseums, addMuseum, updateMuseum, deleteMuseum } from './museumReducer';
import { Museum, MuseumState } from '../types';
import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';
import { MockStoreCreator } from "redux-mock-store"
import createMockStore from "redux-mock-store";
import { initialStateEmptyTours, initialStateEmptyMuseums, initialStateEmpty } from '../../data/testData'

const middlewares: Array<Middleware> = [thunk]
type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>
const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> = 
    createMockStore<RootState, DispatchExts>(middlewares)

describe("Museum actions", () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    })

    test('calling AllMuseums dispatches GET_ALL_MUSEUMS and returns right objects', async () => {
        const initialState: RootState = initialStateEmpty
        const store = mockStoreCreator(initialState)
        const response: Museum[] = [
            {
                _id: "iidee",
                museumName: "testi",
                open: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                },
                closed: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                    
                },
                offeredTours:[],
                openInfo: "Auki",
                museumInfo: "Museo"   
            }
        ]

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })

        await store.dispatch<any>(allMuseums())
        const actions = store.getActions()

        expect.assertions(3)
        expect(actions[0].type).toEqual("GET_ALL_MUSEUMS")
        expect(actions[0].payload[0]).toMatchObject(response[0])
        expect(actions[0].payload[1]).toEqual(response[1])



    })

    test('addMuseum dispatches ADD_MUSEUM and returns right museum', async () => {
        const initialState: RootState = initialStateEmptyMuseums
        const museum: Museum = initialStateEmptyMuseums.museums.museums["iidee"]
        const store = mockStoreCreator(initialState)
        const response: Museum = 
            {
                _id: "iidee",
                museumName: "testi",
                open: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                },
                closed: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                    
                },
                offeredTours:[],
                openInfo: "Auki",
                museumInfo: "Museo"   
            }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })
        
        await store.dispatch<any>(addMuseum(response))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_MUSEUM")
        expect(actions[0].payload).toMatchObject(response)
    })

    test('updateMuseum dispatches UPDATE_MUSEUM and return updated museum', async () => {
        const initialState: RootState = initialStateEmptyTours
        const store = mockStoreCreator(initialState)
        const response: Museum = 
            {
                _id: "iidee",
                museumName: "muuttunut",
                open: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                },
                closed: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                    
                },
                offeredTours:[],
                openInfo: "Auki",
                museumInfo: "Museo"   
            }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })
        
        await store.dispatch<any>(updateMuseum(response, initialState.museums.museums["iidee"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("UPDATE_MUSEUM")
        expect(actions[0].payload).toMatchObject(response)
    })

    test('deleteMuseum dispatches DELETE_MUSEUM and returns 200', async () => {
        const initialState: RootState = initialStateEmptyTours

        const store = mockStoreCreator(initialState)
        
        moxios.stubRequest('http://localhost:3001/museum/iidee', {
            status: 200,
          })
        
        await store.dispatch<any>(deleteMuseum(initialState.museums.museums["iidee"]._id))
        const actions = store.getActions()

        expect.assertions(1)
        expect(actions[0].type).toEqual("DELETE_MUSEUM")
    })


});

describe('reducers', () => {
    const museum = {
        _id: "iidee",
                museumName: "testi",
                open: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                },
                closed: {
                    mon: "10:00",
                    tue: "10:00",
                    wed: "10:00",
                    thu: "10:00",
                    fri: "10:00",
                    sat: "10:00",
                    sun: "10:00"
                    
                },
                offeredTours:[],
                openInfo: "Auki",
                museumInfo: "Museo"  
    }

    const initialState: MuseumState = {
        museums: {
        }
    }

    const initialStateNotEmpty: MuseumState = { 
        museums: {
            "iidee": museum
        }
    }

    test('GET_ALL_MUSEUMS works correctly', () => {
        const reducer = museumReducer(initialState, {type: "GET_ALL_MUSEUMS", payload: [
            museum
        ]})

        expect(reducer).toEqual({
            museums: {
                "iidee": museum
            }
        }
        )
    })

    test('ADD_MUSEUM works correctly', () => {
        const reducer = museumReducer(initialState, {type: "ADD_MUSEUM", payload: 
            museum
        })

        expect(reducer).toEqual({
            museums: {
                "iidee": museum
            }
        }
        )
    })

    test('UPDATE_MUSEUM works correctly', () => {
        const updatedMuseum = {...museum, museumName: "Changed"}
        const reducer = museumReducer(initialStateNotEmpty, {type: "UPDATE_MUSEUM", payload: 
            updatedMuseum
        })

        expect(reducer).toEqual({
            museums: {
                "iidee": updatedMuseum
            }
        }
        )
    })

    test('DELETE_MUSEUM works correctly', () => {
        const reducer = museumReducer(initialStateNotEmpty, {type: "DELETE_MUSEUM", id: "iidee"})

        expect(reducer).toEqual({
            museums: {}
        })
    })


})