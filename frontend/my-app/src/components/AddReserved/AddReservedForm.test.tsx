import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import AddReservedForm from './AddReservedForm'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import thunk from 'redux-thunk'
import { GuidedTour, Museum } from '../../types'
import { act } from 'react-dom/test-utils'
import { wait } from '@testing-library/react'
import { initialState } from '../../../data/testData'

Enzyme.configure({adapter: new Adapter() })

const onSubmit = jest.fn()
const onCancel = jest.fn()

const museum: Museum = {
    ...Object.values(initialState.museums.museums)[0],
}

const tour: GuidedTour = {
    ...museum.offeredTours[0]
}

function setup() {
    const enzymeWrapper = mount(<AddReservedForm onSubmit={onSubmit} onCancel={onCancel} tour={tour} museum={museum}/>)
    return {
        enzymeWrapper
    }
}

describe('AddTourForm', () => {
    test('Right inputs are displayed', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('input[name="groupName"]').exists()).toBe(true)
        expect(enzymeWrapper.find('select[name="chosenLanguage"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="numberOfPeople"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="groupAge"]').exists()).toBe(true)
        expect(enzymeWrapper.find('select[name="paymentOptions"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="groupInfo"]').exists()).toBe(true)
        expect(enzymeWrapper.find('input[name="email"]').exists()).toBe(true)
        expect(enzymeWrapper.find('DateField').exists()).toBe(true)
        expect(enzymeWrapper.find('TimeField').exists()).toBe(true)
    })

    test('Both buttons are displayed', () => {
        const { enzymeWrapper } = setup()
        const submit = enzymeWrapper.find('Button[name="ready"]')
        const cancel = enzymeWrapper.find('Button[name="cancelForm"]')

        expect(submit.exists()).toBe(true)
        expect(cancel.exists()).toBe(true)
    })

    test('Modal is not open if ready-button has not been clicked', () => {
        const { enzymeWrapper } = setup()
        const modal = enzymeWrapper.find('Modal[name="confirm"]').get(0)
        expect(modal.props.open).toBe(false)
    })

    test('Ready-button is disabled in the beginning', () => {
        const { enzymeWrapper } = setup()
        const button = enzymeWrapper.find('Button[name="ready"]').get(0)
        expect(button.props.disabled).toBe(true)
    })
    

    test('Clicking button opens modal if fields are correct', async () => {
        const { enzymeWrapper } = setup()

        
        await act(async () => {
            enzymeWrapper.find('div[className="react-datepicker__day react-datepicker__day--029"]').simulate('click')
        });
        enzymeWrapper.update()
        console.log(enzymeWrapper.debug())
        
        await act(async () => {
            enzymeWrapper.find('b[className="11:00"]').simulate('click')
        });
        enzymeWrapper.update()
        console.log(enzymeWrapper.debug())
        expect(onSubmit).toBeCalledTimes(1)
        await act(async () => {
            enzymeWrapper.find('Button[name="submit"]').simulate('submit', { preventDefault: () => {} })
        });
    })

    /*
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
    */
})