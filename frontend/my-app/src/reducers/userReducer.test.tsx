import moxios from "moxios";
import thunk, { ThunkDispatch } from "redux-thunk";
import tourReducer, { allTours, updateTour } from './tourReducer';
import userReducers, { getUsers, addUser, updateUser, userToMuseum, deleteUser } from './userReducer'
import { GuidedTour, TourState, UserAnyType, User, NewTour, NewUser } from '../types';
import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';
import { MockStoreCreator } from "redux-mock-store"
import createMockStore from "redux-mock-store";
import { initialStateEmpty, initialState } from '../../data/testData'

const middlewares: Array<Middleware> = [thunk]
type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>
const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> = 
    createMockStore<RootState, DispatchExts>(middlewares)

describe("User actions", () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    })

    test('calling getUsers dispatches GET_USERS and returns right objects', async () => {
        const initial: RootState = initialState
        const store = mockStoreCreator(initial)
        const response: UserAnyType[] = [
            {
                name: "One",
                type: "Admin",
                username: "One",
                passwordHash: "One",
                _id: "UserOne",
                museums: []
            }, 
            {
                name: "Two",
                type: "Customer",
                username: "Two",
                passwordHash: "Two",
                _id: "UserTwo"
            }
        ]

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })

        await store.dispatch<any>(getUsers())
        const actions = store.getActions()

        expect.assertions(3)
        expect(actions[0].type).toEqual("GET_USERS")
        expect(actions[0].payload[0]).toMatchObject(response[0])
        expect(actions[0].payload[1]).toMatchObject(response[1])
    })

    test('addUser dispatches ADD_USER and dispatches right user', async () => {
        const initial: RootState = initialState
        const store = mockStoreCreator(initial)
        const response: NewUser = {
            name: "Three",
            type: "Customer",
            username: "Three",
            password: "Three",
        }

        const payload: UserAnyType = 
            {
                name: "Three",
                type: "Customer",
                username: "Three",
                passwordHash: "Three",
                _id: "UserThree"
            }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            })
        })

        await store.dispatch<any>(addUser(response))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_USER")
        expect(actions[0].payload.name).toBe("Three")
    })

    test('updateUser dispatches UPDATE_USER and return updated user', async () => {
        const initial: RootState = initialState;
        const store = mockStoreCreator(initial);
        const response: NewUser = 
            {
                name: "Three",
                type: "Customer",
                username: "Three",
                password: "Three",
            }

        const payload: UserAnyType = {
                name: "Three",
                type: "Customer",
                username: "Three",
                passwordHash: "Three",
                _id: "UserOne"
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            })
        })
        
        await store.dispatch<any>(updateUser(response, initial.users.users["UserOne"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("UPDATE_USER")
        expect(actions[0].payload.name).toBe("Three")
    })

    test('userToMuseum dispatches ADD_USER_TO_MUSEUM and returns updated user', async () => {
        const initial: RootState = initialState;
        const store = mockStoreCreator(initial);

        const payload: UserAnyType = {
                name: "One",
                type: "Admin",
                username: "One",
                passwordHash: "One",
                _id: "UserOne",
                museums: [{
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
                    offeredTours:[{lengthInMinutes: 2, 
                        maxNumberOfPeople:2, 
                        possibleLanguages: ["Two"],
                        price: 1, 
                        tourName: "Two", 
                        tourInfo: "Two", 
                        _id: "three"}],
                    openInfo: "Auki",
                    museumInfo: "Museo"   
                }]
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            })
        })
        
        await store.dispatch<any>(userToMuseum(initial.users.users["UserOne"]._id, initial.museums.museums["iidee"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_USER_TO_MUSEUM")
        expect(actions[0].payload).toMatchObject(payload)
    })

    test('deleteUser dispatches DELETE_USER', async () => {
        const initial: RootState = initialState

        const store = mockStoreCreator(initial)
        
        moxios.stubRequest('http://localhost:3001/user/UserOne', {
            status: 200,
          })
        
        await store.dispatch<any>(deleteUser(initialState.users.users["UserOne"]._id))
        const actions = store.getActions()

        expect.assertions(1)
        expect(actions[0].type).toEqual("DELETE_USER")
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