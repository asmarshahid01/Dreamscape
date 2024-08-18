const express = require('express');
const session=require("express-session");

const {
    login,
    signup,
    comment,
    notification
} = require('../controllers/userController');
const { checkAuth } = require('../middlewares/checkAuth');

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/comment', checkAuth, comment)
//router.get('/logout', checkAuth, logout)
router.get('/notification', checkAuth, notification)

module.exports = router