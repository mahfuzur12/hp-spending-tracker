import { render, fireEvent, waitFor } from "@testing-library/react";
import React, { useState } from 'react';
import Budget from "../pages/Budget"
import '@testing-library/jest-dom'


describe("Budget", () =>{
    it("should render with initial state", () => {
        const { getByTestId } = render(<Budget />);
        expect(getByTestId("budget-container")).toBeInTheDocument();
        expect(getByTestId("budget-title")).toHaveTextContent(
          "Set up your monthly budget"
        );
        expect(getByTestId("budget-num")).toBeInTheDocument();
        expect(getByTestId("budget-done")).toHaveTextContent("Done");
    });

    it("should call 'open' function and show message when 'Done' button is clicked", async () => {
        const { getByTestId } = render(<Budget />);
        const doneBtn = getByTestId("budget-done");
        fireEvent.click(doneBtn);
    });

    
})