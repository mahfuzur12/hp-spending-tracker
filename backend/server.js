const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = express();

const transactionsRouter = require('./routes/transactionRouter');
const userRouter = require('./routes/userRouter');

// Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db, listening on port ' + process.env.PORT)
        })
    })
    .catch((error => {
        console.log(error)
    }))

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    req.user = { id: "63e208865bf1447790d7e32b" };
    next()
})

app.use('/api/transactions', transactionsRouter);
app.use('/api/users', userRouter);



