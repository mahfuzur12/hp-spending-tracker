const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireAuth')
const validator = require('validator')
const userController = require("../controllers/userController");

const { createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    
} = require('../controllers/userController');

router.post("/signup", userController.signupUser);
router.post("/activation", userController.activateUser);
router.post("/signin", userController.signinUser);
router.post("/access", userController.access);
router.post("/forgot_pass", userController.forgotPassword);

router.route('/')
    .post(createUser)
    .get(getUsers);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;