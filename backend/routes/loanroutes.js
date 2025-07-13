// routes/loanroutes.js
const express = require('express');
const router = express.Router();
const LendingTransaction = require('../models/LendingTransaction');
const auth = require('../middleware/authMiddleware');

// Admin-only: Get all loans
// router.get('/', auth, async (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Access denied' });
//   }

//   const loans = await LendingTransaction.find()
//     .populate('book')
//     .populate('user')
//     .sort({ issueDate: -1 });

//   res.json(loans);
// });

module.exports = router;

/* Issue a book */
router.post('/borrow', auth, async (req, res) => {
  try {
    const userId = req.user.id; // use from decoded token
    const { bookId, dueDate } = req.body;
    const txn = await LendingTransaction.issueBook(userId, bookId, new Date(dueDate));
    res.status(201).json(txn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


/* Return a book */
router.put('/return/:id', async (req, res) => {
  try {
    const txn = await LendingTransaction.findById(req.params.id);
    if (!txn) return res.status(404).json({ error: 'Transaction not found' });
    const updated = await txn.returnBook();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Logged-in user (member) loan history
router.get('/my', auth, async (req, res) => {
  const loans = await LendingTransaction.find({ user: req.user.id })
    .populate('book')
    .sort({ issueDate: -1 });

  res.json(loans);
});

