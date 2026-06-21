const { getCardRecommendation } = require('../services/geminiService')
const { getUserCards } = require('../services/cardService')
const { prisma } = require('../config/db')

// handle chat message and return card recommendation
const chat = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    // get user's cards from DB
    const userCards = await getUserCards(req.user.id)

    if (userCards.length === 0) {
      return res.status(400).json({ 
        message: 'No cards found. Please add your cards first.' 
      })
    }

    // send to Gemini and get recommendation
    const recommendation = await getCardRecommendation(message, userCards)

    // save chat history to DB
    await prisma.chat.create({
      data: {
        userId: req.user.id,
        userMessage: message,
        recommendation
      }
    })

    res.status(200).json({
      message: 'Success',
      userMessage: message,
      recommendation
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get chat history for logged in user
const getChatHistory = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({ chats })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { chat, getChatHistory }