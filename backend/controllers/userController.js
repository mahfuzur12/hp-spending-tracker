const User = require('../models/userModel');
const sendMail = require("../helpers/sendMail");
const createToken = require("../helpers/createToken");
const { activation } = require("../helpers/createToken");
const { create } = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require('validator')

// @route   POST /api/users
// @desc    Create a user

exports.signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ msg: "Please fill in all fields." });

        if (!validator.isEmail(email))
            return res
                .status(400)
                .json({ msg: "Please enter a valid email address." });

        const user = await User.findOne({ email });
        if (user)
            return res
                .status(400)
                .json({ msg: "This email is already registered in our system." });

        if (!validator.isStrongPassword(password))
            return res
                .status(400)
                .json({ msg: "Password is not strong enough." });

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = { name, email, password: hashPassword };
        const activation_token = createToken.activation(newUser);

        const url = `http://localhost:3000/api/auth/activate/${activation_token}`;
        sendMail.sendEmailRegister(email, url, "Verify your email");

        res.status(200).json({ msg: "Welcome! Please check your email." });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.activateUser = async (req, res) => {
    try {
        const { activation_token } = req.body;

        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
        const { name, email, password } = user;

        const check = await User.findOne({ email });
        if (check)
            return res
                .status(400)
                .json({ msg: "This email is already registered." });

        const newUser = new User({
            name,
            email,
            password,
            budget: 100,
        });
        await newUser.save();

        res
            .status(200)
            .json({ msg: "Your account has been activated, you can now sign in." });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ msg: "This email is not registered in our system." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "This password is incorrect." });

        const rf_token = createToken.refresh({ id: user._id });
        res.cookie("_apprftoken", rf_token, {
            httpOnly: true,
            path: "/access",
            maxAage: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ msg: "Signin success" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.access = async (req, res) => {
    try {
        const rf_token = req.cookies._apprftoken;
        if (!rf_token) return res.status(400).json({ msg: "Please sign in." });

        jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please sign in again." });

            const ac_token = createToken.access({ id: user.id });

            return res.status(200).json({ ac_token });
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ msg: "This email is not registered in our system." });

        const ac_token = createToken.access({ id: user.id });

        const url = `http://localhost:3000/auth/reset-password/${ac_token}`;
        const name = user.name;
        sendMail.sendEmailReset(email, url, "Reset your password", name);

        res
            .status(200)
            .json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password } = req.body;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await User.findOneAndUpdate(
            { _id: req.user.id },
            { password: hashPassword }
        );

        res.status(200).json({ msg: "Password was updated successfully." });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json( user );
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateInfo = async (req, res) => {
    try {
        const { name, email , accessToken} = req.body;

        await User.findOneAndUpdate({ _id: req.user.id }, { name, email , accessToken});

        res.status(200).json({ msg: "Update success." });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.signoutUser = async (req, res) => {
    try {
        res.clearCookie("_apprftoken", { path: "/access" });

        return res.status(200).json({ msg: "Signout success." });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

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