import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import moneyIcon from './money.png';
import TransactionsPage from '../../Transactions';


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
width: 100vw !important;
  height: 100vh;
  margin: 0 !important;
`;

const ModalHeader = styled.header`
`;

const ModalTitle = styled.h2`
`;

const ModalBody = styled.article`
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
          <TransactionAmount>£{(transaction.data.amount * -1).toFixed(2)}</TransactionAmount>
        </TransactionContainer>
      ))}
      <SeeMoreButton onClick={() => setIsModalOpen(true)}>See More</SeeMoreButton>
      {isModalOpen && (
        <Modal open>
          <article>
            <ModalHeader>
              <a onClick={() => setIsModalOpen(false)} aria-label="Close" class="close"></a>
              <ModalTitle>Transactions</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <TransactionsPage />
            </ModalBody>
          </article>
        </Modal>
      )}
    </RecentTransactionsContainer>
  );
};

export default RecentTransactions;
