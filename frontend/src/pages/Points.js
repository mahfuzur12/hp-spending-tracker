import React, { useEffect, useState } from "react";

function Points() {
  const dailyBudget = 60;
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/api/transactions")
        .then((data) => {
          const res = data.json();
          return res;
        })
        .then((res) => {
          // Group transactions by date
          const transactionsByDate = {};
          res.forEach((transaction) => {
            const transactionDate = new Date(transaction.date);
            const dateString = transactionDate.toISOString().split("T")[0];
            if (!transactionsByDate[dateString]) {
              transactionsByDate[dateString] = [];
            }
            transactionsByDate[dateString].push(transaction);
          });

          // Calculate points based on transactions by date
          let totalPoints = 0;
          for (const date in transactionsByDate) {
            let totalAmount = 0;
            transactionsByDate[date].forEach((transaction) => {
              totalAmount += transaction.amount;
            });
            if (totalAmount <= dailyBudget) {
              totalPoints += 4;
            }
          }
          setPoints(totalPoints);
        })
        .catch((e) => {
          console.log("error", e);
        });
    };

    fetchData();
  }, []);

  return <div data-testid="points-display">{points} points</div>;
}

export default Points;
