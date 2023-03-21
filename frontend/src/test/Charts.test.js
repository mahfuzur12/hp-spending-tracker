import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Charts from '../pages/Charts';

describe('Charts', () => {
    beforeEach(() => {
        render(<Charts />);
    });

    test('renders Charts component', () => {
        // Check if the title is rendered
        var today = new Date();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        const d = new Date(yyyy, mm - 1, 10);
        const month = d.toLocaleString('en-us', { month: 'long' });
        const title = screen.getByText("Spending Trends For " + month);
        expect(title).toBeInTheDocument();
    });

    test('renders Doughnut chart', () => {
        const doughnutChart = screen.getByTestId('doughnut-chart');
        expect(doughnutChart).toBeInTheDocument();
    });

    test('renders Bar chart', () => {
        const barChart = screen.getByTestId('bar-chart');
        expect(barChart).toBeInTheDocument();
    });

    test('renders Line chart', () => {
        const lineChart = screen.getByTestId('line-chart');
        expect(lineChart).toBeInTheDocument();
    });
});
