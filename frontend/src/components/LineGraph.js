import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chart from "react-apexcharts";
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 0.7rem;
  font-weight: bold;

  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background-color: ${props => props.color};
    border-radius: 4px;
    margin-right: 0.25rem;
  }
`;

const LegendWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const COLORS = ['var(--primary)', 'rgba(255, 255, 255, 1)'];

const processData = (transactions) => {
    const data = [];
    const today = new Date();
    const last28DaysDate = new Date(today - 28 * 24 * 60 * 60 * 1000);
    const pastYearDate = new Date(today - 365 * 24 * 60 * 60 * 1000);

    const averageDailySpending = new Array(28).fill(0);
    const dailySpendingCounts = new Array(28).fill(0);

    // Calculate the average spending for each day over multiple 28-day periods
    for (const transaction of transactions) {
        const transactionDate = new Date(transaction.data.date);
        if (transactionDate >= pastYearDate && transactionDate < last28DaysDate) {
            const dayIndex = Math.floor((transactionDate - pastYearDate) / (24 * 60 * 60 * 1000)) % 28;
            averageDailySpending[dayIndex] += transaction.data.amount;
            dailySpendingCounts[dayIndex]++;
        }
    }

    for (let i = 0; i < 28; i++) {
        averageDailySpending[i] /= dailySpendingCounts[i];
    }

    for (let i = 0; i < 28; i++) {
        const date = new Date(last28DaysDate.valueOf() + i * 24 * 60 * 60 * 1000);
        data.push({
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            last28Days: 0,
            averageDaily: averageDailySpending[i],
        });
    }

    for (const transaction of transactions) {
        const transactionDate = new Date(transaction.data.date);
        const diff = Math.floor((today - transactionDate) / (24 * 60 * 60 * 1000));
        if (diff < 28) {
            data[27 - diff].last28Days += transaction.data.amount;
        }
    }

    return data;
};





const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label}`}</p>
                <p className="last-30-days">Last 30 Days: £{payload[0].value.toFixed(2)}</p>
                <p className="previous-30-days">Previous 30 Days: £{payload[1].value.toFixed(2)}</p>
            </div>
        );
    }

    return null;
};

const LineGraph = ({ transactions }) => {
    const lineGraphData = processData(transactions);

    const options = {
        chart: {
            type: "line",
        },
        xaxis: {
            categories: lineGraphData.map((d) => d.date),
        },
        yaxis: {
            labels: {
                formatter: (value) => `£${value.toFixed(2)}`,
            },
        },
        tooltip: {
            x: {
                format: "dd/MM/yyyy",
            },
            y: {
                formatter: (value) => `£${value.toFixed(2)}`,
            },
        },
        colors: COLORS,
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        grid: {
            show: false,
        },
        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: "Last 28 days",
            data: lineGraphData.map((d) => d.last28Days),
        },
        {
            name: "Average daily",
            data: lineGraphData.map((d) => d.averageDaily),
        },
    ];

    const totalDifference = lineGraphData.reduce((acc, item) => acc + item.last28Days - item.averageDaily, 0);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Title>Spending</Title>
            <Chart options={options} series={series} type="line" />
            <p style={{ textAlign: "center", fontSize: "0.8rem" }}>
                You have spent £{totalDifference.toFixed(2)} more than usual in the last 28 days...
            </p>
            <LegendWrapper>
                <LegendItem key={`legend-0`} color={COLORS[0]}>
                    Last 28 days
                </LegendItem>
                <LegendItem key={`legend-1`} color={COLORS[1]}>
                    Average daily
                </LegendItem>
            </LegendWrapper>
        </div>
    );
};


export default LineGraph;