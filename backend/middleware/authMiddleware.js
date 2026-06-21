const { supabase } = require('../config/supabase')

const protect = async (req, res, next) => {
  try {
    // check cookie first, then Authorization header
    const token = req.cookies?.access_token || 
                  req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' })
    }

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    req.user = data.user
    next()

  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
}

module.exports = { protect }