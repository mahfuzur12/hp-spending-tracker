const express = require('express');
const router = express.Router();
const {
    addTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');

// @route   api/transactions
router.route('/')
    .post(addTransaction)
    .get(getTransactions);

// @route   api/transactions/:id
router.route('/:id')
    .get(getTransaction)
    .patch(updateTransaction)
    .delete(deleteTransaction);

module.exports = router;