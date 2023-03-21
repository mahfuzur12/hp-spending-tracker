import React from 'react';
import styled from 'styled-components';
import theme from "../../pages/Overview/theme";


const Navbar = styled.nav`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1vh;
  
`;

const NavItem = styled.li`
  font-family: ${theme.fonts.subHeadings};
  font-size: ${theme.fontSizes.subHeadings};
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.text} !important;
  margin-right: -50vw;

  &:last-child {
    margin-right: 0;
  }

  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Brand = styled.li`
    font-family: ${theme.fonts.brand};
    font-size: ${theme.fontSizes.brand};
    font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.colors.text} !important;
    margin-right: 2em;
      letter-spacing: -0.1rem;
    
`;

const LandingNavComp = () =>{

return(
<Navbar>
        <Brand>Pocilot Tracker</Brand>
            <NavItem>
                <a href="#auth-body-id">Home</a>
            </NavItem>
            <NavItem>
                <a href="#auth-about-container-id">About</a>
            </NavItem>
            <NavItem>
                <a href="#auth-services-container-id">Services</a>
            </NavItem>
            <NavItem>
                <a href="#auth-contact-container-id">Contact</a>
            </NavItem>

</Navbar>
);

};

export default LandingNavComp;