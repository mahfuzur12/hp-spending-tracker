const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// @route    POST api/transactions
// @desc     Create a transaction
exports.addTransaction = async (req, res) => {
    const { date, description, amount, category, userId } = req.body;

    try {
        const newTransaction = new Transaction({
            date,
            description,
            amount,
            category,
            // user: req.user.id
        });

        const transaction = await newTransaction.save();

        // update user transactions
        await User.findByIdAndUpdate(userId, { $push: { transactions: transaction._id } });

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    GET api/transactions
// @desc     Get all transactions of a user
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });

        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    GET api/transactions/:id
// @desc     Get transaction by ID
exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Transaction not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @route    PATCH api/transactions/:id
// @desc     Update a transaction
exports.updateTransaction = async (req, res) => {
    const { date, description, amount, category } = req.body;

    // Build transaction object
    const transactionFields = {};
    if (date) transactionFields.date = date;
    if (description) transactionFields.description = description;
    if (amount) transactionFields.amount = amount;
    if (category) transactionFields.category = category;

    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        // Make sure user owns transaction

        transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { $set: transactionFields },
            { new: true }
        );

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    DELETE api/transactions/:id
// @desc     Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        // Make sure user owns transaction
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await transaction.remove();

        res.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Transaction not found' });
        }
        res.status(500).send('Server Error');
    }
};