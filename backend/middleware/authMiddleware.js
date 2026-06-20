const { supabase } = require('../config/supabase')

// protects routes — only logged in users can access
const protect = async (req, res, next) => {
  try {
    // get token from request header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, access denied' })
    }

    // extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1]

    // verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    // attach user to request object
    req.user = data.user

    // move to next function (controller)
    next()

  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
}

module.exports = { protect }