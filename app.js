require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const booksRouter = require('./routes/books.js');
const memberRoutes = require('./routes/member.js');
const loanRoutes = require('./routes/loan.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/books', booksRouter);
app.use('/api/members', memberRoutes);
app.use('/api/loans', loanRoutes);

// Export the app for Vercel
module.exports = app;

// Start server only if not in serverless environment
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}