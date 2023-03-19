import Navbar from "../components/Navbar";
import React, {useState, useEffect} from 'react'
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';
import "./BudgetSummary.css"
import {useNavigate } from "react-router-dom";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


function BudgetSummary(){
    const navigate = useNavigate();

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var daysLeft = (daysInMonth(yyyy, mm) - dd) + 1
    
    const budgetData = {
        labels: ['Budget Tracker'],
        datasets: [
            {
                label: "Total Budget",
                backgroundColor: "rgb(0, 0, 0, 0.1)",
                data: [500],
                borderWidth: 1,
                borderSkipped: false,
                borderRadius: 5,
                barPercentage: 0.25,
                grouped: false,
            },
            { 
                label: "Budget Left",
                data: [360],
                backgroundColor: "rgb(46, 213, 115)",
                borderColor: "rgba(46, 213, 115, 0.5)",
                borderWidth: 1,
                borderSkipped: false,
                borderRadius: 5,
                barPercentage: 0.25
            }
        ]
    }

    //async function getBudget() {
        //let curUser = await axios.get("/" + user._id);
    //}

    const budget= 360;

    const budgetOptions = {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    display: false
                }
            },
            y: {
                display: false,
                beginAtZero: true,
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    display: false
                }
            }
        }
    }


    return(
        <div className="budget-summary-container">
            <Navbar/>
            <h1 id="budget-summary-title"> Budget Summary</h1>
            <h2 id="budget-left">You have £{budget} left for {daysLeft} days</h2>
            <div className="budget-bar"> 
                <Bar className="budget-bar"
                data = {budgetData}
                options = {budgetOptions}>
                </Bar>
            </div>
            <button onClick={() => {navigate("/budget")}} className="reset-budget-button"> Reset Budget </button>
        </div>
    )
}

export default BudgetSummary;