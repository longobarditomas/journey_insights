const express = require('express');
const { getCountryInsights } = require('../controllers/insightController');
const router = express.Router();

router.get('/data', getCountryInsights);

module.exports = router;