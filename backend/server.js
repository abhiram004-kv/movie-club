
require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://movie-club-ten.vercel.app'
  ]
}));

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Error:', err.message));

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

// Movie routes
const movieRoutes = require('./routes/movieRoutes');
app.use('/movies', movieRoutes);

// Suggestion routes
const suggestionRoutes = require('./routes/suggestionRoutes');
app.use('/suggestions', suggestionRoutes);

// Test backend
app.get('/', (req, res) => {
  res.send('Movie Club Backend Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
