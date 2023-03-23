import { render, screen } from "@testing-library/react";
import Streaks from "../pages/Streaks";
import '@testing-library/jest-dom';

describe("Streaks", () => {
    test("renders Streaks component", () => {
        render(<Streaks />);
        expect(screen.getByText(/streaks/i)).toBeInTheDocument();
    });

    // Additional tests will be added here
});