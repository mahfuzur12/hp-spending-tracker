import {Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement} from 'chart.js';
import {Doughnut, Bar, Line} from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

export default function Charts(){
    const pieData ={
        labels: ['Category1', 'Category2', 'Category3'],
        datasets: [
            {
                data: [3, 6, 9],
                backgroundColor: ['#283350', '#f93800', '#ffb500'] 
            }
        ]
    }

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
        <div classname = "Charts">
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