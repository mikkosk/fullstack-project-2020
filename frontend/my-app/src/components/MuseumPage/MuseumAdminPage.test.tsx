import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import MuseumAdminPage from './MuseumAdminPage'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { initialStateEmpty, initialStateEmptyTours } from '../../../data/testData'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      id: "iidee"
  })}));
  

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
        const name = enzymeWrapper.find('input[name="tourName"]')
        const languages = enzymeWrapper.find('input[name="possibleLanguages"]')
        const price = enzymeWrapper.find('input[name="price"]')
        const length = enzymeWrapper.find('input[name="lengthInMinutes"]')
        const people = enzymeWrapper.find('input[name="maxNumberOfPeople"]')
        const info = enzymeWrapper.find('input[name="tourInfo"]')

        
        expect({name, languages, price, length, people, info}).toBeDefined()
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