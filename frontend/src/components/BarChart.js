import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function BarChartComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/transactions')
            .then(response => {
                const categories = {};
                response.data.forEach(transaction => {
                    const { category, amount } = transaction;
                    if (!categories[category]) {
                        categories[category] = 0;
                    }
                    categories[category] += amount;
                });
                //console.log(categories);
                const chartData = Object.keys(categories).map(category => ({ name: category, amount: categories[category] }));
                setData(chartData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartComponent;
