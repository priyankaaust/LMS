const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Routes', () => {
  it('registers & logs in a user', async () => {
    const username = 'alice';
    const password = 'pass123';

    // Check if user already exists and delete to keep test idempotent
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      await User.deleteOne({ _id: existingUser._id });
    }

    // Register user
    await request(app).post('/api/auth/register').send({
      username,
      password,
    }).expect(201);

    // Login user
    const res = await request(app).post('/api/auth/login').send({
      username,
      password,
    }).expect(200);

    expect(res.body.token).toBeDefined();
  });
});
