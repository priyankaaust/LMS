const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Book = require('../models/Book');
const bcrypt = require('bcrypt');

let memberToken, bookId;

beforeEach(async () => {
  // 1️⃣ Ensure test user exists
  const username = 'bob';
  const password = 'pwd';

  let member = await User.findOne({ username });
  if (!member) {
    const hashed = await bcrypt.hash(password, 10);
    member = await User.create({ username, password: hashed, role: 'user' });
  }

  // 2️⃣ Login for token
  const loginRes = await request(app).post('/api/auth/login').send({ username, password });
  memberToken = loginRes.body.token;

  // 3️⃣ Ensure test book exists
  let book = await Book.findOne({ bookId: 'B2' });
  if (!book) {
    book = await Book.create({ bookId: 'B2', title: 'Test', totalCopies: 1, availableCopies: 1 });
  }
  bookId = book._id.toString();                    // ✅ use plain string
});

describe('Borrow & Return', () => {
  it('allows member to borrow and return', async () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    // 4️⃣ Borrow book
    const borrow = await request(app)
      .post('/api/loans/borrow')
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        bookId,                                   // ✅ string
        dueDate: dueDate.toISOString(),           // ✅ key name & ISO string
      })
      .expect(201);

    const loanId = borrow.body._id;

    // 5️⃣ Return book
    await request(app)
      .put(`/api/loans/return/${loanId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(200);
  });
});
