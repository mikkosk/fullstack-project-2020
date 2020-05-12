import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import MuseumAdminPage from './index'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import { fireEvent, wait } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

Enzyme.configure({adapter: new Adapter() })

const mockStore = configureStore([])

function setup() {
    const store = mockStore({tours:{tours: {}}})
    const enzymeWrapper = mount(<Provider store={store}><MuseumAdminPage /></Provider>)

    return {
        enzymeWrapper
    }
}

describe('MuseumAdminPage', () => {

    it('renders all fields of the form', () => {
        const { enzymeWrapper } = setup()
        const name = enzymeWrapper.find('input[name="tourName"]')
        const languages = enzymeWrapper.find('input[name="possibleLanguages"]')
        const price = enzymeWrapper.find('input[name="price"]')
        const length = enzymeWrapper.find('input[name="lengthInMinutes"]')
        const people = enzymeWrapper.find('input[name="maxNumberOfPeople"]')
        const info = enzymeWrapper.find('input[name="tourInfo"]')

        
        expect({name, languages, price, length, people, info}).toBeDefined()
    })

    it('renders the tour list', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('TourList')).toHaveLength(1)
    })

    it('list items to increase after addding a new tour', async () => {
        const { enzymeWrapper } = setup()
        const toursLength = enzymeWrapper.find('ListItem').length
        console.log(toursLength)
        await act(async () => {
            enzymeWrapper.find('input[name="tourName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: 'ok'}})
        });
        await act(async () => {
            enzymeWrapper.find('input').at(2).simulate('change', {persist: () => {}, target: {name: 'possibleLanguages.0', value: "ok"}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="price"]').first().simulate('change', {persist: () => {}, target: {name: 'price', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="lengthInMinutes"]').first().simulate('change', {target: {name: 'lengthInMinutes', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="maxNumberOfPeople"]').first().simulate('change', {target: {name: 'maxNumberOfPeople', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="tourInfo"]').first().simulate('change', {target: {name: 'tourInfo', value: ''}})
        });
        await act(async () => {
            enzymeWrapper.find('form').simulate('submit', {preventDefault: () => {}})
        });
        console.log(enzymeWrapper.find('TourList').debug())
        expect(toursLength < enzymeWrapper.find('ListItem').length)
    })
})