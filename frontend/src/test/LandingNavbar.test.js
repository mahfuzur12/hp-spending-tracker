import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingNavComp from '../components/Navbar/LandingNavbar';
import '@testing-library/jest-dom/extend-expect';

describe('LandingNavComp', () => {
  it('should render the brand and navigation items', () => {
    render(<LandingNavComp />);
    const brandElement = screen.getByText('Pocilot Tracker');
    expect(brandElement).toBeInTheDocument();
    const homeElement = screen.getByText('Home');
    expect(homeElement).toBeInTheDocument();
    const aboutElement = screen.getByText('About');
    expect(aboutElement).toBeInTheDocument();
    const servicesElement = screen.getByText('Services');
    expect(servicesElement).toBeInTheDocument();
    const contactElement = screen.getByText('Contact');
    expect(contactElement).toBeInTheDocument();
  });
});
