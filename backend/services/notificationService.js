const { getMessaging } = require('../config/firebase')

const sendNotification = async (fcmToken, title, body) => {
  try {
    const message = {
      notification: { title, body },
      token: fcmToken
    }

    const response = await getMessaging().send(message)
    console.log('Notification sent ✅', response)
    return response

  } catch (error) {
    throw new Error(`FCM error: ${error.message}`)
  }
}

const sendCardRecommendation = async (fcmToken, storeName, cardName, cashback) => {
  const title = `You're at ${storeName}! 🎯`
  const body = `Use ${cardName} — ${cashback}% cashback here`
  return sendNotification(fcmToken, title, body)
}

module.exports = { sendNotification, sendCardRecommendation }