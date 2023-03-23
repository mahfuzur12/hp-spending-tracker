import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  min-width: 5vw;
  padding: 1vh;
  height: 100%;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.medium};
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.text} !important;
  margin-bottom: 1vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vh;
  margin-bottom: 2vh;
  justify-items: center;
  height: 100%;
`;

const Month = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: bottom;
  padding: 1vh;
  width: 5vh;
  height: clamp(5vh, 10vh, 10vh);
`;

const Circle = styled.div`
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const Button = styled.button`
align-self: bottom;
  margin-top: auto;
  margin-bottom: 0;
  border: none;
  background-color: ${theme.colors.primary};
  font-family: ${theme.fonts.buttonText};
  font-size: ${theme.fontSizes.buttonText};
  font-weight: ${theme.fontWeight.semiBold};
  color: #fff;
  padding: 1vh;
  border-radius: ${theme.borderRadius.button};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.colors.text};
  }
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  gap: 2vh;
`;

const MonthName = styled.div`
    font-family: ${theme.fonts.normalText} !important;
    font-size: ${theme.fontSizes.mini};
  margin-bottom: 0.5vh;
`;

const SpendingHeatmap = ({ transactions }) => {
  const [year, setYear] = useState(new Date().getFullYear());

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

  const spendingPerMonth = (year) => {
    const spending = new Array(12).fill(0);

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.data.date);

      if (
        transactionDate.getFullYear() === year &&
        transaction.data.amount > 0
      ) {
        spending[transactionDate.getMonth()] += transaction.data.amount;
      }
    });

    return spending;
  };

  const maxSpending = (spending) => Math.max(...spending);

  const circleSize = (value, max) => {
    const minSize = 5;
    const maxSize = 30;
    return ((value / max) * (maxSize - minSize)) + minSize;
  };

  const spending = spendingPerMonth(year);
  const maxValue = maxSpending(spending);

  const previousYear = () => {
    setYear(year - 1);
  };

  const nextYear = () => {
    setYear(year + 1);
  };

  return (
    <Container>
      <Title>Spending {year}</Title>
      <Grid>
        {spending.map((value, index) => (
          <Month key={index}>
            <MonthName>{monthNames[index]}</MonthName>
            {value > 0 && (
              <Circle size={circleSize(value, maxValue)} />
            )}
          </Month>
        ))}
      </Grid>
      <ButtonContainer>
        <Button onClick={previousYear}>Previous</Button>
        <Button onClick={nextYear}>Next</Button>
      </ButtonContainer>
    </Container>
  );
};

export default SpendingHeatmap;
