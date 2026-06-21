const express = require('express')
const router = express.Router()
const { addCard, getCards, updateCard, deleteCard } = require('../controllers/cardController')
const { protect } = require('../middleware/authMiddleware')

// all card routes are protected — need JWT token
router.post('/', protect, addCard)
router.get('/', protect, getCards)
router.put('/:id', protect, updateCard)
router.delete('/:id', protect, deleteCard)

module.exports = router