const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  isbn: { type: String },
  author: { type: String },
  genre: { type: String },
  coverImageUrl: { type: String },
  digitalFileUrl: { type: String },
  totalCopies:   { type: Number, default: 1 },
  availableCopies: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
