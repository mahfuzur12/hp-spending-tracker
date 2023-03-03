const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: false
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);