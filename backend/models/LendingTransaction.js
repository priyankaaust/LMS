/* models/LendingTransaction.js ------------------------------------------- */
const mongoose = require('mongoose');
const Decimal = mongoose.Schema.Types.Decimal128;

/* ─────────────────────────  Schema Definition  ────────────────────────── */
const lendingTransactionSchema = new mongoose.Schema(
  {
    transactionId:   { type: String, required: true, unique: true },
    book:            { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user:            { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate:       { type: Date, default: Date.now },
    dueDate:         { type: Date, required: true },
    returnDate:      { type: Date },
    fineAmount:      { type: Decimal, default: 0.0 }
  },
  { timestamps: true }
);

/* ───────────────────────  Instance Helper Methods  ────────────────────── */
/**
 * Mark the book as issued (called internally by static issueBook).
 */
// inside issueBook method

const Book = require('./Book'); // Import Book model

lendingTransactionSchema.methods.issueBook = async function () {
    const book = await Book.findById(this.book);
    if (book.availableCopies <= 0) throw new Error('No copies available');
  
    book.availableCopies -= 1;
    await book.save();
    return this.save();
  };

/**
 * Mark the book as returned, compute fine, and save.
 * @returns {Promise<LendingTransaction>}
 */
// inside returnBook method
lendingTransactionSchema.methods.returnBook = async function () {
    if (this.returnDate) throw new Error('Already returned');
  
    const book = await Book.findById(this.book);
    book.availableCopies += 1;
    await book.save();
  
    this.returnDate = new Date();
    this.fineAmount = this.calculateFine();
    return this.save();
  };

/**
 * Calculate fine based on days overdue (≥1 day late  =>  $1 per day).
 * Modify logic to suit your policy.
 * @returns {mongoose.Types.Decimal128}
 */
lendingTransactionSchema.methods.calculateFine = function () {
  const today = this.returnDate || new Date();
  const lateMs = today - this.dueDate;
  const lateDays = Math.ceil(lateMs / (1000 * 60 * 60 * 24));

  const fine = lateDays > 0 ? lateDays * 1 : 0; // $1 per late day
  return mongoose.Types.Decimal128.fromString(fine.toFixed(2));
};

/* ───────────────────────  Static Convenience APIs  ────────────────────── */
/**
 * Quickly issue a book.
 * @param {ObjectId} userId
 * @param {ObjectId} bookId
 * @param {Date}     dueDate
 */
lendingTransactionSchema.statics.issueBook = function (userId, bookId, dueDate) {
  const txn = new this({
    transactionId: mongoose.Types.ObjectId().toString(),
    user: userId,
    book: bookId,
    dueDate
  });
  return txn.issueBook();
};

/* ───────────────────────────  Model Export  ───────────────────────────── */
const LendingTransaction = mongoose.model('LendingTransaction', lendingTransactionSchema);
module.exports = LendingTransaction;
