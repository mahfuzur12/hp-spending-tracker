import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import SpendingHeatmap from '../pages/Overview/OverviewComponents/SpendingHeatmap';

const mockTransactions = [
  {
    data: {
      amount: 100,
      date: '2021-01-15T00:00:00.000Z',
    },
  },
  {
    data: {
      amount: 150,
      date: '2021-03-10T00:00:00.000Z',
    },
  },
  {
    data: {
      amount: 200,
      date: '2021-06-01T00:00:00.000Z',
    },
  },
];

describe('SpendingHeatmap', () => {
  test('renders the component', () => {
    render(<SpendingHeatmap transactions={mockTransactions} />);

    expect(screen.getByText('Spending 2023')).toBeInTheDocument();
  });

  test('changes the year when previous and next buttons are clicked', () => {
    render(<SpendingHeatmap transactions={mockTransactions} />);

    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');

    userEvent.click(previousButton);
    expect(screen.getByText('Spending 2022')).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(screen.getByText('Spending 2023')).toBeInTheDocument();
  });

  test('displays the correct number of months', () => {
    render(<SpendingHeatmap transactions={mockTransactions} />);
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    monthNames.forEach((month) => {
      expect(screen.getByText(month)).toBeInTheDocument();
    });
  });
});
