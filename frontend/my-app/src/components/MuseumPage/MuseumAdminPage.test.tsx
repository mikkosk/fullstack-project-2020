import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import MuseumAdminPage from './MuseumAdminPage'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { initialStateEmptyTours } from '../../../data/testData'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      id: "iidee"
    }),
    useHistory: () => ({
        push: jest.fn()
    })
}));
  

function setup() {
    const store = mockStore(initialStateEmptyTours)
    const enzymeWrapper = mount(<Provider store={store}><MuseumAdminPage museum={initialStateEmptyTours.museums.museums["iidee"]}/></Provider>)

    return {
        enzymeWrapper
    }
}

describe('MuseumAdminPage', () => {

    test('renders all fields of the form', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('AddTourForm').exists()).toBe(true);
    })

    test('renders the tour list', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('TourList')).toHaveLength(1)
    })

    test('renders the form', async () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('AddTourForm')).toHaveLength(1)
        
    })
})