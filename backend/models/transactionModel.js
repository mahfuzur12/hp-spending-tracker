const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)
