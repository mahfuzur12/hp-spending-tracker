const express = require('express');
const router = express.Router();
const { createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    signupUser,
    loginUser
} = require('../controllers/userController');

router.route('/')
    .post(createUser)
    .get(getUsers);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

router.post('/login', loginUser)

router.post('/signup', signupUser)

module.exports = router;