import React, { useEffect, useState, useContext } from "react";
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import Card from "../components/ConnectBankButton/Card";
import { usePlaidLink } from 'react-plaid-link';
import "./Overview.css"

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
  const [hasCard, setHasCard] = useState(false);

  function CheckToken() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
      async function HasCard() {
        let currUser = await axios.get("http://localhost:8000/" + user._id);
        if (currUser.data.data.accessToken !== "") {
          setHasCard(true);
        } else {
          setHasCard(false);
        }
      }
      HasCard();
    }, [user._id]);
    return hasCard;
  }

  return !CheckToken() ? (
    <div className="card-container">
      <Card />
    </div>
  ) : (
    <div className="card-container">
      <h1 className="overview-overview">Overview</h1>
      <Card />
    </div>
  );

}

export default Overview;