const express = require('express')
const router = express.Router()
const { addCard, getCards, updateCard, deleteCard } = require('../controllers/cardController')
const { protect } = require('../middleware/authMiddleware')
const { cardValidation } = require('../middleware/cardValidation')
const { validate } = require('../middleware/validateMiddleware')

// all card routes protected + validated
router.post('/', protect, cardValidation, validate, addCard)
router.get('/', protect, getCards)
router.put('/:id', protect, cardValidation, validate, updateCard)
router.delete('/:id', protect, deleteCard)

module.exports = router