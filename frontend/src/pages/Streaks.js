import React, { useEffect, useState } from "react";
import "./Streaks.css"
import CalendarDay from "../components/CalendarDay";

function Streaks() {
    const dailyBudget = 60;
    const [todaysTotal, setTodaysTotal] = useState(0);
    const [monthTotals, setMonthTotals] = useState([]);
    const [currentStreak, setCurrentStreak] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            fetch("http://localhost:8000/api/transactions")
                .then((data) => {
                    const res = data.json();
                    return res;
                })
                .then((res) => {
                    console.log("resss", res);

                    // Filter transactions that occurred today
                    const today = new Date();
                    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
                    const todayTransactions = res.filter((transaction) => {
                        const transactionDate = new Date(transaction.date);
                        return transactionDate >= todayStart && transactionDate < todayEnd;
                    });

                    // Calculate the total spending for today
                    const todayTotal = todayTransactions.reduce(
                        (total, transaction) => total + transaction.amount,
                        0
                    );
                    setTodaysTotal(todayTotal);

                    // Calculate the daily spending totals for the current month
                    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
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

                })
                .catch((e) => {
                    console.log("error", e);
                });
        };

        fetchData();
    }, []);


    const getDayMessage = (dayTotal) => {
        // Calculate message for the day
    };

    const today = new Date();
    const currentDayOfMonth = today.getDate();
    const monthDays = Array.from(Array(currentDayOfMonth), (_, i) => i + 1);



    return (
        <>
            <div className="content">
                <h1>Streaks</h1>
                <p>
                    Today's spending total: <strong>{todaysTotal}</strong>
                    <br />
                    Current Streak: <strong>{currentStreak}</strong>
                </p>
                {todaysTotal <= dailyBudget ? (
                    <p>You're within your daily budget!</p>
                ) : (
                    <p>You've exceeded your daily budget.</p>
                )}
                <h2>Monthly totals</h2>
                <div className="calendar">
                    {monthDays.map((day) => {
                        const dayTotal = monthTotals[day - 1] || 0;
                        return (
                            <CalendarDay
                                key={day}
                                day={day}
                                budget={dailyBudget}
                                dayTotal={dayTotal}
                                isOverBudget={dayTotal > dailyBudget}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Streaks;