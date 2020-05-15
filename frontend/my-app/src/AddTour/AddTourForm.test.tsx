import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import AddTourForm from './AddTourForm'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import thunk from 'redux-thunk'
import { GuidedTour } from '../types'
import { act } from 'react-dom/test-utils'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const onSubmit = jest.fn()
const onCancel = jest.fn()
function setup(initialValues: GuidedTour | undefined) {
    const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={initialValues}/>)

    return {
        enzymeWrapper
    }
}
const guidedTour: GuidedTour = {
    lengthInMinutes: 2, 
    maxNumberOfPeople:2, 
    possibleLanguages: ["Two"],
    price: 1, 
    tourName: "Two", 
    tourInfo: "Two", 
    _id: "three"
}

describe('AddTourForm', () => {
    test('Right inputs are displayed', () => {
        const { enzymeWrapper } = setup(undefined)
        const name = enzymeWrapper.find('input[name="tourName"]')
        const languages = enzymeWrapper.find('input[name="possibleLanguages"]')
        const price = enzymeWrapper.find('input[name="price"]')
        const length = enzymeWrapper.find('input[name="lengthInMinutes"]')
        const people = enzymeWrapper.find('input[name="maxNumberOfPeople"]')
        const info = enzymeWrapper.find('input[name="tourInfo"]')
        
        expect({name, languages, price, length, people, info}).toBeDefined()
    })

    test('Both buttons are displayed if initial value is given', () => {
        const { enzymeWrapper } = setup(guidedTour)
        const submit = enzymeWrapper.find('Button[name="submitForm"]')
        const cancel = enzymeWrapper.find('Button[name="cancelForm"]')

        expect(submit.exists()).toBe(true)
        expect(cancel.exists()).toBe(true)
    })

    test('Cancel button is not rendered if initial value is not given', () => {
        const { enzymeWrapper } = setup(undefined)
        const submit = enzymeWrapper.find('Button[name="submitForm"]')
        const cancel = enzymeWrapper.find('Button[name="cancelForm"]')

        expect(submit.exists()).toBe(true)
        expect(cancel.exists()).toBe(false)
    })

    test('Clicking button triggers onSubmit if fields are correct', async () => {
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={guidedTour}/>)
        await act(async () => {
            enzymeWrapper.find('input[name="tourName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: 'ok'}})
        });
        await act(async () => {
            enzymeWrapper.find('input').at(2).simulate('change', {persist: () => {}, target: {name: 'possibleLanguages.0', value: "ok"}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="price"]').simulate('change', {persist: () => {}, target: {name: 'price', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="lengthInMinutes"]').simulate('change', {target: {name: 'lengthInMinutes', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="maxNumberOfPeople"]').simulate('change', {target: {name: 'maxNumberOfPeople', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="tourInfo"]').simulate('change', {target: {name: 'tourInfo', value: ''}})
        });
        await act(async () => {
            enzymeWrapper.find('Button[name="submitForm"]').simulate('click')
        });

        setImmediate(() => expect(onSubmit).toBeCalledTimes(1));
    })

    test('OnSubmit resets form', async() => {
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={guidedTour}/>)
        console.log("testissä")
        await act(async () => {
            enzymeWrapper.find('form').simulate('submit', {preventDefault: () => {}})
        });
            const name = enzymeWrapper.find('input[name="tourName"]')
            const languages = enzymeWrapper.find('input[name="possibleLanguages"]')
            const price = enzymeWrapper.find('input[name="price"]')
            const length = enzymeWrapper.find('input[name="lengthInMinutes"]')
            const people = enzymeWrapper.find('input[name="maxNumberOfPeople"]')
            const info = enzymeWrapper.find('input[name="tourInfo"]')
            expect(name.get(0).props.value).toBe("")
        
        
    })

    test('Clicking button does not trigger onSubmit if fields are incorrect', async () => {
        onSubmit.mockClear()
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={guidedTour}/>)
        await act(async () => {
            enzymeWrapper.find('input[name="tourName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: 'ok'}})
        });
        await act(async () => {
            enzymeWrapper.find('input').at(2).simulate('change', {persist: () => {}, target: {name: 'possibleLanguages.0', value: "ok"}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="price"]').simulate('change', {persist: () => {}, target: {name: 'price', value: -999}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="lengthInMinutes"]').simulate('change', {target: {name: 'lengthInMinutes', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="maxNumberOfPeople"]').simulate('change', {target: {name: 'maxNumberOfPeople', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="tourInfo"]').simulate('change', {target: {name: 'tourInfo', value: ''}})
        });
        await act(async () => {
            enzymeWrapper.find('Button[name="submitForm"]').simulate('click')
        });

        expect(onSubmit).toBeCalledTimes(0);
    })

    test('Clickin cancel button triggers onCancel even if fields are not correct', async () => {
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={guidedTour}/>)
        await act(async () => {
            enzymeWrapper.find('input[name="tourName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: 'ok'}})
        });
        await act(async () => {
            enzymeWrapper.find('input').at(2).simulate('change', {persist: () => {}, target: {name: 'possibleLanguages.0', value: "ok"}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="price"]').simulate('change', {persist: () => {}, target: {name: 'price', value: -999}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="lengthInMinutes"]').simulate('change', {target: {name: 'lengthInMinutes', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="maxNumberOfPeople"]').simulate('change', {target: {name: 'maxNumberOfPeople', value: 1}})
        });
        await act(async () => {
            enzymeWrapper.find('input[name="tourInfo"]').simulate('change', {target: {name: 'tourInfo', value: ''}})
        });
        await act(async () => {
            enzymeWrapper.find('Button[name="cancelForm"]').simulate('click')
        });

        expect(onCancel).toBeCalledTimes(1);
    })
})