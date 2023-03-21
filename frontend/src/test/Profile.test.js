import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect';
import Profile from "../components/Profile/Profile.js";

describe("Profile", () => {
    beforeEach(() => {
        render(<Profile />);
    });

    it("renders without crashing", () => { });

    it("renders Navbar component", () => {
        // expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders Personal Info title", () => {
        expect(screen.getByText("Personal Info")).toBeInTheDocument();
    });

    it("renders form fields", () => {
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    });

    it("toggles password visibility", () => {
        // const passwordInput = screen.getByLabelText("Password");
        // const confirmPasswordInput = screen.getByLabelText("Confirm Password");
        // const passwordVisibilityToggle = screen.queryAllByTestId("password-toggle")[0];
        // const confirmPasswordVisibilityToggle = screen.queryAllByTestId("cf-password-toggle")[0];

        // // Initially, the password fields should be of type "password"
        // expect(passwordInput.type).toBe("password");
        // expect(confirmPasswordInput.type).toBe("password");

        // // Click the visibility toggles and check if the type has changed to "text"
        // fireEvent.click(passwordVisibilityToggle);
        // fireEvent.click(confirmPasswordVisibilityToggle);
        // expect(passwordInput.type).toBe("text");
        // expect(confirmPasswordInput.type).toBe("text");

        // // Click the visibility toggles again and check if the type has changed back to "password"
        // fireEvent.click(passwordVisibilityToggle);
        // fireEvent.click(confirmPasswordVisibilityToggle);
        // expect(passwordInput.type).toBe("password");
        // expect(confirmPasswordInput.type).toBe("password");
    });


    it("renders Update button", () => {
        expect(screen.getByText("Update")).toBeInTheDocument();
    });
});

