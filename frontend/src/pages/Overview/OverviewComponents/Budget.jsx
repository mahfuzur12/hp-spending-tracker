import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';

import BudgetPage from '../../Budget';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  min-width: 5vw;
  padding: 1vh;
  height: 100%;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.medium};
  font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.colors.text} !important;
  margin-bottom: 1vh;
`;

const Description = styled.p`
  font-family: ${theme.fonts.normalText};
  font-size: ${theme.fontSizes.normalText};
    font-weight: ${theme.fontWeight.regular};
    color: ${theme.colors.text};
  text-align: left;
  margin-bottom: 2vh;
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 1vh;
  border: none;
  background-color: ${theme.colors.grey};
  &::-webkit-progress-bar {
    background-color: ${theme.colors.lightGray};
  }
  &::-webkit-progress-value {
    background-color: ${theme.colors.primary};
  }

  margin-top: auto;
  align-self: flex-end;
  margin-bottom: 0;
`;

const ChangeBudgetButton = styled.a`

  border: none;
  background-color: ${theme.colors.primary};
  font-family: ${theme.fonts.buttonText};
  font-size: ${theme.fontSizes.buttonText};
  font-weight: ${theme.fontWeight.semiBold};
  color: #fff;
  padding: 1vh;
  margin-bottom: 1vh;
  border-radius: ${theme.borderRadius.button};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.colors.text};
  }
`;

const Budget = ({ budgetUsed, totalBudget, daysLeft }) => {
    const budgetPercentage = ((budgetUsed / totalBudget) * 100).toFixed(0);

    let descriptionText;
    if (budgetPercentage <= 100) {
        descriptionText = `Good job! You have ${100 - budgetPercentage}% of your budget remaining and ${daysLeft + 1} days to go.`;
    } else {
        descriptionText = `Oops! You have gone over your budget by ${(budgetPercentage - 100).toFixed(0)}%.`;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
    setIsModalOpen(BudgetPage.isDone)
    }, [BudgetPage.isDone])

    return (
        <Container>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Title>Budget</Title>
                <ChangeBudgetButton href="#" role="button" onClick={() => setIsModalOpen(true)}>Change</ChangeBudgetButton>
            </div>
                <Description>{descriptionText}</Description>
            <ProgressBar value={budgetUsed} max={totalBudget} />
            {isModalOpen && (
                <dialog open>
                    <article>
                        <header>
                            <a onClick={() => setIsModalOpen(false)} aria-label="Close" class="close"></a>
                            <Title>Set Budget</Title>
                        </header>
                        <body>
                            <BudgetPage />
                        </body>
                        
                    </article>
                </dialog>
            )}
        </Container>
    );
};

export default Budget;
