import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Signin from "../pages/Signin.js";
import axios from 'axios';


jest.mock("axios");



describe("Signin component", () => {

    beforeEach(() => {
        render(<Signin />);
    });

    test("renders the form with email and password input fields", () => {
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Enter your email");

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });


    test('toggles password visibility', () => {
        const passwordVisibilityToggle = screen.getByTestId('password-visibility-toggle');
        const passwordInput = screen.getByPlaceholderText('Enter your password');

        fireEvent.click(passwordVisibilityToggle);

        expect(passwordInput.type).toBe('text');

        fireEvent.click(passwordVisibilityToggle);

        expect(passwordInput.type).toBe('password');
    });

    test("successful sign in", async () => {
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const loginButton = screen.getByRole("button", { name: "Log In" });

        expect(loginButton).toBeInTheDocument();
        expect(loginButton).toBeEnabled()
        axios.post.mockResolvedValue({ status: 200 });

        fireEvent.change(emailInput, { target: { value: "test@email.com" } });
        fireEvent.change(passwordInput, { target: { value: "test_password" } });
        fireEvent.click(loginButton);

        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test("failed sign in", async () => {
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const loginButton = screen.getByRole("button", { name: "Log In" });


        axios.post.mockRejectedValue({ response: { data: { msg: "Error message" } } });

        fireEvent.change(emailInput, { target: { value: "test@email.com" } });
        fireEvent.change(passwordInput, { target: { value: "test_password" } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
        });
    });



    test('submits the form and receives a successful response', async () => {
        // Fill in the email input
        const emailInput = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        // Fill in the password input
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        // Click the login button to submit the form
        const loginButton = screen.getByText('Log In');
        fireEvent.click(loginButton);

        // Check if the login was successful
        await waitFor(() => {
            expect(localStorage.getItem('_appSigning')).toBeTruthy();
        });
    });





});
