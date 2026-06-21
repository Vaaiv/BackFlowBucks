const { supabase } = require('../config/supabase')
const { prisma } = require('../config/db')

// register new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // create user in Supabase auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    // save extra user info in PostgreSQL
    const user = await prisma.user.create({
      data: {
        id: data.user.id,
        name,
        email,
      }
    })

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // store token in httpOnly cookie
    res.cookie('access_token', data.session.access_token, {
      httpOnly: true,   // JS cannot access
      secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      sameSite: 'strict', // prevents CSRF
      maxAge: 60 * 60 * 1000 // 1 hour
    })

    res.cookie('refresh_token', data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: data.user.id,
        email: data.user.email,
      }
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// logout user
const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    res.status(200).json({ message: 'Logged out successfully' })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { register, login, logout }