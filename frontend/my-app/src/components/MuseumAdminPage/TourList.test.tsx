import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore, { MockStore, MockStoreEnhanced } from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import TourList from './TourList'
import thunk from 'redux-thunk'
import { initialStateEmptyTours, initialState } from '../../../data/testData'

Enzyme.configure({adapter: new Adapter() })

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      id: "iidee"
  })}));

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const emptyStore = mockStore(initialStateEmptyTours)
const storeWithMultipleTours = mockStore(initialState)
function setup(store: MockStoreEnhanced<unknown, {}>) {
    const enzymeWrapper = mount(<Provider store={store}><TourList /></Provider>)
    return {
        enzymeWrapper
    }
}

describe('TourList', () => {
    test('empty store does not render any tours', () => {
        const { enzymeWrapper } = setup(emptyStore)
        expect(enzymeWrapper.find('ListItem')).toHaveLength(0)
    })

    test('store with objects return right amount of list items', () => {
        const { enzymeWrapper } = setup(storeWithMultipleTours)
        expect(enzymeWrapper.find('ListHeader')).toHaveLength(1)
    })
})