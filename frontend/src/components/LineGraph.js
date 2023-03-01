import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useTheme } from '@material-ui/core/styles';

const LineGraph = () => {
    const theme = useTheme();
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/transactions');
                const transactions = res.data;

                //console.log(res.data)
                //console.log(transactions);
                //console.log(transactions.map((transaction) => transaction.amount));

                const labels = transactions.map((transaction) => transaction.date);

                const data = transactions.map((transaction) => transaction.amount);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Spending Over Time',
                            data,
                            fill: false,
                            borderColor: theme.palette.primary.main,
                            tension: 0.1,
                        },
                    ],
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [theme.palette.primary.main]);

    return (
        <div>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                            },
                        },
                        y: {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default LineGraph;