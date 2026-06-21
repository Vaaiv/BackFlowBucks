const { body } = require('express-validator')

const cardValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Card name is required')
    .isLength({ min: 2 }).withMessage('Card name must be at least 2 characters'),

  body('bank')
    .trim()
    .notEmpty().withMessage('Bank name is required'),

  body('categories')
    .notEmpty().withMessage('Categories are required')
    .isObject().withMessage('Categories must be an object')
    .custom((value) => {
      // check all values are numbers between 0-100
      for (const [key, val] of Object.entries(value)) {
        if (typeof val !== 'number') {
          throw new Error(`Cashback for ${key} must be a number`)
        }
        if (val < 0 || val > 100) {
          throw new Error(`Cashback for ${key} must be between 0 and 100`)
        }
      }
      return true
    }),

  body('rewards')
    .trim()
    .notEmpty().withMessage('Rewards type is required')
    .isIn(['cashback', 'points', 'miles']).withMessage('Rewards must be cashback, points or miles')
]

module.exports = { cardValidation }