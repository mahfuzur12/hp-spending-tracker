import Points from "../pages/Points";
import React from "react";
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';


describe('Points', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([
                { date: '2023-03-20', amount: 50 },
                { date: '2023-03-21', amount: 70 },
                { date: '2023-03-22', amount: 45 },
                { date: '2023-03-23', amount: 60 },
            ]),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders points correctly', async () => {
        await act(async () => {
            render(<Points />);
        });

        const pointsDisplay = screen.getByTestId('points-display');
        expect(pointsDisplay).toHaveTextContent('12 points');
    });
});
