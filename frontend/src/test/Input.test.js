import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input/Input';
import '@testing-library/jest-dom/extend-expect';

describe('Input', () => {
    test('renders Input component with basic props', () => {
        const handleChange = jest.fn();

        render(
            <Input
                type="text"
                name="testInput"
                text="Test Input"
                handleChange={handleChange}
            />
        );

        const labelText = screen.getByText('Test Input');
        expect(labelText).toBeInTheDocument();

        const inputElement = screen.getByLabelText('Test Input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.type).toBe('text');
        expect(inputElement.name).toBe('testInput');

        fireEvent.change(inputElement, { target: { value: 'Testing input' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('renders Input component with additional props', () => {
        const handleClick = jest.fn();
        const handleChange = jest.fn();

        render(
            <Input
                icon={<span>ICON</span>}
                handleClick={handleClick}
                type="password"
                name="passwordInput"
                defaultValue="default"
                disabled
                text="Password"
                handleChange={handleChange}
            />
        );

        const labelText = screen.getByText("Password");
        expect(labelText).toBeInTheDocument();

        const inputElement = screen.getByLabelText(/Password/i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.type).toBe('password');
        expect(inputElement.name).toBe('passwordInput');
        expect(inputElement.defaultValue).toBe('default');
        expect(inputElement.disabled).toBe(true);

        const iconElement = screen.getByText(/ICON/i);
        expect(iconElement).toBeInTheDocument();

        fireEvent.click(iconElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
