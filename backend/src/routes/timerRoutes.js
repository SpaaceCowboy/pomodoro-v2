const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');

router.get('/config', timerController.getConfig);
router.post('/config', timerController.setConfig);

module.exports = router;