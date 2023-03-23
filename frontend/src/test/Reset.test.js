import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Reset from '../components/Reset/Reset';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    useParams: () => ({
        token: 'mockToken',
    }),
}));

describe('Reset', () => {
    test('renders form and submits data correctly', async () => {
        render(<Reset />);

        // Check if the form elements are rendered
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');
        const submitButton = screen.getByText('Reset');

        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        // Fill in the form and submit
        fireEvent.change(passwordInput, { target: { value: 'newPassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword' } });
        fireEvent.click(submitButton);

        // Wait for axios call
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

        // Check if axios call is made with the correct data
        expect(axios.post).toHaveBeenCalledWith(
            '/reset_pass',
            { password: 'newPassword' },
            { headers: { Authorization: 'mockToken' } }
        );
    });
});
