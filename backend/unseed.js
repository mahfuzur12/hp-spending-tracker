const Transaction = require('./models/transactionModel');

async function unseed() {
    try {
        await Transaction.deleteMany({});
        console.log('Successfully unseeded data');
    } catch (err) {
        console.error(err);
    }
}

unseed();
