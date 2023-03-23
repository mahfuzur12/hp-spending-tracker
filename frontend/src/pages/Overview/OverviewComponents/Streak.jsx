import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import StreaksNavbar from '../../StreaksNavbar';

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

const Streak = ({ streak }) => {
  return (
    <Container>
      <Title>Streaks</Title>
      {streak === 0 ? (
        <Description>You have no streak!</Description>
      ) : (
        <Description>Great! You have a streak :)</Description>
      )}
      <StreaksNavbar streak={streak} />
    </Container>
  );
};

export default Streak;