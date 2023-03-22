import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from "../../pages/Overview/theme";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";



const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vh;
  
`;

const NavItem = styled.li`
  font-family: ${theme.fonts.subHeadings};
  font-size: ${theme.fontSizes.subHeadings};
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.text} !important;
  margin-right: 2vw;

  &:last-child {
    margin-right: 0;
  }

  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ProfileButton = styled.a`
    padding: 0.75em 1.5em !important;
  border-radius: ${theme.borderRadius.button};
  background-color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.white} !important;

    &:hover {
    background-color: ${theme.colors.text};
  }
`;

const Brand = styled.li`
    font-family: ${theme.fonts.brand};
    font-size: ${theme.fontSizes.brand};
    font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.colors.text} !important;
    margin-right: 2vw;
      letter-spacing: -0.1rem;
`;

const NavComp = () =>{
    const { user, dispatch } = useContext(AuthContext)

    const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.get("/signout");
          localStorage.removeItem("_appSigning");
          dispatch({ type: "SIGNOUT" });
        } catch (err) {
          console.log(err);
        }
      };

    

return(
<Navbar>
        <ul>
            <Brand>Pocilot Tracker</Brand>
                <NavItem>
                    <a href="/">Overview</a>
                </NavItem>
                </ul>
                <ul>
                <NavItem>
                    <a href="" onClick={handleClick}>Log out</a>
                </NavItem>

                <NavItem>
                    <ProfileButton href="/profile" role="button">
                        Profile
                    </ProfileButton>
                </NavItem>
        </ul>
</Navbar>
);

};

export default NavComp;