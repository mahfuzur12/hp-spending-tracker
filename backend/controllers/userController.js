const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const sendMail = require("../helpers/sendMail");
const createToken = require("../helpers/createToken");
const { activation } = require("../helpers/createToken");
const { create } = require('../models/userModel');

// @route   POST /api/users
// @desc    Create a user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @route   GET /api/users
// @desc    Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @route   GET /api/users/:id
// @desc    Get a single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @route   PATCH /api/users/:id
// @desc    Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @route   DELETE /api/users/:id
// @desc    Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {

        const {email} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({msg: "This email is not registered"})

        const ac_token = createToken.access({id: user.id})

        const url = `http://localhost:3000/reset-password/${ac_token}`
        const name = user.name
        sendMail.sendEmailReset(email, url, "Reset your password", name)

        res.status(200).json({msg: "Re-send the password, please check your email"});

    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}