const request = require('supertest')
const app = require('../app')

describe('Chat Routes', () => {

  it('should fail to chat without auth', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'buying groceries' })

    expect(res.statusCode).toBe(401)
  })

  it('should fail with no message', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'vaibhavyadav172004@gmail.com',
        password: 'MyBucks@17'
      })

    const cookies = loginRes.headers['set-cookie']

    const res = await request(app)
      .post('/api/chat')
      .set('Cookie', cookies)
      .send({})

    expect(res.statusCode).toBe(400)
  })

})