const { validationResult } = require('express-validator')

// checks validation results and returns errors if any
const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    })
  }

  next()
}

module.exports = { validate }