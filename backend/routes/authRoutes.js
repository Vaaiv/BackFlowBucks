const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

// register new user
router.post('/register', register)

// login user
router.post('/login', login)

// logout user
router.post('/logout', logout)

// test protected route
router.get('/me', protect, async (req, res) => {
  res.json({ message: 'Protected route works!', user: req.user })
})

module.exports = router