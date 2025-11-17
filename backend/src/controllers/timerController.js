let config = { focus: 30 * 60, break: 15 * 60 }; // In seconds

exports.getConfig = (req, res) => {
  res.json(config);
};

exports.setConfig = (req, res) => {
  const { focus, breakTime } = req.body;
  if (focus) config.focus = focus * 60;
  if (breakTime) config.break = breakTime * 60;
  res.json(config);
};