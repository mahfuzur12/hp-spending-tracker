import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

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

const Budget = ({ budgetUsed, totalBudget, daysLeft }) => {
    const budgetPercentage = ((budgetUsed / totalBudget) * 100).toFixed(0);

    let descriptionText;
    if (budgetPercentage <= 100) {
        descriptionText = `Good job! You have ${100 - budgetPercentage}% of your budget remaining and ${daysLeft} days to go.`;
    } else {
        descriptionText = `Oops! You have gone over your budget by ${(budgetPercentage - 100).toFixed(0)}%.`;
    }

    return (
        <Container>
            <Title>Budget</Title>
                <Description>{descriptionText}</Description>
            <ProgressBar value={budgetUsed} max={totalBudget} />
        </Container>
    );
};

export default Budget;
