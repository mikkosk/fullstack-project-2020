import moxios from "moxios";
import thunk, { ThunkDispatch } from "redux-thunk";
import { getUsers, addUser, updateUser, userToMuseum, deleteUser, addMuseum, addReservation } from './userReducer'
import { UserAnyType, NewUser, UserState, Museum, MessageError, Customer, ReservedTour, NewMuseum } from '../types';
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
            languages: []
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
            languages: []
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
                languages: []
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
                languages: []
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
                    reservedTours:[],
                    userRequests:[],
                    long: 0,
                    lat: 0,
                    location: "location"   
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
        
        moxios.stubRequest('http://localhost:3001/api/user/UserOne', {
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
                reservedTours:[],
                userRequests:[],
                long: 0,
                lat: 0,
                location: "location",
                image: undefined   
            }

        const newMuseum: NewMuseum = {
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
            openInfo: "Auki",
            museumInfo: "Museo",
            long: 0,
            lat: 0,
            location: "location",
            image: undefined 
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            })
        })
        
        await store.dispatch<any>(addMuseum(newMuseum, initialState.login._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[1].type).toEqual("ADD_MUSEUM_SUCCESS")
        expect(actions[1].payload).toMatchObject(response)
    })

    test('error when calling addMuseum dispatches ADD_MUSEUM_ERROR', async () => {
        const initialState: RootState = initialStateEmptyMuseums
        const store = mockStoreCreator(initialState)

        const newMuseum: NewMuseum = {
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
            openInfo: "Auki",
            museumInfo: "Museo",
            long: 0,
            lat: 0,
            location: "location",
            image: undefined 
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(addMuseum(newMuseum, initialState.login._id))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[1].type).toEqual("ADD_MUSEUM_ERROR")
        expect(actions[1].notification).toMatchObject(errorNotification)
    })

    const newReservation: Omit<ReservedTour, '_id' | 'salary' | 'confirmed'> = {
        lengthInMinutes:3,
        tourName:"Testi",
        maxNumberOfPeople:2,
        possibleLanguages: ["Kieli"],
        price:2,
        tourInfo:"Ei infoa saatavilla",
        chosenLanguage:"Kieli",
        groupName:"ryhmä",
        numberOfPeople:1,
        groupAge:"ikä",
        paymentMethod:"Cash",
        time:"04:00",
        date: new Date(),
        guide: {
            id: "",
            name: ""
        },
        museum: {
            id: "",
            name: ""
        },
        email:"Sähköposti",
        groupInfo:"Info",
    }
    const reservationFull: ReservedTour = {
        _id:"testi",
        lengthInMinutes:3,
        tourName:"Testi",
        maxNumberOfPeople:2,
        possibleLanguages: ["Kieli"],
        price:2,
        tourInfo:"Ei infoa saatavilla",
        chosenLanguage:"Kieli",
        groupName:"ryhmä",
        numberOfPeople:1,
        groupAge:"ikä",
        paymentMethod:"Cash",
        time:"04:00",
        date: new Date(),
        email:"Sähköposti",
        groupInfo:"Info",
        guide: {
            id: "",
            name: ""
        },
        museum: {
            id: "",
            name: ""
        },
        salary: 0,
        confirmed: false
    }

    test('addReservation dispatches ADD_REESERVATION_SUCCESS and returns user with updated reservation', async () => {
        const store = mockStoreCreator(initialState)
        let initialUser: Customer | undefined;
        if(initialState.users.users["UserTwo"].type === "Customer") {
            initialUser = initialState.users.users["UserTwo"]
        }
        if(!initialUser) {
            return
        }

        const user: Customer = 
            {
                ...initialUser,
                reservedTours: [
                    ...initialUser.reservedTours,
                    reservationFull
                ]
            }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: user
            })
        })
        
        await store.dispatch<any>(addReservation(initialState.login._id, Object.values(initialState.museums.museums)[0]._id, newReservation))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_RESERVATION_SUCCESS")
        expect(actions[0].payload).toMatchObject(user)
    })

    test('error when calling addReservation dispatches ADD_RESERVATION_ERROR', async () => {
        const store = mockStoreCreator(initialState)
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorResp)
        })
        
        await store.dispatch<any>(addReservation(initialState.login._id, Object.values(initialState.museums.museums)[0]._id, newReservation))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("ADD_RESERVATION_ERROR")
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
            museums: []},
            "UserTwo":
            {username: "UserTwo",
            name: "UserTwo",
            passwordHash: "UserTwo",
            type: "Customer", 
            _id: "UserTwo",
            reservedTours: []}
            
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
                reservedTours: [],
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
                reservedTours: [],
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
                ...initialStateNotEmpty.users,
                "UserOne":
                {username: "UserTwo",
                name: "UserOne",
                passwordHash: "UserOne",
                reservedTours: [],
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
                reservedTours: [],
                userRequests: [],
                long: 0,
                lat: 0,
                location: "location"   
            }]}, notification: 
            {message: "", error: false}
        })

        expect(reducer).toEqual({
            users: {
                ...initialStateNotEmpty.users,
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
                    museumInfo: "Museo",
                    reservedTours: [],
                    userRequests: [],
                    long: 0,
                    lat: 0,
                    location: "location"       
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
            users: {"UserTwo": initialStateNotEmpty.users["UserTwo"], 
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
                    reservedTours: [],
                    userRequests: [],
                    long: 0,
                    lat: 0,
                    location: "location"     
        }

        const reducer = userReducer(initialStateNotEmpty, {type: "ADD_MUSEUM_SUCCESS", payload: 
            museum,
            id: initialStateNotEmpty.users["UserOne"]._id, 
            notification: {message: "", error: false}
        })

        expect(reducer).toEqual({
            users: {
                ...initialStateNotEmpty.users, 
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

    test('ADD_RESERVATION_SUCCESS works correctly', () => {
        const userWithReservation = {
           ...initialStateNotEmpty.users["UserTwo"],
           reservedTours: [
                {_id:"testi",
                possibleLanguages:["Kieli"],
                lengthInMinutes:3,
                tourName:"Testi",
                maxNumberOfPeople:2,
                price:2,
                tourInfo:"Ei infoa saatavilla",
                chosenLanguage:"Kieli",
                groupName:"ryhmä",
                numberOfPeople:1,
                groupAge:"ikä",
                paymentMethod:"Cash" as const,
                time:"03:00",
                date: new Date(),
                email:"Sähköposti",
                guide: {
                    id: "",
                    name: ""
                },
                museum: {
                    id: "",
                    name: ""
                },
                groupInfo:"Info",
                salary:0,
                confirmed:false}
            ]
        }
        const reducer = userReducer(initialStateNotEmpty, {type: "ADD_RESERVATION_SUCCESS", payload: 
            userWithReservation,
            notification: {message: "", error: false}
        })

        expect(reducer).toEqual({
            users: {
                ...initialStateNotEmpty.users, 
                "UserTwo":
                {...userWithReservation}
            }, notification: {message: "", error: false}, finished: true
            }
        )
    })

    test('ADD_RESERVATION_ERROR works correctly', () => {
        const reducer = userReducer(initialState, {type: "ADD_RESERVATION_ERROR", notification: errorNotification
        })

        expect(reducer).toEqual({
            ...initialState,
            notification: errorNotification
        }
        )
    })

})