import moxios from "moxios";
import thunk, { ThunkDispatch } from "redux-thunk";
import museumReducer, { allMuseums, updateMuseum, deleteMuseum, addTour, deleteTour } from './museumReducer';
import { Museum, MuseumState, GuidedTour, MessageError } from '../types';
import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';
import { MockStoreCreator } from "redux-mock-store"
import createMockStore from "redux-mock-store";
import { initialStateEmptyTours, initialStateEmpty, initialState } from '../../data/testData'

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

describe("Museum actions", () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    })

    test('calling AllMuseums dispatches GET_ALL_MUSEUMS_SUCCESS and returns right objects', async () => {
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
        expect(actions[0].type).toEqual("GET_ALL_MUSEUMS_SUCCESS")
        expect(actions[0].payload[0]).toMatchObject(response[0])
        expect(actions[0].payload[1]).toEqual(response[1])



    })

    test('error when calling AllMuseums dispatches GET_ALL_MUSEUMS_ERROR and returns right message', async () => {
        const initialState: RootState = initialStateEmpty
        const store = mockStoreCreator(initialState)
        const response: MessageError = errorNotification
        

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })

        await store.dispatch<any>(allMuseums())
        const actions = store.getActions()

        expect.assertions(2)
        console.log(actions[0])
        expect(actions[0].type).toEqual("GET_ALL_MUSEUMS_ERROR")
        expect(actions[0].notification).toEqual(response)



    })
    

    test('addTour dispatches ADD_TOUR_SUCCESS and dispatches right tour', async () => {
        const initialState: RootState = initialStateEmptyTours
        const museum: Museum = initialStateEmptyTours.museums.museums["iidee"]
        const store = mockStoreCreator(initialState)
        const response: GuidedTour = {
            lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"
        }
        const payload: Museum = 
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
                offeredTours:[response],
                openInfo: "Auki",
                museumInfo: "Museo"   
            }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {payload: payload, notification: successNotification}
            })
        })
        
        await store.dispatch<any>(addTour(response, museum._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_TOUR_SUCCESS")
        expect(actions[0].payload.payload).toMatchObject(payload)
    })

    test('error when calling addTour dispatches ADD_TOUR_ERROR and dispatches right message', async () => {
        const initialState: RootState = initialStateEmptyTours
        const museum: Museum = initialStateEmptyTours.museums.museums["iidee"]
        const store = mockStoreCreator(initialState)
        const response: GuidedTour = {
            lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "three"
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(addTour(response, museum._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_TOUR_ERROR")
        expect(actions[0].notification).toMatchObject(errorNotification)
    })

    test('updateMuseum dispatches UPDATE_MUSEUM_SUCCESS and return updated museum', async () => {
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
        expect(actions[0].type).toEqual("UPDATE_MUSEUM_SUCCESS")
        expect(actions[0].payload).toMatchObject(response)
    })

    test('error when calling updateMuseum dispatches UPDATE_MUSEUM_ERROR and returns right notification', async () => {
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
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(updateMuseum(response, initialState.museums.museums["iidee"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("UPDATE_MUSEUM_ERROR")
        expect(actions[0].notification).toMatchObject(errorNotification)
    })

    test('deleteMuseum dispatches DELETE_MUSEUM_SUCCESS and returns 200', async () => {
        const initialState: RootState = initialStateEmptyTours

        const store = mockStoreCreator(initialState)
        
        moxios.stubRequest('http://localhost:3001/museum/iidee', {
            status: 200,
          })
        
        await store.dispatch<any>(deleteMuseum(initialState.museums.museums["iidee"]._id))
        const actions = store.getActions()

        expect.assertions(1)
        expect(actions[0].type).toEqual("DELETE_MUSEUM_SUCCESS")
    })

    test('error when calling deleteMuseum dispatches DELETE_MUSEUM_ERROR', async () => {
        const initialState: RootState = initialStateEmptyTours

        const store = mockStoreCreator(initialState)
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(deleteMuseum(initialState.museums.museums["iidee"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("DELETE_MUSEUM_ERROR")
        expect(actions[0].notification).toMatchObject(errorNotification)
    })

    test('deleteTour dispatches DELETE_TOUR_SUCCESS and returns 200', async () => {
        const store = mockStoreCreator(initialState)
        
        moxios.stubRequest('http://localhost:3001/tour/three/museum/iidee', {
            status: 200,
          })
        
        await store.dispatch<any>(deleteTour(initialState.museums.museums["iidee"]._id, initialState.tours.tours["three"]._id))
        const actions = store.getActions()

        expect.assertions(1)
        expect(actions[0].type).toEqual("DELETE_TOUR_SUCCESS")
    })
    test('error when calling deleteTour dispatches DELETE_TOUR_ERROR', async () => {
        const store = mockStoreCreator(initialState)
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(deleteTour(initialState.museums.museums["iidee"]._id, initialState.tours.tours["three"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("DELETE_TOUR_ERROR")
        expect(actions[0].notification).toMatchObject(errorNotification)
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
        finished: true,
        notification: {
            message: "",
            error: false
        },
        museums: {
        }
    }

    const initialStateNotEmpty: MuseumState = { 
        finished: true,
        notification: {
            message: "",
            error: false
        },
        museums: {
            "iidee": museum
        }
    }

    test('GET_ALL_MUSEUMS_SUCCESS works correctly', () => {
        const reducer = museumReducer(initialState, {type: "GET_ALL_MUSEUMS_SUCCESS", payload: [
            museum
        ], notification: {
            message: "",
            error: false
        }
        })

        expect(reducer).toEqual({
            museums: {
                "iidee": museum
            },
            finished: true,
            notification: {
                message: "",
                error: false
            }
        }
        )
    })

    test('GET_ALL_MUSEUMS_ERROR works correctly', () => {
        const reducer = museumReducer(initialState, {type: "GET_ALL_MUSEUMS_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

    test('UPDATE_MUSEUM_SUCCESS works correctly', () => {
        const updatedMuseum = {...museum, museumName: "Changed"}
        const reducer = museumReducer(initialStateNotEmpty, {type: "UPDATE_MUSEUM_SUCCESS", payload: 
            updatedMuseum,
            notification: {
                message: "",
                error: false
            }
        })

        expect(reducer).toEqual({
            museums: {
                "iidee": updatedMuseum
            },
            finished: true,
            notification: {
                message: "",
                error: false
            }
        }
        )
    })

    test('UPDATE_MUSEUM_ERROR works correctly', () => {
        const reducer = museumReducer(initialState, {type: "UPDATE_MUSEUM_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

    test('DELETE_MUSEUM_SUCCESS works correctly', () => {
        const reducer = museumReducer(initialStateNotEmpty, {type: "DELETE_MUSEUM_SUCCESS", id: "iidee", notification: {
            message: "",
            error: false
        }})

        expect(reducer).toEqual({
            museums: {},
            finished: true,
            notification: {
                message: "",
                error: false
            }
        })
    })

    test('DELETE_MUSEUM_ERROR works correctly', () => {
        const reducer = museumReducer(initialState, {type: "DELETE_MUSEUM_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

    test('ADD_TOUR_SUCCESS works correctly', () => {
        const reducer = museumReducer(initialStateNotEmpty, {type: "ADD_TOUR_SUCCESS", payload: {
            tour: {
                lengthInMinutes: 2, 
                maxNumberOfPeople:2, 
                possibleLanguages: ["Two"],
                price: 1, 
                tourName: "Two", 
                tourInfo: "Two", 
                _id: "three"
            },
            museumId: "iidee" 
            },
            notification: {
                message: "",
                error: false
            }
        })

        expect(reducer.museums["iidee"].offeredTours).toEqual(
            [{
                    lengthInMinutes: 2, 
                    maxNumberOfPeople:2, 
                    possibleLanguages: ["Two"],
                    price: 1, 
                    tourName: "Two", 
                    tourInfo: "Two", 
                    _id: "three"
            }]
        )
    })

    test('ADD_TOUR_ERROR works correctly', () => {
        const reducer = museumReducer(initialState, {type: "ADD_TOUR_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })
    
    test('DELETE_TOUR_SUCCESS works correctly', () => {
        const reducer = museumReducer(initialStateNotEmpty, {type: "DELETE_TOUR_SUCCESS", museumId: "iidee", tourId: "three", notification: {
            message: "",
            error: false
        }})

        expect(reducer.museums["iidee"].offeredTours).toEqual([])
    })

    test('DELETE_TOUR_ERROR works correctly', () => {
        const reducer = museumReducer(initialState, {type: "DELETE_TOUR_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

})