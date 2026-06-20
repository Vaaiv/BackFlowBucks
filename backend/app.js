const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()

// locks down security headers
app.use(helmet())

// lets frontend talk to backend
app.use(cors())

// max 100 requests per 15 mins — blocks brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, slow down!'
})
app.use(limiter)

// read JSON from request body
app.use(express.json())

// read form data
app.use(express.urlencoded({ extended: true }))

// routes
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

// error handler — always last
const errorMiddleware = require('./middleware/errorMiddleware')
app.use(errorMiddleware)

module.exports = app