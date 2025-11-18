const User = require('../models/User');

exports.saveSession = async (req, res) => {
  const { userId, session } = req.body; // session: { date, type, minutes, start, end }
  const user = await User.findById(userId);
  user.sessions.push(session);
  await user.save();
  res.json({ msg: 'Session saved' });
};

exports.getSessions = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.json(user.sessions);
};

exports.getWeeklyStats = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklySessions = user.sessions.filter(s => new Date(s.date) >= oneWeekAgo && s.type === 'focus');
  const dailyTotals = {};
  weeklySessions.forEach(s => {
    const day = new Date(s.date).toISOString().split('T')[0];
    dailyTotals[day] = (dailyTotals[day] || 0) + s.minutes;
  });
  res.json(dailyTotals); // { '2025-11-17': 120, '2025-11-18': 90, ... }
};