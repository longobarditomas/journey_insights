const axios = require('axios');
const { openCageDataApiKey } = require('../config/config');

const getOpenCageData = async (city, country) => {
  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city},${country}&key=${openCageDataApiKey}`, { timeout: 10000 });
  return response.data;
};

module.exports = { getOpenCageData };