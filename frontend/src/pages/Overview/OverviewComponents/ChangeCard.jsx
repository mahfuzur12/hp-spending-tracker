// change card button component
import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

import ConnectBankButton from "../../../components/ConnectBankButton/ConnectBankButton";
import creditCard from './atm-card.png';
import { SeeMoreButton } from './RecentTransactions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 5vw;
  padding: 1vh;
  height: 100%;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${creditCard});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 4vh;
  height: 4vh;
    margin-bottom: 2vh;
`;

const ChangeCardButton = styled.button`
  margin-top: auto;
  margin-bottom: 0;
  border: none;
  background-color: ${theme.colors.primary};
  font-family: ${theme.fonts.buttonText};
  font-size: ${theme.fontSizes.buttonText};
  font-weight: ${theme.fontWeight.semiBold};
  color: #fff;
  padding: 1vh 0;
  border-radius: ${theme.borderRadius.button};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.colors.text};
  }
`;

const CardTitle = styled.div`
  font-family: ${theme.fonts.normalText} !important;
  font-size: ${theme.fontSizes.normalText} !important;
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.text} !important;
  margin-bottom: 0.6vh;
  `;

const CardStatus = styled.div`
    font-family: ${theme.fonts.normalText} !important;
    font-size: ${theme.fontSizes.normalText} !important;
    font-weight: ${theme.fontWeight.regular};
    color: ${theme.colors.text};
    margin-bottom: 2vh;
`;


const ChangeCard = () => {
    return (
        <Container>
            <IconContainer />
            <CardTitle>BarclayCard</CardTitle>
            <CardStatus>UF9234932452</CardStatus>
            <ChangeCardButton>Change Card</ChangeCardButton>
        </Container>
    )
}

export default ChangeCard;