import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from '../components/Sidebar/Sidebar';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

const mockDispatch = jest.fn();

const renderWithContextAndRouter = (component) => {
    return render(
        <AuthContext.Provider value={{ dispatch: mockDispatch }}>
            <MemoryRouter>{component}</MemoryRouter>
        </AuthContext.Provider>
    );
};

describe('Sidebar', () => {
    test('renders all menu items', () => {
        renderWithContextAndRouter(<Sidebar />);

        expect(screen.getByText('Overview')).toBeInTheDocument();
        expect(screen.getByText('Transactions')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Signout')).toBeInTheDocument();
    });

    test('signout menu item triggers signout action', async () => {
        axios.get.mockResolvedValue();
        renderWithContextAndRouter(<Sidebar />);

        const signoutButton = screen.getByText('Signout');
        fireEvent.click(signoutButton);

        await axios.get; // Add this line to wait for the click event result


        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/signout');
    });

    test('signout menu item handles error correctly', async () => {
        axios.get.mockRejectedValue(new Error('signout error'));
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        renderWithContextAndRouter(<Sidebar />);

        const signoutButton = screen.getByText('Signout');
        fireEvent.click(signoutButton);

        await axios.get; // Add this line to wait for the click event result


        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/signout');
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        consoleSpy.mockRestore();
    });
});
