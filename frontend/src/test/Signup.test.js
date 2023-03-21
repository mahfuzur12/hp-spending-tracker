import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from '../pages/Signup';

test('renders Signup component', () => {
  const { getByText } = render(<Signup />);
  const title = getByText(/Sign up/i);
  expect(title).toBeInTheDocument();
});

test('allows user to enter name', () => {
  const { getByLabelText } = render(<Signup />);
  const nameInput = getByLabelText(/Name/i);
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  expect(nameInput.value).toBe('John Doe');
});

test('allows user to enter email', () => {
  const { getByLabelText } = render(<Signup />);
  const emailInput = getByLabelText(/Email/i);
  fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
  expect(emailInput.value).toBe('johndoe@example.com');
});

test('allows user to enter password', () => {
  const { getByLabelText } = render(<Signup />);
  const passwordInput = screen.getByLabelText(/Password/i);
  fireEvent.input(passwordInput, { target: { value: 'password123' } });
  expect(passwordInput.value).toBe('password123');
});

test('allows user to enter confirm password', () => {
  const { getByLabelText } = render(<Signup />);
  const confirmInput = getByLabelText(/Confirm/i);
  fireEvent.change(confirmInput, { target: { value: 'password123' } });
  expect(confirmInput.value).toBe('password123');
});

test('submits form with valid data', () => {
  const { getByLabelText, getByText } = render(<Signup />);
  fireEvent.change(getByLabelText(/Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(getByLabelText(/Email/i), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });
  fireEvent.change(getByLabelText(/Confirm/i), { target: { value: 'password123' } });
  fireEvent.click(getByText(/Sign up/i));
});


