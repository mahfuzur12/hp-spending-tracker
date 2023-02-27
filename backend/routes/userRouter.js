const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middleware/auth')

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
router.post("/reset_pass", auth, userController.resetPassword);
router.get("/user", auth, userController.getInfo);
router.patch("/update_user", auth, userController.updateInfo);
router.get("/signout", userController.signoutUser);

router.route('/')
    .post(createUser)
    .get(getUsers);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;