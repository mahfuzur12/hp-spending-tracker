import {Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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
        </div>
    )

}