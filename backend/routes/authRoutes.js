const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/authController')

// register new user
router.post('/register', register)

// login user
router.post('/login', login)

// logout user
router.post('/logout', logout)

module.exports = router