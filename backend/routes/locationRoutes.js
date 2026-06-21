const express = require('express')
const router = express.Router()
const { handleLocationUpdate } = require('../controllers/locationController')
const { protect } = require('../middleware/authMiddleware')

// POST /api/location — triggered when user enters a store
router.post('/', protect, handleLocationUpdate)

module.exports = router