import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore, { MockStore, MockStoreEnhanced } from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import TourList from './TourList'
import thunk from 'redux-thunk'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const emptyStore = mockStore({tours: {tours: {}}})
const storeWithMultipleTours = mockStore({tours: 
    {tours: 
        {"ok": 
            {lengthInMinutes: 1, 
            maxNumberOfPeople:1, 
            possibleLanguages: ["OK"],
            price: 1, 
            tourName: "Ok", 
            tourInfo: "ok", 
            _id: "ok"}, 
        "two": 
            {lengthInMinutes: 2, 
            maxNumberOfPeople:2, 
            possibleLanguages: ["Two"],
            price: 1, 
            tourName: "Two", 
            tourInfo: "Two", 
            _id: "two"}
        }
    }, 
})
function setup(store: MockStoreEnhanced<unknown, {}>) {
    const enzymeWrapper = mount(<Provider store={store}><TourList /></Provider>)
    return {
        enzymeWrapper
    }
}

describe('TourList', () => {
    it('empty store does not render any tours', () => {
        const { enzymeWrapper } = setup(emptyStore)
        expect(enzymeWrapper.find('ListItem')).toHaveLength(0)
    })

    it('store with multiple objects return right amount of list items', () => {
        const { enzymeWrapper } = setup(storeWithMultipleTours)
        expect(enzymeWrapper.find('ListItem')).toHaveLength(4)
    })
})