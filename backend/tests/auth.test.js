const request = require('supertest')
const app = require('../app')

describe('Auth Routes', () => {

  // test register
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@test.com`,
        password: 'Test1234!'
      })

    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBe('User registered successfully')
    expect(res.body.user).toHaveProperty('id')
    expect(res.body.user).toHaveProperty('email')
  })

  // test register with invalid data
  it('should fail register with invalid data', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'V',
        email: 'notanemail',
        password: '123'
      })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Validation failed')
    expect(res.body.errors).toBeDefined()
  })

  // test login
  it('should login successfully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'vaibhavyadav172004@gmail.com',
        password: 'MyBucks@17'
      })

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('Login successful')
    expect(res.body.user).toHaveProperty('id')
  })

  // test login with wrong password
  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'vaibhavyadav172004@gmail.com',
        password: 'wrongpassword'
      })

    expect(res.statusCode).toBe(400)
  })

})