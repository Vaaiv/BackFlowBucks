const express = require('express')
const router = express.Router()
const { chat } = require('../controllers/chatController')
const { protect } = require('../middleware/authMiddleware')

// POST /api/chat — protected, needs JWT
router.post('/', protect, chat)

module.exports = router