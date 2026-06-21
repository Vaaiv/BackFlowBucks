const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')
const { registerValidation, loginValidation } = require('../middleware/authValidation')
const { validate } = require('../middleware/validateMiddleware')

// register with validation
router.post('/register', registerValidation, validate, register)

// login with validation
router.post('/login', loginValidation, validate, login)

// logout
router.post('/logout', logout)

// protected test route
router.get('/me', protect, async (req, res) => {
  res.json({ message: 'Protected route works!', user: req.user })
})

module.exports = router