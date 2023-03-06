//import logo from './logo.svg';
import React, { useEffect, useState, useContext} from "react";
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import { AuthContext } from "../context/AuthContext";
import ConnectBank from "./ConnectBank";
//import './App.css';

axios.default.baseUrl = "http://localhost:8000"

function PlaidAuth({ publicToken }) {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    async function fetch() {
      let accessToken = await axios.post("http://localhost:8000/exchange_public_token", { public_token: publicToken });
      console.log("accessToken", accessToken.data);
      const auth = await axios.post("http://localhost:8000/auth", { access_token: accessToken.data.accessToken });
      console.log("auth", auth.data);
      const transactions = await axios.post("http://localhost:8000/transactions", { access_token: accessToken.data.accessToken });
      console.log("transactions", transactions.data);
      setAccount(auth.data.numbers.bacs[0]);
      setBalance(auth.data.accounts[0].balances);
      setTransactions(transactions.data.transactions);
    }
    fetch();
  }, []);
  return account && balance && (
    <>
      <p>Account Number: {account.account}</p>
      <p>Sort Code: {account.sort_code}</p>
      <p>Balance: {balance.current}</p>
      <p>Transactions: {transactions.map((transaction) => (<p>{transaction.name} = £{transaction.amount}</p>))} </p>
    </>
  );
}

function Overview() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  let hasCard = false;
  function F () {
    // return if user has non empty accessToken string
    
    const { user } = useContext(AuthContext);
      useEffect(() => {
        async function HasCard () {
          
          console.log("checking if user has card")
          
          console.log(user._id);
          let currUser = await axios.get("http://localhost:8000/api/user/" + user._id);
          console.log(currUser);
          hasCard = (currUser.data.accessToken !== "")
          if (currUser.data.accessToken !== "") {
            console.log("user has card")
            hasCard = true;
          } else {
            console.log("user does not have card")
          }
        }
        HasCard();
      }, []);
    //return true;
  }

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
      // send public_token to server
    },
  });

  return F() ? (
    <div>
      <h1>Overview</h1>
    </div>
  ) : (<ConnectBank />);

}

export default Overview;