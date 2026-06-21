const express = require('express')
const router = express.Router()
const { chat, getChatHistory } = require('../controllers/chatController')
const { protect } = require('../middleware/authMiddleware')

// POST /api/chat — send message get recommendation
router.post('/', protect, chat)

// GET /api/chat/history — get past recommendations
router.get('/history', protect, getChatHistory)

module.exports = router