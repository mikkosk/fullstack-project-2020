import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { initialState, initialStateCustomer, initialStateAdmin } from '../../../data/testData'
import { UserTypes } from '../../types'
import ReservationPage from '.'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id: "testi"
    }),
    useHistory: () => ({
        push: jest.fn()
    })
}));
  

function setup(type?: UserTypes) {
    let store = mockStore(initialState)
    if(type === "Customer") {
        store = mockStore(initialStateCustomer)
    } else if(type === "Admin") {
        store = mockStore(initialStateAdmin)
    }

    const enzymeWrapper = mount(<Provider store={store}><ReservationPage /></Provider>)

    return {
        enzymeWrapper
    }
}

describe("ReservationPage", () => {
    test("Shows grid if customer with that reservation", () => {
        const {enzymeWrapper} = setup("Customer")
        expect(enzymeWrapper.find("Grid").exists()).toBe(true)
    })

    test("Shows grid if admin which belongs to museum where the tour is reserved from", () => {
        const { enzymeWrapper } = setup("Admin")
        expect(enzymeWrapper.find("Grid").exists()).toBe(true)
    })

    test("Otwerwise, shows nothing", () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find("Grid").exists()).toBe(false)
    })
})