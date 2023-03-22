import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect';
import AuthLayout from "../Layouts/AuthLayout/AuthLayout.js";


describe("AuthLayout", () => {
    it("renders without crashing", () => {
        render(<AuthLayout />);
    });

    it("renders the title correctly", () => {
        render(<AuthLayout />);
        expect(screen.getByText("Your Personal Spending Tracker")).toBeInTheDocument();
    });

    it("renders Signin form by default", () => {
        render(<AuthLayout />);
        expect(screen.getByText("Log In")).toBeInTheDocument();
    });

    it("renders Signup form when 'Sign up' button is clicked", () => {
        render(<AuthLayout />);
        fireEvent.click(screen.getByText("Sign up"));
        expect(screen.getByText("Sign up")).toBeInTheDocument();
    });

    it("renders Signin form when 'Log In' button is clicked", () => {
        render(<AuthLayout />);
        fireEvent.click(screen.getByText("Sign up"));
        fireEvent.click(screen.getByText("Log In"));
        expect(screen.getByText("Log In")).toBeInTheDocument();
    });

    it("renders Forgot form when 'Forgot Password' button is clicked", () => {
        render(<AuthLayout />);
        fireEvent.click(screen.getByText("Forgot Password"));
        expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    });

    it("renders About section", () => {
        render(<AuthLayout />);
        expect(screen.getByText(/At Pocilot Spending Tracker, we understand/i)).toBeInTheDocument();
    });

    it("renders Services section", () => {
        render(<AuthLayout />);
        expect(screen.getByText(/At Pocilot Spending Tracker, we offer/i)).toBeInTheDocument();
    });

    it("renders ContactUs component", () => {
        render(<AuthLayout />);
        expect(screen.getByText("Contact Us")).toBeInTheDocument();
    });
});
