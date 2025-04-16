require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/User'); // Importing the model

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log('📦 Users from DB:', users); // Logging to console
    res.json(users); // Also sending to frontend
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
