import {Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement} from 'chart.js';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import React,{useEffect, useState} from "react";
import Navbar from "../components/Navbar"; 


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
    })

    const [lineData, setLineData] = useState({
        labels: ["This Month"],
        datasets: [
            {
                data:[10, 20, 30],
                backgroundColor: '#6b9bd1',
                borderColor: '#6b9bd1',
                tension: 0.3,
                label: "Spending this month"
            },
            {
                label: "Spending last month",
                data:[10, 20, 30],
                backgroundColor: 'red',
                borderColor: 'red',
                tension: 0.3
            }
        ]
    })

    const[barData, setBarData] = useState({
        labels: ["Week1", "Week2", "Week3", "Week4", "Week5"],
        datasets: [
            {
                label: 'Weekly Spending',
                data: [40, 50, 100, 250, 150],
                backgroundColor: '#ed335f'

            }
        ]
    })

    function getWeeksInMonth(year, month) {
        const weeks = [],
          firstDate = new Date(year, month - 1, 1),
          lastDate = new Date(year, month + 1, 0),
          numDays = lastDate.getDate();
      
        let dayOfWeekCounter = firstDate.getDay();
      
        for (let date = 1; date <= numDays; date++) {
          if (dayOfWeekCounter === 0 || weeks.length === 0) {
            weeks.push([]);
          }
          weeks[weeks.length - 1].push(date);
          dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
        }
      
        return weeks
          .filter((w) => !!w.length)
          .map((w) => ({
            start: w[0],
            end: w[w.length - 1],
            dates: w,
          }));
      }
    
    useEffect(() => {
       const fetchData = () => {
        fetch("http://localhost:8000/api/transactions").then((data) => {
            const res = data.json();
            return res
        }).then((res) => {
            console.log("resss", res)
            const pieData = [];
            const pieLabel = [];
            const lineData = [];
            const lineLabel = [];
            const barData = [];
            const barLabel = [];
            var today = new Date();
            var mm = String(today.getMonth() + 1 ).padStart(2, '0'); 
            var yyyy = today.getFullYear();
            today = yyyy + "-" + mm
            const d = new Date(yyyy, mm - 1, 10);  
            const month = d.toLocaleString('en-us', { month: 'long' });
            var other = 0;
            var transport = 0;
            var entertainment = 0;
            var food = 0;
            var shopping = 0;
            var weeksInMonth = getWeeksInMonth(yyyy, mm);
            for(var j=0; j < weeksInMonth.length; j++){
                var interval = weeksInMonth[j].start + "-" + weeksInMonth[j].end
                barLabel.push(interval)
                barData.push(0)
            }
            for (var i of res){
                if(i.date.toString().substring(0,7) === today){
                    var date = parseInt(i.date.toString().substring(8,10))
                    for(var k=0; k < weeksInMonth.length; k++){
                        if(weeksInMonth[k].dates.includes(date)){
                            barData[k] += i.amount
                        }
                    }
                    lineData.push(i.amount)
                    lineLabel.push(i.date.toString().substring(5,10))
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
            }
            lineData.reverse()
            lineLabel.sort()
            pieData.push(other, transport, entertainment, food, shopping)
            setPieData(
                {
                    datasets: [{
                        data: pieData,
                        
                    }],
                    labels: pieLabel
                }
            )
            setLineData(
                {
                    datasets: [
                        {
                            data: lineData,
                            label: "Spending this month"
                        },
                    ],
                    labels: lineLabel
                    
                    
                }
            )
            setBarData(
                {
                    datasets: [
                        {
                            data: barData,
                            label: "Spending in " + month + " " + yyyy,
                            backgroundColor: '#ed335f',
                        }
                    ],
                    labels: barLabel
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

    const barOptions = {
        scales: {
            y: {
              beginAtZero: true
            }
          }
    }

    const lineOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return (
        <div className = "Charts">
            <h1 id= "chartTitle">Spending Trends for this month</h1>
        <div className = "content">
            <div>
            <Navbar />
            </div>
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
        
        </div>
    )

}

export default Charts;