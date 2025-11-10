import { render, fireEvent } from '@testing-library/react'
import LoginForm from '../../src/components/LoginForm'
import SignUpForm from '../../src/components/SignUpForm'
import { MemoryRouter } from 'react-router-dom'
import { vi, it, expect, describe } from 'vitest'


//LOGIN FORM
describe('LoginForm', () => {
    it('username should have inital value "" ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>);

        const username = getByTestId("name");
        expect(username.value).toBe("");
    });

    it('password should have inital value "" ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>);

        const password = getByTestId("password");
        expect(password.value).toBe("");
    });

    it('username should have value hans when typed in field ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>);

        const username = getByTestId("name");

        fireEvent.change(username, { target: { value: "hans" } });
        expect(username.value).toBe("hans");
    });

    it('password should have value Password123! when typed in field ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>);

        const password = getByTestId("password");

        fireEvent.change(password, { target: { value: "Password123!" } });
        expect(password.value).toBe("Password123!");
    });

});

//SIGNUP FORM
describe('SignUpForm', () => {
    it('username should have inital value "" ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>);

        const username = getByTestId("name");
        expect(username.value).toBe("");
    });

    it('password should have inital value "" ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>);

        const password = getByTestId("password");
        expect(password.value).toBe("");
    });

    it('passwordAgain should have inital value "" ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>);

        const password = getByTestId("passwordAgain");
        expect(password.value).toBe("");
    });

    it('username should have value hans when typed in field ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>);

        const username = getByTestId("name");

        fireEvent.change(username, { target: { value: "hans" } });
        expect(username.value).toBe("hans");
    });

    it('password should have value Password123! when typed in field ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>);

        const password = getByTestId("password");

        fireEvent.change(password, { target: { value: "Password123!" } });
        expect(password.value).toBe("Password123!");
    });

    it('passwordAgain should have value Password123! when typed in field ', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>);

        const password = getByTestId("passwordAgain");

        fireEvent.change(password, { target: { value: "Password123!" } });
        expect(password.value).toBe("Password123!");
    });
});