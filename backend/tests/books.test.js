const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Book = require('../models/Book');
const bcrypt = require('bcrypt');

const getAdminToken = async () => {
  const username = 'admin';
  const password = 'admin123';

  let existingAdmin = await User.findOne({ username });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(password, 10);
    existingAdmin = await User.create({ username, password: hashed, role: 'admin' });
  }

  const res = await request(app).post('/api/auth/login').send({ username, password });
  return res.body.token;
};

describe('Book Routes', () => {
  it('creates & lists the test book', async () => {
    const token = await getAdminToken();

    // Check if book exists
    const existingBook = await Book.findOne({ bookId: 'B1' });

    if (!existingBook) {
      // Create book only if not exists
      const resCreate = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${token}`)
        .field('bookId', 'B1')
        .field('title', '1984')
        .field('isbn', '9780451524935')
        .field('author', 'George Orwell')
        .field('genre', 'Dystopia')
        .field('totalCopies', 2)
        .expect(201);

      expect(resCreate.body.title).toBe('1984');
      expect(resCreate.body.availableCopies).toBe(2);
    } else {
      console.log('Book already exists, skipping creation');
    }

    // Verify the book is in the list
    const resList = await request(app)
      .get('/api/books')
      .expect(200);

    const found = resList.body.find(book => book.bookId === 'B1');
    expect(found).toBeDefined();
    expect(found.title).toBe('1984');
  });
});
