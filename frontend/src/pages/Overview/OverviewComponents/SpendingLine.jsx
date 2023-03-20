// spending line chart of the last 30 days and previous 30 days

import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import Chart from "react-apexcharts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  min-width: 5vw;
  padding: 1vh;
  max-height: 2vh;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.medium};
  font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.colors.white} !important;
  margin-bottom: 1vh;
`;

const COLORS = [theme.colors.white, theme.colors.text];

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


const SpendingLine = ({ transactions }) => {

    const lineGraphData = processData(transactions);

    const options = {
        chart: {
            type: "line",
            sparkline: {
                enabled: true
            }
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

    


    return (
        <Container>
            <Title>Spending Last 30 Days</Title>
            <Chart options={options} series={series} type="line" />
        </Container>
    );
};

export default SpendingLine;
