const express = require('express');
const { getCountryInsights } = require('../controllers/insightController');
const { getPopularCities }   = require('../controllers/searchController');
const router = express.Router();

router.get('/insights', getCountryInsights);
router.get('/popular-cities', getPopularCities);

module.exports = router;