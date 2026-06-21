const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const getCardRecommendation = async (userMessage, userCards) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // format user cards for Gemini
    const cardsInfo = userCards.map(card => `
      Card: ${card.name}
      Bank: ${card.bank}
      Rewards type: ${card.rewards}
      Cashback rates: ${JSON.stringify(card.categories)}
    `).join('\n')

    const prompt = `You are a smart credit card advisor for BackFlowBucks app.

The user has these credit cards:
${cardsInfo}

User's question: ${userMessage}

Based on the user's cards and their question, recommend the best card to use.
Include:
1. Which card to use and why
2. Exact cashback/rewards they will earn
3. Any tips to maximize rewards

Be concise and friendly. Focus on the specific purchase they mentioned.`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    return response

  } catch (error) {
    throw new Error(`Gemini API error: ${error.message}`)
  }
}

module.exports = { getCardRecommendation }