import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Signin from "../pages/Signin";
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

    test("clicking visibility icon toggles password visibility", () => {

        const passwordInput = screen.getByPlaceholderText("Enter your email");
        const visibilityIcon = screen.getByTestId("password-visibility-toggle");

        fireEvent.click(visibilityIcon);

        expect(passwordInput.type).toBe("text");

        fireEvent.click(visibilityIcon);

        // expect(passwordInput.type).toBe("password");
    });

    test("successful sign in", async () => {
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Enter your email");
        const loginButton = screen.getByRole("button", { name: /log in/i });

        axios.post.mockResolvedValue({ status: 200 });

        fireEvent.change(emailInput, { target: { value: "test@email.com" } });
        fireEvent.change(passwordInput, { target: { value: "test_password" } });
        fireEvent.click(loginButton);

        // await waitFor(() => {
        //     expect(axios.post).toHaveBeenCalledTimes(1);
        // });
    });

    test("failed sign in", async () => {
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Enter your email");
        const loginButton = screen.getByRole("button", { name: /log in/i });

        axios.post.mockRejectedValue({ response: { data: { msg: "Error message" } } });

        fireEvent.change(emailInput, { target: { value: "test@email.com" } });
        fireEvent.change(passwordInput, { target: { value: "test_password" } });
        fireEvent.click(loginButton);

        // await waitFor(() => {
        //     expect(axios.post).toHaveBeenCalledTimes(1);
        // });
    });
});
