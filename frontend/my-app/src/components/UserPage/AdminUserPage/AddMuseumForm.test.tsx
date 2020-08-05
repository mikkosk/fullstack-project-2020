import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import thunk from 'redux-thunk'
import { act } from 'react-dom/test-utils'
import { wait } from '@testing-library/react'
import AddMuseumForm from './AddMuseumForm'
import { initialState } from '../../../../data/testData'
import { Provider } from 'react-redux'

Enzyme.configure({adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const onSubmit = jest.fn()
const onCancel = jest.fn()
const inputs = ["museumName", "museumInfo", "openInfo", "location", "lat", "long"]
const selects = [
    "open.mon","open.tue","open.wed","open.thu","open.fri","open.sat","open.sun",
    "closed.mon","closed.tue","closed.wed","closed.thu","closed.fri","closed.sat","closed.sun"]
function setup() {
    const store = mockStore(initialState)
    const enzymeWrapper = mount(<Provider store={store}><AddMuseumForm onCancel={onCancel} onSubmit={onSubmit} initialTour={undefined} /></Provider>)

    return {
        enzymeWrapper
    }
}

const findTags = (wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>, inputs: string[], type: string): Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>[] => {
    let tags: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>[] = [];
    inputs.forEach(i => {
        const tag = wrapper.find(`${type}[name="${i}"]`)
        if(tag) {
            tags = tags.concat(tag)
        }
    })
    return tags
}

describe('AddMuseumForm', () => {
    test('Right inputs are displayed', () => {
        const { enzymeWrapper } = setup()
        expect(findTags(enzymeWrapper, selects, "select").length).toBe(14)
        expect(findTags(enzymeWrapper, inputs, "input").length).toBe(6)
    })

    test('Both buttons are displayed', () => {
        const { enzymeWrapper } = setup()
        const submit = enzymeWrapper.find('Button[name="submit"]')
        const cancel = enzymeWrapper.find('Button[name="cancelForm"]')

        expect(submit.exists()).toBe(true)
        expect(cancel.exists()).toBe(true)
    })


    test('Clicking button triggers onSubmit if fields are correct', async () => {
        const { enzymeWrapper } = setup()
        const inputsToChange = findTags(enzymeWrapper, inputs, "input");
        const selectsToChange = findTags(enzymeWrapper, selects, "select");
        expect(inputs.length === inputsToChange.length).toBe(true)
        expect(selects.length === selectsToChange.length).toBe(true)
        await act(async () => {
            let i;
            for(i = 0; i < inputsToChange.length; i++) {
                inputsToChange[i].simulate('change', {persist: () => {}, target: {name: inputs[i], value: '45.00'}})
            }
            for(i = 0; i < selectsToChange.length; i++) {
                selectsToChange[i].simulate('change', {persist: () => {}, target: {name: selects[i], value: 'closed'}})
            }
        });
        await act(async () => {
            enzymeWrapper.find('Button[name="submit"]').simulate('submit', { preventDefault: () => {} })
        });
        expect(onSubmit).toBeCalledTimes(1)
    })

    // JATKUU
    test('Clicking button does not trigger onSubmit if fields are incorrect', async () => {
        onSubmit.mockClear()
        const { enzymeWrapper } = setup()
        await act(async () => {
            enzymeWrapper.find('button[name="submit"]').simulate('submit', { preventDefault: () => {} })
        });

        expect(onSubmit).toBeCalledTimes(0)
    })

    test('Clicking cancel button triggers onCancel even if fields are not correct', async () => {
        const { enzymeWrapper } = setup()
        await act(async () => {
            enzymeWrapper.find('input[name="museumName"]').simulate('change', {persist: () => {}, target: {name: 'museumName', value: 'ok'}})
        });
        await act(async () => {
            enzymeWrapper.find('Button[name="cancelForm"]').simulate('click')
        });

        expect(onCancel).toBeCalledTimes(1);
    })

    test('error is shown when field is not filled', async () => {
        const { enzymeWrapper } = setup()
        await act(async () => {
            enzymeWrapper.find('input[name="museumName"]').simulate('change', {persist: () => {}, target: {name: 'tourName', value: "NImi"}})
            enzymeWrapper.find('input[name="museumName"]').simulate('blur')
        });
        await wait()
        enzymeWrapper.update()
        expect(enzymeWrapper.text()).toContain("Kenttä vaaditaan")
    })
    describe('After form has been submitted', () => {
        const { enzymeWrapper } = setup()

        beforeEach(async () => {
            const inputsToChange = findTags(enzymeWrapper, inputs, "input");
            const selectsToChange = findTags(enzymeWrapper, selects, "select");
            expect(inputs.length === inputsToChange.length).toBe(true)
            expect(selects.length === selectsToChange.length).toBe(true)
            await act(async () => {
                let i;
                for(i = 0; i < inputsToChange.length; i++) {
                    inputsToChange[i].simulate('change', {persist: () => {}, target: {name: inputs[i], value: '45.00'}})
                }
                for(i = 0; i < selectsToChange.length; i++) {
                    selectsToChange[i].simulate('change', {persist: () => {}, target: {name: selects[i], value: 'closed'}})
                }
            });
            await act(async () => {
                enzymeWrapper.find('Button[name="submit"]').simulate('submit', { preventDefault: () => {} })
            });
        })

        test('form is resetted', async () => {
            enzymeWrapper.update()
            const name = enzymeWrapper.find('input[name="museumName"]')
            expect(name.get(0).props.value).toBe("")
        })
    })
})