import React from 'react'
import LogoutBar from './LogoutBar'
import Adapter from 'enzyme-adapter-react-16'
import '@testing-library/jest-dom/extend-expect'
import Enzyme, {mount} from 'enzyme'
import { act } from 'react-dom/test-utils'
import { wait } from '@testing-library/react'
import thunk from 'redux-thunk'
import { initialState, initialStateEmpty } from '../../../data/testData'
import configureStore, { MockStore, MockStoreEnhanced } from 'redux-mock-store'
import { Provider } from 'react-redux'

Enzyme.configure({adapter: new Adapter() })

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const inStore = mockStore(initialState)
const outStore = mockStore(initialStateEmpty)
function setup(loggedIn: boolean) {
    var enzymeWrapper
    if(loggedIn) {
        enzymeWrapper = mount(<Provider store={inStore}><LogoutBar /></Provider>)
    } else {
        enzymeWrapper = mount (<Provider store={outStore}><LogoutBar /></Provider>)
    }

    return {
        enzymeWrapper
    }
}


describe('LogoutBar', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Logout is displayed', () => {
        const { enzymeWrapper } = setup(true)
        const logout = enzymeWrapper.find('MenuItem[name="logout"]')
        expect(logout).toBeDefined()
    })

    test('Push is triggered on click LOGOUT', () => {
        const { enzymeWrapper } = setup(true)
        const logout = enzymeWrapper.find('MenuItem[name="logout"]')
        logout.simulate('click')
        expect(mockHistoryPush).toBeCalledTimes(1)
    })

    test('Login is displayed', () => {
        const { enzymeWrapper } = setup(false)
        const login = enzymeWrapper.find('MenuItem[name="login"]')

        expect(login).toBeDefined()
    })

    test('Push is triggered on click LOGIN', () => {
        const { enzymeWrapper } = setup(false)
        const login = enzymeWrapper.find('MenuItem[name="login"]')
        login.simulate('click')
        expect(mockHistoryPush).toBeCalledTimes(1)
    })

})