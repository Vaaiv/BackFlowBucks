// catches all errors thrown in controllers
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    message: err.message || 'Server Error',
  })
}

module.exports = errorMiddleware