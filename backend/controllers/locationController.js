const { getStoreFromLocation, getStoreCategory } = require('../services/locationService')
const { getUserCards, getBestCard } = require('../services/cardService')
const { sendCardRecommendation } = require('../services/notificationService')

// triggered when user enters a store
const handleLocationUpdate = async (req, res) => {
  try {
    const { latitude, longitude, fcmToken } = req.body

    if (!latitude || !longitude || !fcmToken) {
      return res.status(400).json({ 
        message: 'latitude, longitude and fcmToken are required' 
      })
    }

    // find store from GPS coordinates
    const store = await getStoreFromLocation(latitude, longitude)

    if (!store) {
      return res.status(404).json({ message: 'No store found at this location' })
    }

    // get store category
    const category = getStoreCategory(store.type ? [store.type] : [])

    // get user's cards
    const userCards = await getUserCards(req.user.id)

    if (userCards.length === 0) {
      return res.status(400).json({ message: 'No cards found' })
    }

    // find best card for this store
    const bestCard = getBestCard(userCards, category)
    const cashback = bestCard.categories[category] || 
                     bestCard.categories['everything'] || 0

    // send push notification
    await sendCardRecommendation(
      fcmToken,
      store.name,
      bestCard.name,
      cashback
    )

    res.status(200).json({
      message: 'Notification sent',
      store: store.name,
      category,
      recommendedCard: bestCard.name,
      cashback: `${cashback}%`
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { handleLocationUpdate }