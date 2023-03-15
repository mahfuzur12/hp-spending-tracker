//import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import 'regenerator-runtime/runtime';
import axios from 'axios';
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
      // send public_token to server
    },
  });

  return publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
    <div>
      <br/>
    <button className="btnsOverview" onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
    </div>
  );

}

export default Overview;