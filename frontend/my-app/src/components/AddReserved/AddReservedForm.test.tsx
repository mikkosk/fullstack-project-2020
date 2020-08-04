import React from 'react'
import AddReservedForm from './AddReservedForm'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { GuidedTour, Museum } from '../../types'
import { act } from 'react-dom/test-utils'
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

describe('AddReservedForm', () => {
    
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
            enzymeWrapper.find('input[name="groupName"]').simulate('change', {persist: () => {}, target: {name: 'groupName', value: "values"}})
            enzymeWrapper.find('select[name="chosenLanguage"]').simulate('change', {persist: () => {}, target: {name: 'chosenLanguage', value: "Two"}})
            enzymeWrapper.find('input[name="numberOfPeople"]').simulate('change', {persist: () => {}, target: {name: 'numberOfPeople', value: 1}})
            enzymeWrapper.find('input[name="groupAge"]').simulate('change', {persist: () => {}, target: {name: 'groupAge', value: "values"}})
            enzymeWrapper.find('select[name="paymentOptions"]').simulate('change', {persist: () => {}, target: {name: 'paymentOptions', value: "Cash"}})
            enzymeWrapper.find('input[name="groupInfo"]').simulate('change', {persist: () => {}, target: {name: 'groupInfo', value: "values"}})
            enzymeWrapper.find('input[name="email"]').simulate('change', {persist: () => {}, target: {name: 'email', value: "values"}})
        })

        await act(async () => {
            enzymeWrapper.find('div[aria-label="Choose Friday, August 28th, 2020"]').simulate('click')
        });
        enzymeWrapper.update()
        
        await act(async () => {
            enzymeWrapper.find('b[className="11:00"]').simulate('click')
        });
        enzymeWrapper.update()

        const button = enzymeWrapper.find('Button[name="ready"]').get(0)
        expect(button.props.disabled).toBe(false)
        await act(async () => {
            enzymeWrapper.find('Button[name="ready"]').simulate('click', { preventDefault: () => {} })
        });
        enzymeWrapper.update()
        const modal = enzymeWrapper.find('Modal[name="confirm"]').get(0)
        expect(modal.props.open).toBe(true)
    })

    
    test('Clicking button does not open if fields are incorrect or missing', async () => {
        const { enzymeWrapper } = setup()

        await act(async () => {
            enzymeWrapper.find('div[aria-label="Choose Friday, August 28th, 2020"]').simulate('click')
        });
        enzymeWrapper.update()
        
        await act(async () => {
            enzymeWrapper.find('b[className="11:00"]').simulate('click')
        });
        enzymeWrapper.update()

        const button = enzymeWrapper.find('Button[name="ready"]').get(0)
        expect(button.props.disabled).toBe(true)
        await act(async () => {
            enzymeWrapper.find('Button[name="ready"]').simulate('click', { preventDefault: () => {} })
        });
        enzymeWrapper.update()
        const modal = enzymeWrapper.find('Modal[name="confirm"]').get(0)
        expect(modal.props.open).toBe(false)
    })

    test('Clicking confirm submits', async () => {
        const { enzymeWrapper } = setup()

        await act(async () => {
            enzymeWrapper.find('input[name="groupName"]').simulate('change', {persist: () => {}, target: {name: 'groupName', value: "values"}})
            enzymeWrapper.find('select[name="chosenLanguage"]').simulate('change', {persist: () => {}, target: {name: 'chosenLanguage', value: "Two"}})
            enzymeWrapper.find('input[name="numberOfPeople"]').simulate('change', {persist: () => {}, target: {name: 'numberOfPeople', value: 1}})
            enzymeWrapper.find('input[name="groupAge"]').simulate('change', {persist: () => {}, target: {name: 'groupAge', value: "values"}})
            enzymeWrapper.find('select[name="paymentOptions"]').simulate('change', {persist: () => {}, target: {name: 'paymentOptions', value: "Cash"}})
            enzymeWrapper.find('input[name="groupInfo"]').simulate('change', {persist: () => {}, target: {name: 'groupInfo', value: "values"}})
            enzymeWrapper.find('input[name="email"]').simulate('change', {persist: () => {}, target: {name: 'email', value: "values"}})
        })

        await act(async () => {
            enzymeWrapper.find('div[aria-label="Choose Friday, August 28th, 2020"]').simulate('click')
        });
        enzymeWrapper.update()
        
        await act(async () => {
            enzymeWrapper.find('b[className="11:00"]').simulate('click')
        });
        enzymeWrapper.update()

        const button = enzymeWrapper.find('Button[name="ready"]').get(0)
        expect(button.props.disabled).toBe(false)
        await act(async () => {
            enzymeWrapper.find('Button[name="ready"]').simulate('click', { preventDefault: () => {} })
        });
        enzymeWrapper.update()
        const modal = enzymeWrapper.find('Modal[name="confirm"]').get(0)
        expect(modal.props.open).toBe(true)

        await act(async () => {
            enzymeWrapper.find('Button[name="submit"]').simulate('submit', {preventDefault: () => {}})
        });
        expect(onSubmit).toBeCalledTimes(1);

    })
    
    test('Clickin cancel button triggers onCancel even if fields are not correct', async () => {
        const {enzymeWrapper} = setup()
        await act(async () => {
            enzymeWrapper.find('Button[name="cancelForm"]').simulate('click')
        });

        expect(onCancel).toBeCalledTimes(1);
    })

    test('Clicking cancel on confirmation modal closes the modal', async() => {
        const { enzymeWrapper } = setup()

        await act(async () => {
            enzymeWrapper.find('input[name="groupName"]').simulate('change', {persist: () => {}, target: {name: 'groupName', value: "values"}})
            enzymeWrapper.find('select[name="chosenLanguage"]').simulate('change', {persist: () => {}, target: {name: 'chosenLanguage', value: "Two"}})
            enzymeWrapper.find('input[name="numberOfPeople"]').simulate('change', {persist: () => {}, target: {name: 'numberOfPeople', value: 1}})
            enzymeWrapper.find('input[name="groupAge"]').simulate('change', {persist: () => {}, target: {name: 'groupAge', value: "values"}})
            enzymeWrapper.find('select[name="paymentOptions"]').simulate('change', {persist: () => {}, target: {name: 'paymentOptions', value: "Cash"}})
            enzymeWrapper.find('input[name="groupInfo"]').simulate('change', {persist: () => {}, target: {name: 'groupInfo', value: "values"}})
            enzymeWrapper.find('input[name="email"]').simulate('change', {persist: () => {}, target: {name: 'email', value: "values"}})
        })

        await act(async () => {
            enzymeWrapper.find('div[aria-label="Choose Friday, August 28th, 2020"]').simulate('click')
        });
        enzymeWrapper.update()
        
        await act(async () => {
            enzymeWrapper.find('b[className="11:00"]').simulate('click')
        });
        enzymeWrapper.update()

        const button = enzymeWrapper.find('Button[name="ready"]').get(0)
        expect(button.props.disabled).toBe(false)
        await act(async () => {
            enzymeWrapper.find('Button[name="ready"]').simulate('click', { preventDefault: () => {} })
        });
        enzymeWrapper.update()
        const modal = enzymeWrapper.find('Modal[name="confirm"]').get(0)
        expect(modal.props.open).toBe(true)

        await act(async () => {
            enzymeWrapper.find('Button[name="closeConfirmation"]').simulate('click')
        });
        enzymeWrapper.update()
        const modal2 = enzymeWrapper.find('Modal[name="confirm"]').get(0)
        expect(modal2.props.open).toBe(false)

    })

    test('After form has been submitted the form is resetted', async () => {
        const { enzymeWrapper } = setup()

        await act(async () => {
            enzymeWrapper.find('input[name="groupName"]').simulate('change', {persist: () => {}, target: {name: 'groupName', value: "values"}})
            enzymeWrapper.find('select[name="chosenLanguage"]').simulate('change', {persist: () => {}, target: {name: 'chosenLanguage', value: "Two"}})
            enzymeWrapper.find('input[name="numberOfPeople"]').simulate('change', {persist: () => {}, target: {name: 'numberOfPeople', value: 1}})
            enzymeWrapper.find('input[name="groupAge"]').simulate('change', {persist: () => {}, target: {name: 'groupAge', value: "values"}})
            enzymeWrapper.find('select[name="paymentOptions"]').simulate('change', {persist: () => {}, target: {name: 'paymentOptions', value: "Cash"}})
            enzymeWrapper.find('input[name="groupInfo"]').simulate('change', {persist: () => {}, target: {name: 'groupInfo', value: "values"}})
            enzymeWrapper.find('input[name="email"]').simulate('change', {persist: () => {}, target: {name: 'email', value: "values"}})
        })

        await act(async () => {
            enzymeWrapper.find('div[aria-label="Choose Friday, August 28th, 2020"]').simulate('click')
        });
        enzymeWrapper.update()
        
        await act(async () => {
            enzymeWrapper.find('b[className="11:00"]').simulate('click')
        });
        enzymeWrapper.update()

        const button = enzymeWrapper.find('Button[name="ready"]').get(0)
        expect(button.props.disabled).toBe(false)
        await act(async () => {
            enzymeWrapper.find('Button[name="ready"]').simulate('click', { preventDefault: () => {} })
        });
        enzymeWrapper.update()
        const modal = enzymeWrapper.find('Modal[name="confirm"]').get(0)
        expect(modal.props.open).toBe(true)

        await act(async () => {
            enzymeWrapper.find('Button[name="submit"]').simulate('submit', {preventDefault: () => {}})
        });

        enzymeWrapper.update()
        const name = enzymeWrapper.find('input[name="groupName"]')
        expect(name.get(0).props.value).toBe("")
    })
})