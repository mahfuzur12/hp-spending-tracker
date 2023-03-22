import styled from 'styled-components';
import RecentTransactions from './OverviewComponents/RecentTransactions';
import SpendingLine from './OverviewComponents/SpendingLine';
import SpendingHeatmap from './OverviewComponents/SpendingHeatmap';
import Budget from './OverviewComponents/Budget';
import Streak from './OverviewComponents/Streak';
import ChangeCard from './OverviewComponents/ChangeCard';
import theme from './theme';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import NavComp from '../../components/Navbar/Navbar';

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 4vh 14vw;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.titles};
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.text} ;
letter-spacing: -0.1rem;
  margin-bottom: 3vh;
`;

const Brand = styled.li`
    font-family: ${theme.fonts.brand};
    font-size: ${theme.fontSizes.brand};
    font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.colors.text} !important;
    margin-right: 2vw;
      letter-spacing: -0.1rem;
`;

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

const CardContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 0.6fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 3vh;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: ${theme.borderRadius.card};
  padding: 2vh;
  max-height: 100%;
`;

const RegularCard = styled(Card)`
  grid-column: span 1;
`;

const DoubleCard = styled(Card)`
  grid-column: span 2;

  background-color: ${theme.colors.primary} !important;
`;

const TallCard = styled(Card)`
  grid-row: span 2;
  grid-column: span 1;

`;

const Footer = styled.footer`
  background-color: ${theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const AttributionLink = styled.a`
  font-family: ${theme.fonts.normal};
  font-size: ${theme.fontSizes.mini};
  color: ${theme.colors.grey} !important;
  margin-left: 2vw;
`;








const Overview = () => {

  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [dailySpend, setDailySpend] = useState([]);
  const [budget, setBudget] = useState(0);
  const [dailyBudget, setDailyBudget] = useState(0);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const [streak, setStreak] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [institution, setInstitution] = useState("");
  const [accountInfo, setAccountInfo] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    // reset and set transactions
    setTransactions([]);
    fetchUserData().then(() => {
      console.log('done');
      console.log(transactions)
    });
  }, [user._id, accessToken, budget]);


  // get user._id from AuthContext
  // get currUser from backend
  // get transaction id array from user
  // get transactions from backend

  const fetchUserData = async () => {

    const currUser = await axios.get('/' + user._id);
    const transactionIds = currUser.data.data.transactions;
    const budget = currUser.data.data.budget;
    let today = new Date();
    let daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dailyBudget = Math.round(budget / daysInMonth)
    const streak = currUser.data.data.streak;
    const auth = await axios.post("/auth", { access_token: currUser.data.data.accessToken });
    const institution = await axios.post("/institution", { institution_id: auth.data.item.institution_id });

    const res = await fetch("http://localhost:8000/api/transactions");
    const data = await res.json(); // Parse the JSON data
    console.log("boo", data)

    setTransactionData(data);
    setBudget(budget);
    setDailyBudget(dailyBudget);
    setStreak(streak);
    setAccessToken(currUser.data.data.accessToken);
    setInstitution(institution.data.institution);
    setAccountInfo(auth.data.numbers.bacs[auth.data.numbers.bacs.length - 1]);
    //console.log(await axios.get('/api/transactions/' + transactionIds[0]))

    // add every transaction from backend to transactions array
    for (let i = 0; i < transactionIds.length; i++) {
      const transaction = await axios.get('/api/transactions/' + transactionIds[i]);
      setTransactions(transactions => [...transactions, transaction]);
    }

    // sort transactions by date (newest first)
    transactions.sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });

  }




  useEffect(() => {
    getBudgetSpent();
  }, [transactions]);



  //get budgetSpent from the last week of transactions
  // if transaction is an expense, add to budgetSpent
  const getBudgetSpent = () => {
    let spent = 0;
    let today = new Date();
    //let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    for (let i = 0; i < transactions.length; i++) {
      let transactionDate = new Date(transactions[i].data.date);
      if (transactionDate > lastMonth) {
        if (transactions[i].data.amount > 0) {
          spent += transactions[i].data.amount;
        }

      }
    }
    setBudgetSpent(spent);
  }

  useEffect(() => {
    getStreak();
  }, [streak]);


  const getStreak = () => {

    // get daily spending of current month
    let today = new Date();
    let daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const dailySpend = new Array(daysInMonth).fill(0);
    transactionData.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear()) {
        const dayOfMonth = transactionDate.getDate() - 1;
        dailySpend[dayOfMonth] += transaction.amount;
      }
    });
    setDailySpend(dailySpend);

    let streak = 0;
    let currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    while (streak < dailySpend.length) {
      if (dailySpend[currentDate.getDate() - 1] > dailyBudget) {
        break;
      }
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    setStreak(streak);
    

  }
  console.log("daily spend", dailySpend)
  console.log(budget, dailyBudget)
  console.log("streak",streak)

  const daysLeft = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate();

  return (
    <Container>
      <NavComp/>
      <Title>Overview</Title>
      <CardContainer>
        <TallCard><RecentTransactions transactions={transactions} /></TallCard>
        <DoubleCard><SpendingLine transactions={transactions} /></DoubleCard>
        <RegularCard><SpendingHeatmap transactions={transactions} /></RegularCard>
        <RegularCard><Budget budgetUsed={budgetSpent} totalBudget={budget} daysLeft={daysLeft} /></RegularCard>
        <RegularCard><Streak streak={streak} /></RegularCard>
        <RegularCard><ChangeCard accessToken={accessToken} institution={institution} accountInfo={accountInfo} /></RegularCard>
      </CardContainer>
      <Footer>

      </Footer>
    </Container>
  );
};

export default Overview;
