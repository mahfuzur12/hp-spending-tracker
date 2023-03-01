import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import SummaryBox from '../components/SummaryBox';
import LineGraph from '../components/LineGraph';
import BarChart from '../components/BarChart';
import axios from 'axios';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/transactions');
                setTransactions(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, []);

    // Calculate total amount spent
    const totalSpent = transactions.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);

    // Calculate amounts spent by category
    const categories = ['food & drink', 'transport', 'entertainment', 'shopping', 'Other'];
    console.log(categories);
    const categoryAmounts = categories.map((category) => {
        const amount = transactions
            .filter((transaction) => transaction.category === category)
            .reduce((total, transaction) => {
                return total + transaction.amount;
            }, 0);
        return { category, amount };
    });

    // Calculate balance over time
    const balanceOverTime = transactions.reduce((balanceHistory, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString();
        const balance = balanceHistory.length === 0 ? 0 : balanceHistory[balanceHistory.length - 1].balance;
        balanceHistory.push({ date, balance: balance - transaction.amount });
        return balanceHistory;
    }, []);

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <SummaryBox title="Total Spent" amount={totalSpent} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <SummaryBox title="Food & Drink" amount={categoryAmounts.find((c) => c.category === 'food & drink').amount} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <SummaryBox title="Transport" amount={categoryAmounts.find((c) => c.category === 'transport').amount} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <SummaryBox title="Entertainment" amount={categoryAmounts.find((c) => c.category === 'entertainment').amount} />
            </Grid>
            <Grid item xs={12} md={8}>
                <LineGraph data={balanceOverTime} />
            </Grid>
            <Grid item xs={12} md={4}>
                <BarChart data={categoryAmounts} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
