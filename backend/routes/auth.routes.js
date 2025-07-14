const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { register, login, profile } = require('../controllers/authController');
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile); // protected route



const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// Admin-only: Get all users
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const users = await User.find().select('-password'); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

/* Helper: only admins allowed */
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  next();
}

/* Delete user */
router.delete('/:id', auth, requireAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

/* Change role */
router.put('/:id/role', auth, requireAdmin, async (req, res) => {
  const { role } = req.body;               // e.g. "admin" or "user"
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password');
  res.json(user);
});

// RESET PASSWORD ROUTE
router.post('/:id/reset-password', auth, requireAdmin, async (req, res) => {
  try {
    const newPass = crypto.randomBytes(4).toString('hex');
    const hashed = await bcrypt.hash(newPass, 10);

    const user = await User.findByIdAndUpdate(req.params.id, { password: hashed });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ newPassword: newPass });
  } catch (err) {
    console.error('❌ Error in reset-password:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin-only: Create user
router.post('/create', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admin can create users' });
  }

  const { username, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;