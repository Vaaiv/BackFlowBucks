const { prisma } = require('../config/db')

// get all cards for a user
const getUserCards = async (userId) => {
  const cards = await prisma.card.findMany({
    where: { userId }
  })
  return cards
}

// find best card for a category
const getBestCard = (cards, category) => {
  const filtered = cards.filter(card => 
    card.categories[category] !== undefined
  )

  if (filtered.length === 0) {
    // no specific card for category
    // return card with highest "everything" rate
    return cards.reduce((best, current) => {
      const bestRate = best.categories['everything'] || 0
      const currentRate = current.categories['everything'] || 0
      return currentRate > bestRate ? current : best
    })
  }

  // return card with highest cashback for category
  return filtered.reduce((best, current) => 
    current.categories[category] > best.categories[category] 
      ? current 
      : best
  )
}

module.exports = { getUserCards, getBestCard }