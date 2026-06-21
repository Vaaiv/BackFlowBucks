const request = require('supertest')
const app = require('../app')

describe('Card Routes', () => {

  it('should fail to add card without auth', async () => {
    const res = await request(app)
      .post('/api/cards')
      .send({
        name: 'Chase Freedom',
        bank: 'Chase',
        categories: { groceries: 5 },
        rewards: 'cashback'
      })

    expect(res.statusCode).toBe(401)
  })

  it('should fail with invalid card data', async () => {
    // login first to get cookie
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'vaibhavyadav172004@gmail.com',
        password: 'MyBucks@17'
      })

    const cookies = loginRes.headers['set-cookie']

    const res = await request(app)
      .post('/api/cards')
      .set('Cookie', cookies)
      .send({
        name: 'C',
        bank: '',
        categories: { groceries: 150 },
        rewards: 'bitcoin'
      })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Validation failed')
  })

})