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

UserSchema.statics.signup = async function (name, email, password) {

    if (!name || !email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }


    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('This email is already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })

    return user

}

module.exports = mongoose.model('User', UserSchema);
