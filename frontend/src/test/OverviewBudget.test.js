import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Budget from '../pages/Overview/OverviewComponents/Budget';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosMock = new MockAdapter(Axios);


describe('Budget component', () => {
  const defaultProps = {
    budgetUsed: 300,
    totalBudget: 1000,
    daysLeft: 10,
  };

  const setup = (props = {}) => {
    return render(<Budget {...defaultProps} {...props} />);
  };

  it('renders without crashing', () => {
    setup();
    expect(screen.getByText('Budget')).toBeInTheDocument();
  });

  it('displays the correct description when within budget', () => {
    setup();
    expect(screen.getByText(/Good job! You have 70% of your budget remaining and 11 days to go./)).toBeInTheDocument();
  });

  it('displays the correct description when over budget', () => {
    setup({ budgetUsed: 1200 });
    expect(screen.getByText(/Oops! You have gone over your budget by 20%./)).toBeInTheDocument();
  });

  it('displays the correct progress bar value', () => {
    setup();
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.getAttribute('value')).toBe('300');
    expect(progressBar.getAttribute('max')).toBe('1000');
  });

  it('opens and closes the budget modal', () => {
    setup();
    const changeButton = screen.getByRole('button', { name: /Change/i });
    fireEvent.click(changeButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

