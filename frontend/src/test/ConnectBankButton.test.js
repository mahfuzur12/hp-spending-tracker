import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConnectBankButton from '../components/ConnectBankButton/ConnectBankButton';
import '@testing-library/jest-dom/extend-expect';


describe('ConnectBankButton', () => {
    test('renders connect bank account button', () => {
        render(<ConnectBankButton />);
        const button = screen.getByRole("button", { name: "Connect Bank Account" })
        expect(button).toBeInTheDocument();
    });


});
