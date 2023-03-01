const mongoose = require('mongoose');
const Transaction = require('./models/transactionModel');
const dotenv = require('dotenv');
dotenv.config();


// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(error => console.error(error));

// Define an array of categories to choose from
const categories = ['food & drink', 'transport', 'entertainment', 'shopping', 'Other'];

// Create an array of mock transactions
const startDate = new Date('2022-01-01');
const endDate = new Date();
const daysBetween = Math.round((endDate - startDate) / (24 * 60 * 60 * 1000));

const transactions = Array.from({ length: 100 }, (_, index) => {
    const daysAgo = Math.floor(Math.random() * daysBetween);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return {
        date: date,
        description: `Transaction ${index}`,
        amount: Math.floor(Math.random() * 100) + 1,
        category: categories[Math.floor(Math.random() * categories.length)],
        user: '63e208865bf1447790d7e32b'
    };
});

// Save the transactions to the database
Transaction.insertMany(transactions)
    .then(() => console.log('Transactions created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.connection.close());