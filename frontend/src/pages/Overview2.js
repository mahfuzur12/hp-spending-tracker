import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineGraph from '../components/LineGraph';
import BudgetDonut from '../components/BudgetDonut';
//import Heatmap from '../components/Heatmap';
//import BarChart from '../components/BarChart';
//import ConnectBankButton from '../components/ConnectBankButton';

//import pico css
//import '@picocss/pico/css/pico.min.css';
import './Overview2.css';
import { CustomTooltip } from '../components/BudgetDonut';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import ConnectBankButton from '../components/ConnectBankButton/ConnectBankButton';





function Overview() {

  const [transactions, setTransactions] = useState([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [budget, setBudget] = useState(0);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const { user } = useContext(AuthContext);



  useEffect(() => {
    fetchTransactions().then(() => {
      console.log('done');
    });
  }, [user._id]);

  useEffect(() => {
    setTransactions([]); // Reset the transactions state
  }, [user._id]);

  // get user._id from AuthContext
  // get currUser from backend
  // get transaction id array from user
  // get transactions from backend

  const fetchTransactions = async () => {
    
    const currUser = await axios.get('/' + user._id);
    const transactionIds = currUser.data.data.transactions;
    const budget = currUser.data.data.budget;

    setBudget(budget);

    //console.log(await axios.get('/api/transactions/' + transactionIds[0]))

    // add every transaction from backend to transactions array
    for (let i = 0; i < transactionIds.length; i++) {
      const transaction = await axios.get('/api/transactions/' + transactionIds[i]);
      setTransactions(transactions => [...transactions, transaction]);
      setLineProgress((i + 1) / transactionIds.length);
    }

  }

    
  

  useEffect(() => {
    getBudgetSpent();
  }, [transactions]);

  //get budgetSpent from the last week of transactions
  // if transaction is an expense, add to budgetSpent
  const getBudgetSpent = () => {
    let spent = 0;
    let today = new Date();
    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    for (let i = 0; i < transactions.length; i++) {
      let transactionDate = new Date(transactions[i].data.date);
      if (transactionDate > lastWeek) {
        if (transactions[i].data.amount > 0) {
          spent += transactions[i].data.amount;
          console.log(transactions[i])
        }

      }
    }
    setBudgetSpent(spent);
  }

  useEffect(() => {
    console.log(budgetSpent);
  }, [budgetSpent, budget]);

  
  const budgetData = [
    {
      name: 'Used',
      value: budgetSpent,
    },
    {
      name: 'Remaining',
      value: budget - budgetSpent,
    },
  ];


  return (
    <div className="overview" >
      <nav>
        <ul>
          <li><strong>Brand</strong></li>
        </ul>
        <ul>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#" role="button">Button</a></li>
        </ul>
      </nav>
      <section></section>
      <div className="container">
        <div className="overview-container-left">
          <div className="overview-container-left-top">
            <article className="overview-container-left-top-left">

              {lineProgress<1? <progress value={lineProgress} max="1"></progress> : 

                < LineGraph transactions={transactions} />
              
  }

            </article>
            <article className="overview-container-left-top-right">

              <BudgetDonut data={budgetData} />

            </article>
          </div>
          <article className="overview-container-left-bottom">

            BarChart

          </article>
        </div>
        <div className="overview-container-right">
          <article className='overview-container-right-top'>

            Heatmap

          </article>
          <article className='overview-container-right-bottom'>

            <ConnectBankButton />

          </article>
        </div>
      </div>
    </div>
  );
}


export default Overview;