import {Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement} from 'chart.js';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import React,{useEffect, useState} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

function Charts(){
    const [pieData, setPieData] = useState({
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: ['#ac92eb', '#4fc1e8', '#a0d568', '#ffce54', '#ed5564'] 
        }],
        labels: ["Other", "Transport", "Entertainment", "Food & Drink", "Shopping" ]
    });
    
    useEffect(() => {
       const fetchData = () => {
        fetch("http://localhost:8000/api/transactions").then((data) => {
            const res = data.json();
            return res
        }).then((res) => {
            console.log("resss", res)
            const pieData = [];
            const pieLabel = [];
            var other = 0;
            var transport = 0;
            var entertainment = 0;
            var food = 0;
            var shopping = 0;
            for (var i of res){
                if(!pieLabel.includes(i.category)){
                    pieLabel.push(i.category)
                }
                if(i.category === "Other"){
                    other += i.amount;
                }
                else if(i.category === "transport"){
                    transport += i.amount;
                }
                else if(i.category === "entertainment"){
                    entertainment += i.amount;
                }
                else if(i.category === "food & drink"){
                    food += i.amount;
                }
                else if(i.category === "shopping"){
                    shopping += i.amount
                }
            }
            pieData.push(other, transport, entertainment, food, shopping)
            setPieData(
                {
                    datasets: [{
                        data: pieData,
                        
                    }],
                    labels: pieLabel
                }
            )
        }).catch(e => {
            console.log("error", e)
        })
    } 
    fetchData();
    },  [])

    const pieOptions = {

    }

    const barData = {
        labels: ["week1", "week2", "week3", "week4", "week5" ],
        datasets: [
            {
                label: 'Weekly Spending',
                data: [40, 50, 100, 250, 150],
                backgroundColor: '#ed335f',
                borderColor: 'black'
            }
        ]
    }

    const barOptions = {
        scales: {
            y: {
              beginAtZero: true
            }
          }
    }

    const lineData = {
        labels: ["January", "February", "March", "April", "May", "June" ],
        datasets: [
            {
                label: 'Monthly Spending',
                data: [700, 900, 1000, 1200, 1100, 850],
                backgroundColor: '#6b9bd1',
                borderColor: '#6b9bd1',
                tension: 0.3
            }
        ]
    }

    const lineOptions = {
        
    }

    return (
        <div className = "Charts">
            <h1 id= "chartTitle">Display charts here</h1>
            <div id = "pieChart">
                <Doughnut
                    data = {pieData}
                    options = {pieOptions}
                >
                </Doughnut>
            </div>

            <div id = "barChart">
                <Bar
                    data = {barData}
                    options = {barOptions}>
                </Bar>
            </div>
            <div id = "lineChart">
                <Line
                    data = {lineData}
                    options = {lineOptions}>
                </Line>
            </div>
        </div>
    )

}

export default Charts;