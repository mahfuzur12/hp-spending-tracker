const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator')

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
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ]
});

UserSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled!')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password!')
    }

    return user 
}

module.exports = mongoose.model('User', UserSchema);
