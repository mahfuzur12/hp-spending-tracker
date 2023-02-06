const Transaction = require('../models/transactionModel')
const mongoose = require('mongoose')


const testFunc = async (req, res) => {
    res.status(200).json({ request: 'successful' })
}

module.exports = { testFunc }