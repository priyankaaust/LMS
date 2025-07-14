const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');

const User = require('./models/User');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/auth.routes'); // login, register
const loanRoutes = require('./routes/loanroutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/auth', userRoutes); // ✅ Fixed mount point here
app.use('/api/users', userRoutes);

// Create admin user if not exists
async function createAdminUser() {
  const existingAdmin = await User.findOne({ username: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('✅ Admin user created: admin / admin123');
  } else {
    console.log('ℹ️ Admin user already exists');
  }
}

// Mongo connection + server start
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await createAdminUser();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Mongo connection failed:', err));


