import axios from 'axios';
import React, { useEffect, useState } from "react";
import "../transactions.css"
import Navbar from '../components/Navbar';

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8000/api/transactions")
            .then(res => {
                console.log(res.data);
                setTransactions(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);



    return (
        <div className="tran-container">
            <div>
                <Navbar />
            </div>
            <table>
                <thead>
                    <tr>
                        <th >DESCRIPTION</th>
                        <th >AMOUNT SPENT</th>
                        <th >CATEGORY</th>
                        <th >DATE</th>
                    </tr>
                </thead>
                <tbody>



                    {transactions.map((transaction) => (
                        <tr >
                            <td>{transaction.description}</td>
                            <td>{transaction.amount} £</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.date.toString().substring(0, 10)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>

    )
}


export default Transactions;

