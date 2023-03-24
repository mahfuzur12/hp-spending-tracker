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
  height: 100%;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.medium};
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.white} !important;
  margin-bottom: 0;
`;

const SubHeading = styled.h3`
    font-family: ${theme.fonts.subHeadings};
    font-size: ${theme.fontSizes.subHeadings};
    font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.colors.text};
    margin-bottom: 1vh;
`;

const COLORS = [theme.colors.text, theme.colors.white];

const processData = (transactions) => {
    const data = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const thisMonthTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.data.date);
        const thisMonth = today.getMonth();
        return transactionDate.getMonth() === thisMonth && transaction.data.amount > 0;
    });

    const lastMonthTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.data.date);
        const lastMonth = today.getMonth() - 1;
        return transactionDate.getMonth() === lastMonth && transaction.data.amount > 0;
    });

    const processedThisMonthData = [];
    const processedLastMonthData = [];

    for (let i = 0; i < daysInCurrentMonth; i++) {
        const date = new Date(currentYear, currentMonth, i + 1);
        const dateString = `${date.getDate()}/${date.getMonth() + 1}`;
        const thisMonthAmount = thisMonthTransactions.reduce((total, transaction) => {
            const transactionDate = new Date(transaction.data.date);
            return transactionDate.getDate() === date.getDate() ? total + transaction.data.amount : total;
        }, 0);
        const lastMonthAmount = lastMonthTransactions.reduce((total, transaction) => {
            const transactionDate = new Date(transaction.data.date);
            return transactionDate.getDate() === date.getDate() ? total + transaction.data.amount : total;
        }, 0);
        processedThisMonthData.push(thisMonthAmount);
        processedLastMonthData.push(lastMonthAmount);
        data.push({
            date: dateString,
            thisMonth: thisMonthAmount,
            lastMonth: lastMonthAmount,
        });
    }

    return {
        data: data,
        thisMonth: processedThisMonthData,
        lastMonth: processedLastMonthData,
    };
};




const SpendingLine = ({transactions}) => {

    const lineGraphData = processData(transactions);

    const options = {
        chart: {
            type: "line",
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
        },
        xaxis: {
            categories: lineGraphData.data.map((d) => d.date),
            labels: {
                style: {
                    colors: theme.colors.white, 
                    fontSize: theme.fontSizes.mini, 
                    fontFamily: theme.fonts.normalText, 
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => `£${value.toFixed(2)}`,
                style: {
                    colors: theme.colors.white, 
                    fontSize: theme.fontSizes.normalText, 
                    fontFamily: theme.fonts.normalText, 
                },
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
            show: true,
        },
    };


    const series = [
        {
            name: "Last Month",
            data: lineGraphData.lastMonth,
        },
        {
            name: "This Month",
            data: lineGraphData.thisMonth,
        },
    ];

    return (
        <Container>
            <Title>Spending this month</Title>
            <SubHeading>vs last month</SubHeading>
            <Chart options={options} series={series} type="line" />
        </Container>
    );
};
export default SpendingLine;
