const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { register, login, profile } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile); // protected route

module.exports = router;

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