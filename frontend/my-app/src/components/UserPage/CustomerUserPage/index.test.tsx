import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import thunk from 'redux-thunk'
import { UserTypes } from '../../../types'
import { initialState, initialStateAdmin, initialStateCustomer } from '../../../../data/testData'
import { Provider } from 'react-redux'
import CustomerUserPage from '.'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useHistory: () => ({
        push: jest.fn()
    })
}));
  

function setup(type?: UserTypes) {
    let store = mockStore(initialState)
    if(type === "Admin") {
        store = mockStore(initialStateAdmin)
    } else if(type === "Customer") {
        store = mockStore(initialStateCustomer)
    }
    const enzymeWrapper = mount(<Provider store={store}><CustomerUserPage /></Provider>)

    return {
        enzymeWrapper
    }
}

describe('CustomerUserPage', () => {
    test('Nothing is shown if user is admin', () => {
        const { enzymeWrapper } = setup("Admin")
        expect(enzymeWrapper.text()).toBe("Mitään ei löytynyt")
    })

    test('Nothing is shown if user is not logged in', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.text()).toBe("Mitään ei löytynyt")
    })
    test('Page is shown if user is logged in', () => {
        const { enzymeWrapper } = setup("Customer")
        expect(enzymeWrapper.text().includes("Varatut opastukset")).toBe(true)
    })
})