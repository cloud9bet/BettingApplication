
import { render, fireEvent, screen } from '@testing-library/react';
import { beforeEach, vi, describe, test } from "vitest";
import LoginForm from "../../src/components/LoginForm";
import { login } from "../../src/services/ControllerService/authApi";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

vi.mock("../../src/services/ControllerService/authApi");
vi.mock("jwt-decode");

vi.mock("react-router-dom", async () => {   
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});


describe("LoginForm", () => {
    let navigateMock;
    let alertMock;

    beforeEach(() => {
        navigateMock = vi.fn();
        useNavigate.mockReturnValue(navigateMock);
        alertMock = vi.fn();
        global.alert = alertMock;

    });


    const renderWithRouter = (component) => {
        return render(
            <BrowserRouter>
                {component}
            </BrowserRouter>
        );
    };


    it("calls login with username and password", async () => {
        renderWithRouter(<LoginForm />);

        fireEvent.change(screen.getByTestId("name"), { target: { value: "user" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        expect(login).toHaveBeenCalledWith("user", "pass");
    });

    it("navigates on User login", async () => {
        login.mockResolvedValue(true);
        jwtDecode.mockReturnValue({
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "User"
        })
    
        renderWithRouter(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "user" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(navigateMock).toHaveBeenCalledWith("/");
    });

    it("alerts on non-user login", async () => {
        login.mockResolvedValue(true);
        jwtDecode.mockReturnValue({
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Admin"
        });

        
        renderWithRouter(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "admin" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(alertMock).toHaveBeenCalledWith(
            "Login Failed Due To Access Rights"
        );
    });

    it("alerts on failed login", async () => {
        login.mockResolvedValue(false);

        renderWithRouter(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "user" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "passWrong" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(alertMock).toHaveBeenCalledWith(
            "Login Failed Due To Wrong Credentials"
        );
    });

    it("does NOT navigate for non-user login", async () => {
        login.mockResolvedValue(true);
        jwtDecode.mockReturnValue({
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Admin"
        });

        renderWithRouter(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "admin" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(navigateMock).not.toHaveBeenCalled();
    });

    it("does NOT navigate on failed login", async () => {
        login.mockResolvedValue(false);

        renderWithRouter(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "admin" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(navigateMock).not.toHaveBeenCalled();
    });
});