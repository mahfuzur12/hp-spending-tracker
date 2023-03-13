import axios from 'axios';
import React,{useEffect, useState} from "react";
import "../transactions.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';




function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState(" ");
    const [amount, setAmount] = useState(" ");
    const [category, setCategory] = useState(" ");
     const [date, setDate] = useState(" ");
   
    
    useEffect(function renderTransactions() {
       
            axios.get("http://localhost:8000/api/transactions")
            .then(res =>    {
            console.log(res.data);
            setTransactions(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(function editTransaction(id){
        axios.get(`http://localhost:8000/api/transactions/${id}`)
        .then(res => {
            console.log(res.data);
            setDescription(res.data.description);
            setAmount(res.data.amount);
            setCategory(res.data.category);
            setDate(res.data.date);
        })
        .catch(err => {
            console.log(err);
        })
        

    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/transactions`, {
            description,
            amount,
            category,
            date

        })
        .then(res => {
            console.log(res.data);
        }
        )
        .catch(err => {
            console.log(err);
        }
        )

          
    }

    

       
return(
   
    <div className="transactions">
    <div className='div1'>
        <table>
            <thead>
                <tr>
                    <th>DESCRIPTION</th>
                    <th>AMOUNT <br></br> SPENT</th>
                    <th>CATEGORY</th>
                    <th>DATE</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr>
                        <td > <Popup trigger={<button className='edit-btn'> Edit </button>}  >
    <div className="modal">
        <div className="modal-content" hideOnDocumentClick={true}>
            <h2>Edit Transaction</h2>
            <a href='/' className='close'>&times;</a>
        <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br/>
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} /><br/>
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} /><br/>
                <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button type="submit">SAVE</button>

            </form>
            </div>
            </div>
                        </Popup>{transaction.description}</td>
                        <td >{transaction.amount} £</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.date.toString().substring(0, 10)}</td>
                    </tr>
                ))}

            </tbody>
        </table>

            
    </div>
    


    </div>



)
}


export default Transactions;
