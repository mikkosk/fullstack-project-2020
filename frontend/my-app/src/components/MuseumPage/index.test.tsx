import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { initialState, initialStateCustomer, initialStateAdmin } from '../../../data/testData'
import { UserTypes } from '../../types'
import MuseumPage from '.'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id: "iidee"
    }),
    useHistory: () => ({
        push: jest.fn()
    })
}));

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
  }));

function setup(type?: UserTypes) {
    let store = mockStore(initialState)
    if(type === "Customer") {
        store = mockStore(initialStateCustomer)
    } else if(type === "Admin") {
        store = mockStore(initialStateAdmin)
    }

    const enzymeWrapper = mount(<Provider store={store}><MuseumPage /></Provider>)

    return {
        enzymeWrapper
    }
}

describe('MuseumPage', () => {

    test('Admin page, if admin and belongs to museum', () => {
        const { enzymeWrapper } = setup("Admin")
        expect(enzymeWrapper.find('MuseumAdminPage').exists()).toBe(true)
        expect(enzymeWrapper.find('MuseumCustomerPage').exists()).toBe(false)
    })

    test('Customer page, if customer', () => {
        const { enzymeWrapper } = setup("Customer")
        expect(enzymeWrapper.find('MuseumAdminPage').exists()).toBe(false)
        expect(enzymeWrapper.find('MuseumCustomerPage').exists()).toBe(true)
    })

    test('Customer page, if not logged in', () => {
        const { enzymeWrapper } = setup("Customer")
        expect(enzymeWrapper.find('MuseumAdminPage').exists()).toBe(false)
        expect(enzymeWrapper.find('MuseumCustomerPage').exists()).toBe(true)
    })
})