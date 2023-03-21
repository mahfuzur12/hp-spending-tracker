import axios from 'axios';
import React, { useEffect, useState } from "react";
import "../transactions.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from '../components/Navbar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



function Transactions() {
    const ariaLabel = { 'aria-label': 'description' };
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState(" ");
    const [amount, setAmount] = useState(" ");
    const [category, setCategory] = useState(" ");
    const [date, setDate] = useState(" ");
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [originalTransactions, setOriginalTransactions] = useState([]);

    // Fetch transactions data
    useEffect(() => {
        axios.get("http://localhost:8000/api/transactions")
            .then(res => {
                setOriginalTransactions(res.data);
                setTransactions(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const filteredTransactions =
        categoryFilter === "All"
            ? transactions
            : transactions.filter((transaction) => transaction.category === categoryFilter);


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
    function handleSubmit(event) {
        event.preventDefault();
        const transactionId = event.currentTarget.dataset.transactionId;
        axios.patch(`http://localhost:8000/api/transactions/${transactionId}`, {
            description,
            category
        })
            .then(res => {
                console.log(res.data);
                setShowPopup(false);
                setSelectedTransactionId(null);
                axios.get("http://localhost:8000/api/transactions") // Refresh transactions data
                    .then(res => setTransactions(res.data))
                    .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err);
            })
    }


    // Handle edit button click
    function handleEdit(event) {
        console.log("Hello")
        const transactionId = event.currentTarget.dataset.transactionId;
        axios.get(`http://localhost:8000/api/transactions/${transactionId}`)
            .then(res => {
                setDescription(res.data.description);
                setAmount(res.data.amount);
                setCategory(res.data.category);
                setDate(res.data.date);
                setSelectedTransactionId(transactionId);
                setShowPopup(true);
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (

        <div className="content">
            <div >
                <Navbar />
            </div>
            <div className="filter">
                <h2>Filter by Category:</h2>
                <Select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    displayEmpty

                    inputProps={{ 'aria-label': 'Filter by Category' }}
                >
                    <MenuItem value="All">
                        All
                    </MenuItem>
                    <MenuItem value="transport">Transport</MenuItem>
                    <MenuItem value="shopping">Shopping</MenuItem>
                    <MenuItem value="food & drink">Food & Drink</MenuItem>
                    <MenuItem value="entertainment">Entertainment</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </div>
            <div className="transactions">
                <table>
                    <thead>
                        <tr>
                            <th>TRANSACTION<br />NAME</th>
                            <th>AMOUNT <br></br> SPENT</th>
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
                                <td key={transaction.id}>
                                    <Popup trigger={
                                        <IconButton aria-label="Edit" onClick={handleEdit} data-transaction-id={transaction._id} > <EditIcon /> </IconButton>
                                    } modal >
                                        <div className="modal">
                                            <form onSubmit={handleSubmit}>

                                                <TextField id="standard-basic" label="Description" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                                    <MenuItem value="transport">Transport</MenuItem>
                                                    <MenuItem value="shopping">Shopping</MenuItem>
                                                    <MenuItem value="food & drink">Food & Drink</MenuItem>
                                                    <MenuItem value="entertainment">Entertainment</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </Select>
                                                <input type="image" alt='Upload Image'></input>

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










