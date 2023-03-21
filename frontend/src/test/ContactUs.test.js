import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactUs from '../components/ContactUs/ContactUs';
import '@testing-library/jest-dom/extend-expect';


describe('ContactUs', () => {
    test('renders ContactUs component', () => {
        render(<ContactUs />);

        // Check if the title is rendered
        const title = screen.getByText('Contact Us');
        expect(title).toBeInTheDocument();

        // Check if the content is rendered
        const content = screen.getByText(/If you have any questions or suggestions, please click the link below to send us an email:/i);
        expect(content).toBeInTheDocument();

        // Check if the email link is rendered and has the correct mailto URL
        const emailLink = screen.getByText('Send us an email');
        expect(emailLink).toBeInTheDocument();
        expect(emailLink.getAttribute('href')).toBe('mailto:hitgub.pocilot@gmail.com?subject=Contact%20Us&body=Please%20enter%20your%20questions%20or%20suggestions%20here.');
    });
});
