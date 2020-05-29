import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { LoginForm } from './LoginForm'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { act } from 'react-dom/test-utils'
import { wait } from '@testing-library/react'

Enzyme.configure({adapter: new Adapter() })

const onSubmit = jest.fn()
function setup() {
    const enzymeWrapper = mount(<LoginForm onSubmit={onSubmit} />)

    return {
        enzymeWrapper
    }
}


describe('LoginForm', () => {
    test('Right inputs are displayed', () => {
        const { enzymeWrapper } = setup()
        const username = enzymeWrapper.find('input[name="username"]')
        const password = enzymeWrapper.find('input[name="password"]')
        
        expect({username, password}).toBeDefined()
    })

    test('Button is displayed', () => {
        const { enzymeWrapper } = setup()
        const submit = enzymeWrapper.find('Button[name="submit"]')

        expect(submit.exists()).toBe(true)
    })


    test('Clicking button triggers onSubmit if fields are correct', async () => {
        const { enzymeWrapper } = setup()

        await act(async () => {
            enzymeWrapper.find('input[name="username"]').simulate('change', {persist: () => {}, target: {name: 'username', value: 'ok'}})
            enzymeWrapper.find('input[name="password"]').simulate('change', {persist: () => {}, target: {name: 'password', value: "ok"}})
        });
        
        await act(async () => {
            enzymeWrapper.find('Button[name="submit"]').simulate('submit', { preventDefault: () => {} })
        });
        expect(onSubmit).toBeCalledTimes(1)
    })

    test('Clicking button does not trigger onSubmit if fields are incorrect', async () => {
        onSubmit.mockClear()
        const { enzymeWrapper } = setup()
        await act(async () => {
            enzymeWrapper.find('button[name="submit"]').simulate('submit', { preventDefault: () => {} })
        });

        expect(onSubmit).toBeCalledTimes(0)
    })

    test('error is shown when field is not filled but is clicked', async () => {
        const { enzymeWrapper } = setup()
        await act(async () => {
            enzymeWrapper.find('input[name="username"]').simulate('change', {persist: () => {}, target: {name: 'username', value: ""}})
            enzymeWrapper.find('input[name="username"]').simulate('blur')
        });
        await wait()
        enzymeWrapper.update()
        expect(enzymeWrapper.text()).toContain("Kenttä vaaditaan")
    })
    describe('After form has been submitted', () => {
        const { enzymeWrapper } = setup()

        beforeEach(async () => {
            await act(async () => {
                enzymeWrapper.find('input[name="username"]').simulate('change', {persist: () => {}, target: {name: 'username', value: 'ok'}})
                enzymeWrapper.find('input[name="password"]').simulate('change', {persist: () => {}, target: {name: 'password', value: "ok"}})
            });
            await act(async () => {
                enzymeWrapper.find('form').simulate('submit', {preventDefault: () => {}})
            });
        })

        test('form is resetted', async () => {
            enzymeWrapper.update()
            const name = enzymeWrapper.find('input[name="username"]')
            expect(name.get(0).props.value).toBe("")
        })
    })
})