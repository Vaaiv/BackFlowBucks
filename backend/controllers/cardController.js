const { prisma } = require('../config/db')
const { clearCardsCache } = require('../services/cardService')

// add a new card
const addCard = async (req, res) => {
  try {
    const { name, bank, categories, rewards } = req.body

    const card = await prisma.card.create({
      data: {
        userId: req.user.id,
        name,
        bank,
        categories,
        rewards
      }
    })

    // clear cache so next request gets fresh data
    await clearCardsCache(req.user.id)

    res.status(201).json({ message: 'Card added successfully', card })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// get all cards for logged in user
const getCards = async (req, res) => {
  try {
    const cards = await prisma.card.findMany({
      where: { userId: req.user.id }
    })

    res.status(200).json({ cards })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// update a card
const updateCard = async (req, res) => {
  try {
    const { name, bank, categories, rewards } = req.body

    const card = await prisma.card.update({
      where: { id: req.params.id },
      data: { name, bank, categories, rewards }
    })

    // clear cache
    await clearCardsCache(req.user.id)

    res.status(200).json({ message: 'Card updated', card })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// delete a card
const deleteCard = async (req, res) => {
  try {
    await prisma.card.delete({
      where: { id: req.params.id }
    })

    // clear cache
    await clearCardsCache(req.user.id)

    res.status(200).json({ message: 'Card deleted' })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { addCard, getCards, updateCard, deleteCard }