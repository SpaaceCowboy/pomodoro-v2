const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const timerRoutes = require('./routes/timerRoutes');
const authRoutes = require('./routes/authRoutes'); // New

dotenv.config();
const app = express();
app.use(cors({ origin: [
  'http://localhost:3000',
  'https://pomodoro-v2-eta.vercel.app/'
]
  , credentials: true })); // Allow frontend
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/focusdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/timer', timerRoutes);
app.use('/api/auth', authRoutes); // New

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));