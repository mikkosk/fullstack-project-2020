import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import MuseumAdminPage from './index'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { useParams } from 'react-router-dom'
import TourPage from './index'
import { act } from 'react-dom/test-utils'
import { wait } from '@testing-library/react'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      id: "two"
  })}));


function setup() {
    const store = mockStore({tours: 
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
    const enzymeWrapper = mount(<Provider store={store}><TourPage /></Provider>)

    return {
        enzymeWrapper
    }
}

describe ('Tour Page', () => {
    describe('Index', () => {
    })
    test("Initially all fields are generated with right values", () => {
        const { enzymeWrapper } = setup()
        const nameRow = enzymeWrapper.find('TableRow').get(1).props.children
        const languageRow = enzymeWrapper.find('TableRow').get(2).props.children
        const lengthRow = enzymeWrapper.find('TableRow').get(3).props.children
        const priceRow = enzymeWrapper.find('TableRow').get(4).props.children
        const maxRow = enzymeWrapper.find('TableRow').get(5).props.children
        const infoRow = enzymeWrapper.find('TableRow').get(6).props.children
        expect(nameRow[0].props.children).toBe("Nimi")
        expect(nameRow[1].props.children).toBe("Two")
        expect(languageRow[0].props.children).toBe("Kielet")
        expect(languageRow[1].props.children[0].props.children).toBe("Two")
        expect(lengthRow[0].props.children).toBe("Kesto")
        expect(lengthRow[1].props.children).toBe(2)
        expect(priceRow[0].props.children).toBe("Hinta")
        expect(priceRow[1].props.children).toBe(1)
        expect(maxRow[0].props.children).toBe("Maksimikoko")
        expect(maxRow[1].props.children).toBe(2)
        expect(infoRow[0].props.children).toBe("Lisätiedot")
        expect(infoRow[1].props.children).toBe("Two")
    })

    test("Initially modal is closed", () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('UpdateTourModal').get(0).props.modalOpen).toBe(false)
    })
    test("clicking button opens modal", () => {
        const { enzymeWrapper } = setup()
        enzymeWrapper.find('Button').simulate('click')
        expect(enzymeWrapper.find('UpdateTourModal').get(0).props.modalOpen).toBe(true)
    })
    test("clicking cancel closes modal", () => {
        const { enzymeWrapper } = setup()
        enzymeWrapper.find('Button[name="openModal"]').simulate('click')
        expect(enzymeWrapper.find('UpdateTourModal').get(0).props.modalOpen).toBe(true)
        enzymeWrapper.find('Button[name="cancelForm"]').simulate('click')
        expect(enzymeWrapper.find('UpdateTourModal').get(0).props.modalOpen).toBe(false)
    })
    test("clicking submit closes modal", async () => {
        console.log("jotain")
    })
})