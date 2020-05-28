import moxios from "moxios";
import thunk, { ThunkDispatch } from "redux-thunk";
import tourReducer, { allTours, updateTour } from './tourReducer';
import { GuidedTour, TourState, LoggedInUser, LoginState } from '../types';
import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';
import { MockStoreCreator } from "redux-mock-store"
import createMockStore from "redux-mock-store";
import { initialStateEmpty, initialState } from '../../data/testData'
import loginReducer, { login, logout } from "./loginReducer";

const middlewares: Array<Middleware> = [thunk]
type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>
const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> = 
    createMockStore<RootState, DispatchExts>(middlewares)

describe("Login actions", () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    })

    test('calling login dispatches LOGIN and returns right object', async () => {
        const initialState: RootState = initialStateEmpty
        const store = mockStoreCreator(initialState)
        const response: LoggedInUser = {
            type: "Admin",
            token: "token",
            name: "Name",
            username: "username",
            passwordHash: "hash",
            _id: "User",
            museums: []
        }

        await store.dispatch<any>(login(response))
        const actions = store.getActions()

        expect.assertions(2)
        expect(actions[0].type).toEqual("LOGIN")
        expect(actions[0].payload).toMatchObject(response)


    })

    test('logout dispatches LOGOUT and returns empty state', async () => {
        const initial: RootState = initialState;
        const store = mockStoreCreator(initial);

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            })
        })
        
        await store.dispatch<any>(logout())
        const actions = store.getActions()

        expect.assertions(1)
        expect(actions[0].type).toEqual("LOGOUT")
    })
});


describe('reducers', () => {
    const initialState: LoginState = {
            type: undefined,
            token: "",
            name: "",
            username: "",
            passwordHash: "",
            _id: "",
    }

    const initialStateNotEmpty: LoginState = {
            type: "Admin",
            token: "token",
            name: "Name",
            username: "username",
            passwordHash: "hash",
            _id: "User",
            museums: []
    }

    test('LOGIN works correctly', () => {
        const reducer = loginReducer(initialState, {type: "LOGIN", payload: {
            type: "Admin",
            token: "token",
            name: "Name",
            username: "username",
            passwordHash: "hash",
            _id: "User",
            museums: []}
        })

        expect(reducer).toEqual({ 
                type: "Admin",
                token: "token",
                name: "Name",
                username: "username",
                passwordHash: "hash",
                _id: "User",
                museums: []
            }
        )
    })

    test('LOGOUT works correctly', () => {
        const reducer = loginReducer(initialStateNotEmpty, {type: "LOGOUT"})

        expect(reducer).toEqual({
                type: undefined,
                token: "",
                name: "",
                username: "",
                passwordHash: "",
                _id: "",
                museums: []
        }
        )
    })


})
