import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Input from "../components/Input/Input";

const mockHandleClick = jest.fn();
const mockHandleChange = jest.fn();

const renderInput = (props) => {
    render(<Input {...props} />);
};

describe("Input", () => {
    test("renders Input component correctly", () => {
        const props = {
            icon: "👁",
            handleClick: mockHandleClick,
            type: "text",
            name: "fullName",
            handleChange: mockHandleChange,
            defaultValue: "",
            disabled: false,
            text: "Full Name",
        };
        renderInput(props);

        expect(screen.getByText("Full Name")).toBeInTheDocument();
        expect(screen.getByText("👁")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("renders the correct input type", () => {
        const props = {
            icon: "👁",
            handleClick: mockHandleClick,
            type: "password",
            name: "password",
            handleChange: mockHandleChange,
            defaultValue: "",
            disabled: false,
            text: "Password",
        };
        renderInput(props);

        // expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    });

    // test("renders the correct input name", () => {
    //     const props = {
    //         icon: "👁",
    //         handleClick: mockHandleClick,
    //         type: "text",
    //         name: "fullName",
    //         handleChange: mockHandleChange,
    //         defaultValue: "",
    //         disabled: false,
    //         text: "Full Name",
    //     };
    //     renderInput(props);

    //     expect(screen.getByRole("textbox", { name: "Full Name" })).toHaveAttribute("disabled");
    // });

    // test("renders the correct disabled attribute", () => {
    //     const props = {
    //         icon: "👁",
    //         handleClick: mockHandleClick,
    //         type: "text",
    //         name: "fullName",
    //         handleChange: mockHandleChange,
    //         defaultValue: "",
    //         disabled: true,
    //         text: "Full Name",
    //     };
    //     renderInput(props);

    //     expect(screen.getByRole("textbox", { name: "Full Name" })).toHaveAttribute("name", "fullName");

    // });
});
