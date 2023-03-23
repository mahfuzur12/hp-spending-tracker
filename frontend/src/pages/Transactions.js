import axios from 'axios';
import React, { useEffect, useState } from "react";
import "./transactions.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


function Transactions() {
    const ariaLabel = { 'aria-label': 'description' };
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState(" ");
    const [amount, setAmount] = useState(" ");
    const [category, setCategory] = useState(" ");
    const [date, setDate] = useState(" ");
    
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [originalTransactions, setOriginalTransactions] = useState([]);
    const { user } = useContext(AuthContext);

    // Fetch transactions data
   async function renderTransactions(){
         const currUser = await axios.get('/' + user._id);
         const transactionIds = currUser.data.data.transactions;
         const transactionArray = [];
        
    for (let i = 0; i < transactionIds.length; i++) {
        const transaction = (await axios.get('/api/transactions/' + transactionIds[i])).data;
        transactionArray.push(transaction);
        
      }
      setTransactions(transactionArray);
      setOriginalTransactions(transactionArray);
    
      
      };
        useEffect(() => {
      renderTransactions();
    }, []);
     
    // Filter transactions by category
    const handleCategoryChange = (selectedCategory) => {
        setSelectedCategory(selectedCategory);
        if (selectedCategory === "All") {
            setTransactions(originalTransactions);
        } else {
            const filtered = originalTransactions.filter(
                (transaction) => transaction.category === selectedCategory
            );
            setTransactions(filtered);
        }
    };




    // Handle form submit to update a transaction
    async function handleSubmit(event) {
        event.preventDefault();
        const transactionId = event.currentTarget.dataset.transactionId;
        await axios.patch(`http://localhost:8000/api/transactions/${transactionId}`, {
             description,
             category
        }).catch(err => {
            console.log(err);
        });
            
        
            

          
        renderTransactions();
    
      }
      

      // Handle edit button click
      function handleEdit(event) {
        const transactionId = event.currentTarget.dataset.transactionId;
        axios.get(`http://localhost:8000/api/transactions/${transactionId}`)
            .then(res => {
                setDescription(res.data.description);
                setAmount(res.data.amount);
                setCategory(res.data.category);
                setDate(res.data.date);
              
                setShowPopup(true);
            })
            .catch(err => {
                console.log(err);
            });
    }


return(
  
 <>
    
    <div className="transactions-page">
    <div className="filter">
        <h2>Filter by Category</h2>
    <Select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          displayEmpty
          
          inputProps={{ 'aria-label': 'Filter by Category' }}
        >
          <MenuItem value="All">
            All
          </MenuItem>
          <MenuItem value="Travel">Transport</MenuItem>
          <MenuItem value="Shops">Shopping</MenuItem>
          <MenuItem value="Food and Drink">Food & Drink</MenuItem>
          <MenuItem value="transfer">Transfer</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
</div>
    <div className="transactions-table">
    <table> 
        <thead>
            <tr>
            <th>NAME</th>
            <th>AMOUNT</th>
            <th>CATEGORY</th>
            <th>DATE</th>
            </tr>
        </thead>
    <tbody>
    {transactions.filter(
    (transaction) =>
      selectedCategory === "All" || transaction.category === selectedCategory
  ).map((transaction) => ( 
            <tr key={transaction._id} data-transaction-id={transaction._id}>
                <td key={transaction.id} className="description-td">
             <Popup trigger={
                <IconButton aria-label="Edit" onClick={handleEdit}   data-transaction-id={transaction._id} className="edit-btn"> 
                   <EditIcon />
                 </IconButton> }  modal >
                    <div className="modal">
                      <h2>Edit Transaction</h2>
                            <form className="transaction-form"onSubmit={handleSubmit}>                          
                                <TextField size='medium' id="standard-basic" label="New Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
                                <TextField id="standard-basic" label="New Category" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)} />

                                                <IconButton
                                                    aria-label="Edit"
                                                    onClick={handleSubmit}
                                                    data-transaction-id={transaction._id}
                                                >
                                                    <DoneIcon />
                                                </IconButton>

                                            </form>

                                        </div>
                                    </Popup>
                                    {transaction.description}</td>
                                <td >{transaction.amount * -1} £</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.date.toString().substring(0, 10)}</td>
                            </tr>
                        ))}

    </tbody>
</table>
</div>
</div>
</>
    )
}


export default Transactions;










