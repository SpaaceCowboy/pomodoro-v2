const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const timerController = require('../controllers/timerController');

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

router.post('/session', authMiddleware, timerController.saveSession);
router.get('/sessions/:userId', authMiddleware, timerController.getSessions);
router.get('/weekly/:userId', authMiddleware, timerController.getWeeklyStats);

module.exports = router;