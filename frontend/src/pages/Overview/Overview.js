import React from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const Page = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const LineGraphContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 24px;
`;

const DonutChartContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const ChangeBankCard = styled.div`
  background-color: ${(props) => props.theme.accent};
  padding: 16px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  margin-top: 24px;
  cursor: pointer;
`;

const SummaryCard = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.accent};
  padding: 16px;
  border-radius: 8px;
  margin: 8px;
  width: 100%;
  max-width: 250px;
  text-align: center;
`;

const SummaryCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 24px;
`;

const Overview = () => {
    const lineChartOptions = {
        chart: {
            type: "line",
            toolbar: {
                show: false,
            },
        },
        colors: [theme.accent],
        series: [
            {
                name: "Spending",
                data: [ /* Your data */],
            },
        ],
        xaxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: theme.text,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: theme.text,
                },
            },
        },
        grid: {
            borderColor: theme.accent,
        },
        tooltip: {
            theme: "dark",
        },
    };

    const donutChartOptions = {
        chart: {
            type: "donut",
            toolbar: {
                show: false,
            },
        },
        colors: [/* Your colors */],
        series: [/* Your data */],
        labels: [/* Your labels */],
        legend: {
            position: "bottom",
            labels: {
                colors: theme.text,
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            theme: "dark",
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <Page>
                <LineGraphContainer>
                    <ReactApexChart options={lineChartOptions} series={lineChartOptions.series} type="line" />
                </LineGraphContainer>

                <DonutChartContainer>
                    <ReactApexChart options={donutChartOptions} series={donutChartOptions.series} type="donut" />
                    <ChangeBankCard>Change Bank</ChangeBankCard>
                </DonutChartContainer>

                <SummaryCardsContainer>
                    <SummaryCard>
                        <h4>Total Spending</h4>
                        <p>$1234.56</p>
                    </SummaryCard>
                    <SummaryCard>
                        <h4>Average Daily Spending</h4>
                        <p>$123.45</p>
                    </SummaryCard>
                    <SummaryCard>
                        <h4>Remaining Budget</h4>
                        <p>$987.65</p>
                    </SummaryCard>
                </SummaryCardsContainer>
            </Page>
        </ThemeProvider>
    );

};

export default Overview;