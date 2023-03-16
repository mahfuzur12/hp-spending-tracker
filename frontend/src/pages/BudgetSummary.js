import Navbar from "../components/Navbar";
import React, {useState, useEffect} from 'react'
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


function BudgetSummary(){

    
    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var daysLeft = (daysInMonth(yyyy, mm) - dd) + 1
    //var budgetDescription = document.getElementById("budget-left")
    //budgetDescription.innerText = daysLeft;
    
        
    const budgetData = {
        labels: ['Budget Left'],
        datasets: [
            { 
                data: [500],
                backgroundColor: "rgb(46, 213, 115)",
                borderColor: "rgba(46, 213, 115, 0.5)",
                borderWidth: 0,
                borderSkipped: false,
                borderRadius: 5,
                barPercentage: 0.25
            }
        ]
    }

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
        <div className="content">
            <Navbar></Navbar>
            <h1> Budget Summary</h1>
            <h2 id="budget-left">You have £ left for {daysLeft} days</h2>
            <Bar
            data = {budgetData}
            options = {budgetOptions}>
            </Bar>
        </div>
    )
}

export default BudgetSummary;