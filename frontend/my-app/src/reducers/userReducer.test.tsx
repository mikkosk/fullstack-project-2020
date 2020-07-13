import moxios from "moxios";
import thunk, { ThunkDispatch } from "redux-thunk";
import { getUsers, addUser, updateUser, userToMuseum, deleteUser, addMuseum } from './userReducer'
import { UserAnyType, NewUser, UserState, Museum, MessageError } from '../types';
import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';
import { MockStoreCreator } from "redux-mock-store"
import createMockStore from "redux-mock-store";
import { initialStateEmpty, initialState, initialStateEmptyMuseums } from '../../data/testData'
import userReducer from "./userReducer";

const middlewares: Array<Middleware> = [thunk]
type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>
const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> = 
    createMockStore<RootState, DispatchExts>(middlewares)

const errorNotification: MessageError = {
    message: "Virhe",
    error: true
}

/* const successNotification: MessageError = {
    message: "Success",
    error: false
}
*/

const errorResp = {
    status:400,
    response: "Virhe"
}

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
                _id: "UserTwo",
                reservedTours: []
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
        expect(actions[0].type).toEqual("GET_USERS_SUCCESS")
        expect(actions[0].payload[0]).toMatchObject(response[0])
        expect(actions[0].payload[1]).toMatchObject(response[1])
    })

    test('error when getUsers dispatches GET_USERS_ERROR and returns right message', async () => {
        const initialState: RootState = initialStateEmpty
        const store = mockStoreCreator(initialState)

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })

        await store.dispatch<any>(getUsers())
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("GET_USERS_ERROR")
        expect(actions[0].notification).toEqual(errorNotification)
    })

    test('addUser dispatches ADD_USER_SUCCESS and dispatches right user', async () => {
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
                _id: "UserThree",
                reservedTours:[]
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
        expect(actions[0].type).toEqual("ADD_USER_SUCCESS")
        expect(actions[0].payload.name).toBe("Three")
    })

    test('error when calling addUser dispatches ADD_USER_ERROR', async () => {
        const initial: RootState = initialState
        const store = mockStoreCreator(initial)
        const response: NewUser = {
            name: "Three",
            type: "Customer",
            username: "Three",
            password: "Three",
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })

        await store.dispatch<any>(addUser(response))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_USER_ERROR")
        expect(actions[0].notification).toEqual(errorNotification)
    })

    test('updateUser dispatches UPDATE_USER_SUCCESS and return updated user', async () => {
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
                _id: "UserOne",
                reservedTours:[]
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
        expect(actions[0].type).toEqual("UPDATE_USER_SUCCESS")
        expect(actions[0].payload.name).toBe("Three")
    })

    test('error when calling updateUser dispatches UPDATE_USER_ERROR', async () => {
        const initial: RootState = initialState;
        const store = mockStoreCreator(initial);
        const response: NewUser = 
            {
                name: "Three",
                type: "Customer",
                username: "Three",
                password: "Three",
            }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(updateUser(response, initial.users.users["UserOne"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("UPDATE_USER_ERROR")
        expect(actions[0].notification).toEqual(errorNotification)
    })

    test('userToMuseum dispatches ADD_USER_TO_MUSEUM_SUCCESS and returns updated user', async () => {
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
                    museumInfo: "Museo",
                    reservedTours:[]   
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
        expect(actions[0].type).toEqual("ADD_USER_TO_MUSEUM_SUCCESS")
        expect(actions[0].payload).toMatchObject(payload)
    })

    test('error when calling userToMuseum dispatches ADD_USER_TO_MUSEUM_ERROR', async () => {
        const initial: RootState = initialState;
        const store = mockStoreCreator(initial);

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(userToMuseum(initial.users.users["UserOne"]._id, initial.museums.museums["iidee"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_USER_TO_MUSEUM_ERROR")
        expect(actions[0].notification).toEqual(errorNotification)
    })

    

    test('deleteUser dispatches DELETE_USER_SUCCESS', async () => {
        const initial: RootState = initialState

        const store = mockStoreCreator(initial)
        
        moxios.stubRequest('http://localhost:3001/user/UserOne', {
            status: 200,
          })
        
        await store.dispatch<any>(deleteUser(initialState.users.users["UserOne"]._id))
        const actions = store.getActions()

        expect.assertions(1)
        expect(actions[0].type).toEqual("DELETE_USER_SUCCESS")
    })

    test('error when calling deleteUser dispatches DELETE_USER_ERROR', async () => {
        const initial: RootState = initialState

        const store = mockStoreCreator(initial)
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(deleteUser(initialState.users.users["UserOne"]._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("DELETE_USER_ERROR")
        expect(actions[0].notification).toEqual(errorNotification)
    })

    test('addMuseum dispatches ADD_MUSEUM_SUCCESS and returns right museum', async () => {
        const initialState: RootState = initialStateEmptyMuseums
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
                museumInfo: "Museo",
                reservedTours:[]   
            }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })
        
        await store.dispatch<any>(addMuseum(response, initialState.login._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_MUSEUM_SUCCESS")
        expect(actions[0].payload).toMatchObject(response)
    })

    test('error when calling addMuseum dispatches ADD_MUSEUM_ERROR', async () => {
        const initialState: RootState = initialStateEmptyMuseums
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
                museumInfo: "Museo",
                reservedTours:[]   
            }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(addMuseum(response, initialState.login._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_MUSEUM_ERROR")
        expect(actions[0].notification).toMatchObject(errorNotification)
    })
});


describe('reducers', () => {
    const initialState: UserState = {
        users: {
        }, notification: {message: "", error: false}, finished: true
    }

    const initialStateNotEmpty: UserState = {
        users: {
            "UserOne":
            {username: "UserOne",
            name: "UserOne",
            passwordHash: "UserOne",
            type: "Admin", 
            _id: "UserOne",
            museums: []}
        }, notification: {message: "", error: false}, finished: true
    }

    test('GET_USERS_SUCCESS works correctly', () => {
        const reducer = userReducer(initialState, {type: "GET_USERS_SUCCESS", payload: [
            {username: "UserOne",
            name: "UserOne",
            passwordHash: "UserOne",
            type: "Customer" as const, 
            reservedTours: [],
            _id: "UserOne"}
        ], notification: {message: "", error: false}})

        expect(reducer).toEqual({
            users: {
                "UserOne":
                {username: "UserOne",
                name: "UserOne",
                passwordHash: "UserOne",
                type: "Customer", 
                _id: "UserOne"}
            }, notification: {message: "", error: false}, finished: true
        }
        )
    })

    test('GET_USERS_ERROR works correctly', () => {
        const reducer = userReducer(initialState, {type: "GET_USERS_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

    test('ADD_USER_SUCCESS works correctly', () => {
        const reducer = userReducer(initialState, {type: "ADD_USER_SUCCESS", payload: 
            {username: "UserOne",
            name: "UserOne",
            passwordHash: "UserOne",
            type: "Customer" as const, 
            reservedTours: [],
            _id: "UserOne"},
            notification: {message: "", error: false}
        })

        expect(reducer).toEqual({
            users: {
                "UserOne":
                {username: "UserOne",
                name: "UserOne",
                passwordHash: "UserOne",
                type: "Customer", 
                _id: "UserOne"}
            }, 
            notification: {message: "", error: false}, 
            finished: true
        }
        )
    })

    test('ADD_USER_ERROR works correctly', () => {
        const reducer = userReducer(initialState, {type: "ADD_USER_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

    test('UPDATE_USER_SUCCESS works correctly', () => {
        const reducer = userReducer(initialStateNotEmpty, {type: "UPDATE_USER_SUCCESS", payload: 
            {username: "UserTwo",
            name: "UserOne",
            passwordHash: "UserOne",
            type: "Customer" as const, 
            reservedTours: [],
            _id: "UserOne"}, 
            notification: {message: "", error: false}
        })

        expect(reducer).toEqual({
            users: {
                "UserOne":
                {username: "UserTwo",
                name: "UserOne",
                passwordHash: "UserOne",
                type: "Customer", 
                _id: "UserOne"}
            }, 
            notification: {message: "", error: false}, 
            finished: true
        }
        )
    })

    test('UPDATE_USER_ERROR works correctly', () => {
        const reducer = userReducer(initialState, {type: "UPDATE_USER_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

    test('ADD_USER_TO_MUSEUM_SUCCESS works correctly', () => {
        const reducer = userReducer(initialStateNotEmpty, {type: "ADD_USER_TO_MUSEUM_SUCCESS", payload: 
            {username: "UserOne",
            name: "UserOne",
            passwordHash: "UserOne",
            type: "Admin", 
            _id: "UserOne",
            museums:[{
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
                museumInfo: "Museo",
                reservedTours: [] 
            }]}, notification: 
            {message: "", error: false}
        })

        expect(reducer).toEqual({
            users: {
                "UserOne":
                {username: "UserOne",
                name: "UserOne",
                passwordHash: "UserOne",
                type: "Admin", 
                _id: "UserOne",
                museums:[{
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
                }]}
            }, notification: {message: "", error: false}, finished: true
        }
        )
    })

    test('ADD_USER_TO_MUSEUM_ERROR works correctly', () => {
        const reducer = userReducer(initialState, {type: "ADD_USER_TO_MUSEUM_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

    test('DELETE_USER_SUCCESS works correctly', () => {
        const reducer = userReducer(initialStateNotEmpty, {type: "DELETE_USER_SUCCESS", id: "UserOne", notification: {message: "", error: false}});

        expect(reducer).toEqual({
            users: {
            }, notification: {message: "", error: false}, finished: true
        }
        )
    })

    test('DELETE_USER_ERROR works correctly', () => {
        const reducer = userReducer(initialState, {type: "DELETE_USER_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })
    test('ADD_MUSEUM_SUCCESS works correctly', () => {
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
                    museumInfo: "Museo",
                    reservedTours: []  
        }

        const reducer = userReducer(initialStateNotEmpty, {type: "ADD_MUSEUM_SUCCESS", payload: 
            museum,
            id: initialStateNotEmpty.users["UserOne"]._id, 
            notification: {message: "", error: false}
        })

        expect(reducer).toEqual({
            users: {
                "UserOne":
                {username: "UserOne",
                name: "UserOne",
                passwordHash: "UserOne",
                type: "Admin", 
                _id: "UserOne",
                museums: [museum]}
            }, notification: {message: "", error: false}, finished: true
        }
        )
    })

    test('ADD_MUSEUM_ERROR works correctly', () => {
        const reducer = userReducer(initialState, {type: "ADD_MUSEUM_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })


})