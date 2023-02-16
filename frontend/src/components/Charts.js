import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts(){
    const data ={
        labels: ['Category1', 'Category2', 'Category3'],
        datasets: [
            {
                data: [3, 6, 9],
                backgroundColor: ['#283350', '#f93800', '#ffb500'] 
            }
        ]
    }

    const options = {

    }
    return (
        <div classname = "Charts">
            <h1 id= "chartTitle">Display charts here</h1>
            <div classname = "pieChart" style= {
                {
                    padding: '20px',
                    width: '45%'
                    
                }
            }>
                <Doughnut
                    data = {data}
                    options = {options}
                >
                    
                </Doughnut>
            </div>
        </div>
    )

}