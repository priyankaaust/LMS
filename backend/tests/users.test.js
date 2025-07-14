const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// 🔑 Helper: Get admin token (create admin if not exists)
const getAdminToken = async () => {
  const username = 'admin';
  const password = 'admin123';

  let existingAdmin = await User.findOne({ username });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(password, 10);
    existingAdmin = await User.create({ username, password: hashed, role: 'admin' });
  }

  const res = await request(app).post('/api/auth/login').send({
    username,
    password,
  });

  return res.body.token;
};

describe('Admin User Actions', () => {
  it('creates and lists users', async () => {
    const token = await getAdminToken();

    // Check if newUser already exists
    let user = await User.findOne({ username: 'newUser' });
    if (user) {
      // If exists, delete first so test is idempotent
      await User.deleteOne({ _id: user._id });
    }

    // Create new user
    const res_1 = await request(app)
      .post('/api/users/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'newUser', password: 'abc123', role: 'user' })
      .expect(201);

    expect(res_1.body.message).toBe('User created successfully');

    // Verify new user exists in list
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const userExists = res.body.some((u) => u.username === 'newUser');
    expect(userExists).toBe(true);
  });
});
