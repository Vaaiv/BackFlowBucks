const { prisma } = require('../config/db')
const redis = require('../config/redis')

// get all cards for a user — with Redis cache
const getUserCards = async (userId) => {
  try {
    // check cache first
    const cachedCards = await redis.get(`cards:${userId}`)

    if (cachedCards) {
      console.log('Cards from cache ✅')
      return JSON.parse(cachedCards)
    }

    // not in cache → get from PostgreSQL
    const cards = await prisma.card.findMany({
      where: { userId }
    })

    // save to cache for 1 hour
    await redis.set(`cards:${userId}`, JSON.stringify(cards), 'EX', 3600)
    console.log('Cards from DB → cached ✅')

    return cards

  } catch (error) {
    // if Redis fails → fallback to DB
    const cards = await prisma.card.findMany({
      where: { userId }
    })
    return cards
  }
}

// find best card for a category
const getBestCard = (cards, category) => {
  const filtered = cards.filter(card => 
    card.categories[category] !== undefined
  )

  if (filtered.length === 0) {
    return cards.reduce((best, current) => {
      const bestRate = best.categories['everything'] || 0
      const currentRate = current.categories['everything'] || 0
      return currentRate > bestRate ? current : best
    })
  }

  return filtered.reduce((best, current) => 
    current.categories[category] > best.categories[category] 
      ? current 
      : best
  )
}

// clear cache when cards are updated
const clearCardsCache = async (userId) => {
  await redis.del(`cards:${userId}`)
  console.log('Cards cache cleared ✅')
}

module.exports = { getUserCards, getBestCard, clearCardsCache }