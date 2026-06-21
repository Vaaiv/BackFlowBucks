const admin = require('firebase-admin/app')
const { getMessaging } = require('firebase-admin/messaging')
const serviceAccount = require('./firebase-service-account.json')

const { initializeApp, cert } = admin

initializeApp({
  credential: cert(serviceAccount)
})

module.exports = { getMessaging }