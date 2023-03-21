import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import Forgot from "../components/Forgot/Forgot";
import "@testing-library/jest-dom/extend-expect";
import { toast } from "react-toastify";

jest.mock("axios");

describe("Forgot component", () => {
    afterEach(() => {
        jest.clearAllMocks();
        toast.dismiss();
    });

    it("should render the form and its elements", () => {
        const { getByText, getByLabelText } = render(<Forgot />);
        expect(getByText("Email")).toBeInTheDocument();
        expect(getByLabelText("Email")).toBeInTheDocument();
        expect(getByText("Send")).toBeInTheDocument();
    });

    it("should call axios.post when the form is submitted with valid email", async () => {
        const { getByLabelText, getByText } = render(<Forgot />);
        const input = getByLabelText("Email");
        fireEvent.change(input, { target: { value: "valid-email@example.com" } });
        fireEvent.submit(input);

        // Wait for the toast to appear on the page
        await waitFor(() => expect(getByText("Please check your email 📧")).toBeInTheDocument());
    });

    it("should show an error message when the form is submitted with invalid email", async () => {
        const { getByText, getByLabelText } = render(<Forgot />);
        const emailInput = getByLabelText("Email");
        const sendButton = getByText("Send");

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: "invalid-email" } });
            fireEvent.submit(sendButton);
        });

        expect(axios.post).not.toHaveBeenCalled();
        await waitFor(() => expect(getByText("Please enter a valid email address.")).toBeInTheDocument());
    });

    it("should show an error message when the form is submitted with empty email", async () => {
        const { getByText } = render(<Forgot />);
        axios.post.mockRejectedValueOnce({ response: { data: { msg: "Please fill in all fields." } } });
        fireEvent.click(getByText("Send"));
        expect(axios.post).not.toHaveBeenCalled();
        await waitFor(() => expect(getByText("Please fill in all fields.")).toBeInTheDocument());
    });
});
