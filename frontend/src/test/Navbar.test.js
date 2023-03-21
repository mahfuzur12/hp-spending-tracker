import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const mockDispatch = jest.fn();

const renderNavbar = (user) => {
    render(
        <AuthContext.Provider value={{ user, dispatch: mockDispatch }}>
            <Navbar />
        </AuthContext.Provider>
    );
};

describe("Navbar", () => {
    test("renders Navbar component correctly", () => {
        const user = { name: "John Doe" };
        renderNavbar(user);
        expect(screen.getByText("Pocilot Tracker")).toBeInTheDocument();
        expect(screen.getByText("Overview")).toBeInTheDocument();
        expect(screen.getByText("Charts")).toBeInTheDocument();
        expect(screen.getByText("Budget")).toBeInTheDocument();
        expect(screen.getByText("Transactions")).toBeInTheDocument();
        expect(screen.getByText("Profile")).toBeInTheDocument();
        expect(screen.getByText(`Welcome ${user.name}!`)).toBeInTheDocument();
    });

    test("renders the correct user name", () => {
        const user = { name: "Jane Doe" };
        renderNavbar(user);
        expect(screen.getByText(`Welcome ${user.name}!`)).toBeInTheDocument();
    });
});
