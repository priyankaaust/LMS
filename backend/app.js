const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// ✅ Configure CORS properly
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true                // Allow credentials like cookies/headers
}));

app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanroutes');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

// ✅ Static uploads folder
app.use('/uploads', express.static('uploads'));

module.exports = app;
