import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import moneyIcon from './money.png';
import TransactionsPage from '../../Transactions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const TransactionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
  max width: 100%;
  overflow: hidden;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.medium};
  font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.colors.text} !important;
  margin-bottom: 2vh;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${moneyIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 4vh;
  height: 4vh;
  margin-right: 2vw;
`;

const TransactionTitle = styled.div`
  font-family: ${theme.fonts.normalText} !important;
  font-size: ${theme.fontSizes.normalText} !important;
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.text} !important;
  max-width: 5vw;
  margin-bottom: 0.6vh;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TransactionCategory = styled.div`
  font-family: ${theme.fonts.normalText} !important;
  font-size: ${theme.fontSizes.normalText} !important;
    font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.text};
`;

const TransactionAmount = styled.div`
  font-family: ${theme.fonts.normalText};
  font-size: ${theme.fontSizes.normalText};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.text};
  margin-left: auto;
`;

const SeeMoreButton = styled.button`
align-self: flex-end;
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

const RecentTransactionsContainer = styled.div`
  display: flex;
    flex-direction: column;
  background-color: #fff;
  border-radius: ${theme.borderRadius.card};
  padding: 1vh;
  justify-content: space-between;
  height: 100%;
`;

const Modal = styled.dialog`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;

  height: 100%;
  padding: 0;
  margin: 0 !important;
  border: none;
  
`;

const ModalHeader = styled.header`
  display: flex;
  top: 0;
  vertical-align: top;
  
  background-color: #fff;
  color: #fff;

`;

const ModalBody = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:0px;
  margin: 0px;
  border-radius:10px;
  width: auto;
  height: 90%;
  background-color: #fff;
`;

const Article = styled.article`
  position: fixed;
  display: flex;
  margin: 0px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 20%;
  box-shadow:none;
  
`;




const RecentTransactions = ({ transactions }) => {

  const recentTransactions = transactions.slice(0, 8);

  const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <RecentTransactionsContainer>
            <Title>Recent transactions</Title>
                {recentTransactions.map((transaction) => (
                    <TransactionContainer key={transaction._id}>
                        <IconContainer>
                        </IconContainer>
                        <div>
                            <TransactionTitle>{transaction.data.description}</TransactionTitle>
                            <TransactionCategory>{transaction.data.category}</TransactionCategory>
                        </div>
                        <TransactionAmount>£{(transaction.data.amount*-1).toFixed(2)}</TransactionAmount>
                    </TransactionContainer>
                ))}
            <SeeMoreButton onClick={() => setIsModalOpen(true)}>See More</SeeMoreButton>
            {isModalOpen && (
                <Modal open>
               
                    <Article>
                  <IconButton size="large" onClick={() => setIsModalOpen(false)} ><CloseIcon/></IconButton> 
                  </Article>
                 
                    <ModalBody>
                                  
                                                               
                    
                        <TransactionsPage/>                        
                        </ModalBody>
                   
                </Modal>
            )}
        </RecentTransactionsContainer>
    );
};

export default RecentTransactions;
