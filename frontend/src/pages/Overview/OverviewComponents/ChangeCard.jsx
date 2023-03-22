// change card button component
import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import theme from '../theme';

import 'regenerator-runtime/runtime';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import { AuthContext } from "../../../context/AuthContext";

import creditCard from './atm-card.png';
import { AuthContextProvider } from "../../../context/AuthContext";


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

const RefreshButton = styled.a`
    margin: auto;
    align-self: center;
  border: none;
  background-color: ${theme.colors.secondary};
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

const ConnectCardButton = styled(ChangeCardButton)`
background-color: ${theme.colors.danger};
`;

const CardTitle = styled.div`
  font-family: ${theme.fonts.normalText} !important;
  font-size: ${theme.fontSizes.normalText} !important;
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.text} !important;
  max-width: 100%;
  margin-bottom: 0.6vh;
      white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  `;

const CardStatus = styled.div`
    font-family: ${theme.fonts.normalText} !important;
    font-size: ${theme.fontSizes.normalText} !important;
    font-weight: ${theme.fontWeight.regular};
    color: ${theme.colors.text};
    margin-bottom: 2vh;
`;





const ChangeCard = ({ accessToken, institution, accountInfo }) => {

    const [linkToken, setLinkToken] = useState();
    const [publicToken, setPublicToken] = useState();


    useEffect(() => {

        async function fetch() {
            const response = await axios.post("http://localhost:8000/create_link_token")
            setLinkToken(response.data.link_token);
        }
        fetch();
    }, []);


    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
            setPublicToken(public_token);
            console.log("success", public_token, metadata);
            //redirect to overview


            // send public_token to server
        },
    });

    return publicToken ? (<PlaidAuth publicToken={publicToken} />) : (!accessToken ?

        (
            <Container>
                <IconContainer />
                <CardTitle>No Card Available</CardTitle>
                <CardStatus>please connect a card</CardStatus>
                <ConnectCardButton onClick={() => open()} disabled={!ready} background-color={theme.colors.danger}>Connect Card</ConnectCardButton>
            </Container>
        ) : (
            <Container>
                <IconContainer />
                <CardTitle>{!institution ? "Bank Name" : institution.name}</CardTitle>
                <CardStatus>{!accountInfo || !institution ? "BANK-ID1234567" : "ACC-" + accountInfo.account}</CardStatus>
                <ChangeCardButton onClick={() => open()} disabled={!ready}>Change Card</ChangeCardButton>
            </Container>
        )
    )
}

export default ChangeCard;

//import logo from './logo.svg';


//import './App.css';




axios.default.baseUrl = "http://localhost:8000"

function PlaidAuth({ publicToken }) {
    //const [account, setAccount] = useState();
    //const [balance, setBalance] = useState();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        async function fetch() {

            console.log(user._id);
            let accessToken = await axios.post("http://localhost:8000/exchange_public_token", { public_token: publicToken });
            console.log("accessToken", accessToken.data.accessToken);
            const auth = await axios.post("http://localhost:8000/auth", { access_token: accessToken.data.accessToken });
            console.log("auth", auth.data);
            const transactions = await axios.post("http://localhost:8000/transactions", { access_token: accessToken.data.accessToken });
            console.log("transactions", transactions.data);
            let institution = await axios.post("http://localhost:8000/institution", { institution_id: auth.data.item.institution_id });
            console.log("institution", institution.data);
            //setAccount(auth.data.numbers.bacs[0]);
            //setBalance(auth.data.accounts[0].balances);

            await axios.patch("/" + user._id, { accessToken: accessToken.data.accessToken }
            );
            let transactionsArray = transactions.data.transactions
            // for each transaction in the array, send it to the database
            // { date, description, amount, category, userId }
            // POST /api/

            //delete all transactions from the database
            let curUser = await axios.get("/" + user._id);
            console.log(curUser);
            //make array with all transactions from that user
            let userTransactions = curUser.data.data.transactions;
            console.log(userTransactions);
            //delete all transactions from that user
            userTransactions.forEach(async (transaction) => {
                console.log(transaction)
                await axios.delete("http://localhost:8000/api/transactions/" + transaction);
            });

            await axios.patch("/" + user._id, { transactions: [] })

            transactionsArray.forEach(async (transaction) => {
                // console.log(transaction);
                await axios.post("/api/transactions", {
                    date: transaction.date,
                    description: transaction.name,
                    amount: transaction.amount,
                    category: transaction.category[0],
                    userId: user._id
                });
            });

            //delete all transaction

        }
        fetch();
    }, []);
    return (
        <Container>
            <RefreshButton href="/">Refresh</RefreshButton>
        </Container>
    );
}
