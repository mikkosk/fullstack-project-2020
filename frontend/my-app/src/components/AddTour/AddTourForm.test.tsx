import React from 'react'
import '../UserPage/CustomerUserPage/node_modules/@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import AddTourForm from './AddTourForm'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import thunk from 'redux-thunk'
import { GuidedTour } from '../../types'
import { act } from 'react-dom/test-utils'
import { wait } from '@testing-library/react'

Enzyme.configure({adapter: new Adapter() })

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
        expect(enzymeWrapper.find('input[name="tourName"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="possibleLanguages.0"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="price"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="lengthInMinutes"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="maxNumberOfPeople"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="tourInfo"]').exists()).toBe(true)
    })

    test('Both buttons are displayed if initial value is given', () => {
        const { enzymeWrapper } = setup(guidedTour)
        const submit = enzymeWrapper.find('Button[name="submit"]')
        const cancel = enzymeWrapper.find('Button[name="cancelForm"]')

        expect(submit.exists()).toBe(true)
        expect(cancel.exists()).toBe(true)
    })

    test('Cancel button is not rendered if initial value is not given', () => {
        const { enzymeWrapper } = setup(undefined)
        const submit = enzymeWrapper.find('Button[name="submit"]')
        const cancel = enzymeWrapper.find('Button[name="cancelForm"]')

        expect(submit.exists()).toBe(true)
        expect(cancel.exists()).toBe(false)
    })

    test('Clicking button triggers onSubmit if fields are correct', async () => {
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={undefined}/>)

        await act(async () => {
            enzymeWrapper.find('input[name="tourName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: 'ok'}})
            enzymeWrapper.find('input[name="possibleLanguages.0"]').simulate('change', {persist: () => {}, target: {name: 'possibleLanguages.0', value: "ok"}})
            enzymeWrapper.find('input[name="price"]').simulate('change', {persist: () => {}, target: {name: 'price', value: -999}})
            enzymeWrapper.find('input[name="lengthInMinutes"]').simulate('change', {target: {name: 'lengthInMinutes', value: 1}})
            enzymeWrapper.find('input[name="maxNumberOfPeople"]').simulate('change', {target: {name: 'maxNumberOfPeople', value: 1}})
            enzymeWrapper.find('input[name="tourInfo"]').simulate('change', {target: {name: 'tourInfo', value: ''}})
        });
        
        await act(async () => {
            enzymeWrapper.find('Button[name="submit"]').simulate('submit', { preventDefault: () => {} })
        });
        expect(onSubmit).toBeCalledTimes(1)
    })

    test('Clicking button does not trigger onSubmit if fields are incorrect', async () => {
        onSubmit.mockClear()
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={undefined}/>)
        await act(async () => {
            enzymeWrapper.find('button[name="submit"]').simulate('submit', { preventDefault: () => {} })
        });

        expect(onSubmit).toBeCalledTimes(0)
    })

    test('Clickin cancel button triggers onCancel even if fields are not correct', async () => {
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={guidedTour}/>)
        await act(async () => {
            enzymeWrapper.find('input[name="tourName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: 'ok'}})
            enzymeWrapper.find('input[name="possibleLanguages.0"]').simulate('change', {persist: () => {}, target: {name: 'possibleLanguages.0', value: "ok"}})
            enzymeWrapper.find('input[name="price"]').simulate('change', {persist: () => {}, target: {name: 'price', value: -999}})
            enzymeWrapper.find('input[name="lengthInMinutes"]').simulate('change', {target: {name: 'lengthInMinutes', value: 1}})
            enzymeWrapper.find('input[name="maxNumberOfPeople"]').simulate('change', {target: {name: 'maxNumberOfPeople', value: 1}})
            enzymeWrapper.find('input[name="tourInfo"]').simulate('change', {target: {name: 'tourInfo', value: ''}})
        });
        await act(async () => {
            enzymeWrapper.find('Button[name="cancelForm"]').simulate('click')
        });

        expect(onCancel).toBeCalledTimes(1);
    })

    test('error is shown when field is not filled', async () => {
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={undefined}/>)
        await act(async () => {
            enzymeWrapper.find('input[name="tourName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: "NImi"}})
            enzymeWrapper.find('input[name="tourName"]').simulate('blur')
        });
        await wait()
        enzymeWrapper.update()
        expect(enzymeWrapper.text()).toContain("Kenttä vaaditaan")
    })
    describe('After form has been submitted', () => {
        const enzymeWrapper = mount(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} initialTour={undefined}/>)

        beforeEach(async () => {
            await act(async () => {
                enzymeWrapper.find('input[name="tourName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: 'ok'}})
                enzymeWrapper.find('input[name="possibleLanguages.0"]').simulate('change', {persist: () => {}, target: {name: 'possibleLanguages.0', value: "ok"}})
                enzymeWrapper.find('input[name="price"]').simulate('change', {persist: () => {}, target: {name: 'price', value: 1}})
                enzymeWrapper.find('input[name="lengthInMinutes"]').simulate('change', {target: {name: 'lengthInMinutes', value: 1}})
                enzymeWrapper.find('input[name="maxNumberOfPeople"]').simulate('change', {target: {name: 'maxNumberOfPeople', value: 1}})
                enzymeWrapper.find('input[name="tourInfo"]').simulate('change', {target: {name: 'tourInfo', value: ''}})
            });
            await act(async () => {
                enzymeWrapper.find('form').simulate('submit', {preventDefault: () => {}})
            });
        })

        test('form is resetted', async () => {
            enzymeWrapper.update()
            const name = enzymeWrapper.find('input[name="tourName"]')
            expect(name.get(0).props.value).toBe("")
        })
    })
})