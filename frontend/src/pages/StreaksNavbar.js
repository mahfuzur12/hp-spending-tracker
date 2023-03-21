import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import "./Streaks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import "./Budget.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function StreaksNavbar() {
  const { user } = useContext(AuthContext);

  const [todaysTotal, setTodaysTotal] = useState(0);
  const [monthTotals, setMonthTotals] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    async function Fetch() {
      try {
        const res = await axios.get(`http://localhost:8000/users/${user._id}`);
        const { budget } = res.data;

        // Calculate daily budget based on the number of days in the current month
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const dailyBudget = budget / daysInMonth;
        setBudget(budget);

        const data = await axios.get("http://localhost:8000/api/transactions");

        // Filter transactions that occurred today
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
        const todayTransactions = res.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= todayStart && transactionDate < todayEnd;
        });

        // Calculate the total spending for today
        const todayTotal = todayTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        setTodaysTotal(todayTotal);

        // Calculate the daily spending totals for the current month
        const monthTotals = new Array(daysInMonth).fill(0);
        res.forEach((transaction) => {
          const transactionDate = new Date(transaction.date);
          if (transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear()) {
            const dayOfMonth = transactionDate.getDate() - 1;
            monthTotals[dayOfMonth] += transaction.amount;
          }
        });
        setMonthTotals(monthTotals);

        // Calculate the current streak
        let streak = 0;
        let currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        while (streak < monthTotals.length) {
          if (monthTotals[currentDate.getDate() - 1] > dailyBudget) {
            break;
          }
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        }
        setCurrentStreak(streak);
      } catch (error) {
        console.error(error);
      }
    }

    Fetch();
  }, []);

    const fireIcons = Array(currentStreak).fill(null);


    return (
        <div className="blank-screen">
          {fireIcons.map((_, index) => (
            <FontAwesomeIcon key={index} icon={faFire} size="lg" style={{ color: "#96d35f" }} />
          ))}
        </div>
      );
    }
export default StreaksNavbar;