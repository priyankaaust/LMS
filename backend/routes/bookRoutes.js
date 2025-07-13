const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const upload = require('../middleware/upload');

// Remove or comment out this route — conflicts with below
// router.post('/', async (req, res) => {
//   try {
//     const book = new Book(req.body);
//     await book.save();
//     res.status(201).json(book);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Create Book with file uploads
router.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'digitalFile', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { bookId, title, isbn, author, genre, totalCopies } = req.body;

      const coverImageUrl = req.files.coverImage ? `/uploads/${req.files.coverImage[0].filename}` : '';
      const digitalFileUrl = req.files.digitalFile ? `/uploads/${req.files.digitalFile[0].filename}` : '';

      const book = new Book({
        bookId,
        title,
        isbn,
        author,
        genre,
        coverImageUrl,
        digitalFileUrl,
        totalCopies: parseInt(totalCopies),
        availableCopies: parseInt(totalCopies) // set availableCopies = totalCopies initially
      });

      await book.save();
      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);



// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// Update book by ID with uploads
router.put(
  '/:id',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'digitalFile', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { bookId, title, isbn, author, genre } = req.body;

      const updateData = { bookId, title, isbn, author, genre };

      if (req.files.coverImage) {
        updateData.coverImageUrl = `/uploads/${req.files.coverImage[0].filename}`;
      }
      if (req.files.digitalFile) {
        updateData.digitalFileUrl = `/uploads/${req.files.digitalFile[0].filename}`;
      }

      const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!book) return res.status(404).json({ error: 'Book not found' });

      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
