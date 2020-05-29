import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import { LoginPage } from './index'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { initialState } from '../../../data/testData'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

function setup() {
    const store = mockStore(initialState)
    const enzymeWrapper = mount(<Provider store={store}><LoginPage /></Provider>)

    return {
        enzymeWrapper
    }
}

describe('LoginPage', () => {

    test('renders the login form', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('LoginForm')).toHaveLength(1)
    })

    test('renders the registeration form', async () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('RegisterationForm')).toHaveLength(1)
        
    })
})