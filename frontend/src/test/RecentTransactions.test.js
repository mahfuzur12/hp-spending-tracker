import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentTransactions from '../pages/Overview/OverviewComponents/RecentTransactions';

const mockTransactions = [
  {
    _id: '1',
    data: {
      description: 'Transaction 1',
      category: 'Category 1',
      amount: -10,
    },
  },
  {
    _id: '2',
    data: {
      description: 'Transaction 2',
      category: 'Category 2',
      amount: -20,
    },
  },
];

describe('RecentTransactions', () => {
  it('renders the transactions correctly', () => {
    render(<RecentTransactions transactions={mockTransactions} />);

    expect(screen.getByText('Recent transactions')).toBeInTheDocument();
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('£10.00')).toBeInTheDocument();
    expect(screen.getByText('Transaction 2')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('£20.00')).toBeInTheDocument();
    expect(screen.getByText('See More')).toBeInTheDocument();
  });

  
});
