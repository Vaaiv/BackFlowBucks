const { getCardRecommendation } = require('../services/geminiService')
const { getUserCards } = require('../services/cardService')

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

    // send to Claude and get recommendation
    const recommendation = await getCardRecommendation(message, userCards)

    res.status(200).json({
      message: 'Success',
      userMessage: message,
      recommendation
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { chat }