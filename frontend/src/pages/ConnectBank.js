//import logo from './logo.svg';
import React, { useContext, useEffect, useState } from "react";
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import { AuthContext } from "../context/AuthContext";
import Overview from "./Overview";
//import './App.css';




axios.default.baseUrl = "http://localhost:8000"

function PlaidAuth({ publicToken }) {
    //const [account, setAccount] = useState();
    //const [balance, setBalance] = useState();
    //const [transactions, setTransactions] = useState();
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
            //setAccount(auth.data.numbers.bacs[0]);
            //setBalance(auth.data.accounts[0].balances);
            //setTransactions(transactions.data.transactions);

            await axios.patch("/" + user._id, { accessToken: accessToken.data.accessToken }
            );
            let transactionsArray = transactions.data.transactions
            // for each transaction in the array, send it to the database
            // { date, description, amount, category, userId }
            // POST /api/

            //delete all transactions from the database
            let curUser = await axios.get("/" + user._id);
            //make array with all transactions from that user
            let userTransactions = curUser.data.data.transactions;
            //delete all transactions from that user
            userTransactions.forEach(async (transaction) => {
                await axios.delete("/api/transactions/" + transaction._id);
            });

            await axios.patch("/" + user._id, { transactions: [] })
            
            transactionsArray.forEach(async (transaction) => {
                await axios.post("/api/transactions", {
                    date: transaction.date,
                    description: transaction.name,
                    amount: transaction.amount,
                    category: transaction.category[0],
                    userId: user._id
                });
            });

        }
        fetch();
    }, []);
    return  (
        <>
            Refresh page to see your transactions      
        </>
    );
}

function ConnectBank() {
    const [linkToken, setLinkToken] = useState();
    const [publicToken, setPublicToken] = useState();
    const [accessToken, setAccessToken] = useState();
    const { user } = useContext(AuthContext);

    useEffect(() => {

        async function fetch() {
            const response = await axios.post("http://localhost:8000/create_link_token")
            setLinkToken(response.data.link_token);
        }
        fetch();
    }, []);

    useEffect(() => {
        async function Fetch() {
            const response = await axios.get("http://localhost:8000/" + user._id);
            setAccessToken(response.data.data.accessToken);
        }
        Fetch();
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

    return publicToken ? (<PlaidAuth publicToken={publicToken} /> ) : (
        <div>
            <br />
            <button class='btns' onClick={() => open()} disabled={!ready}>
                Connect a bank account
            </button>
            <h1>Connect Bank</h1>
        </div>
    );
}

export default ConnectBank;