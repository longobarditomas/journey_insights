const axios = require('axios');
const { openCageDataApiKey } = require('../config/config');

const getOpenCageData = async (city, country) => {
  const lat = 52.3877830; 
  const lon = 9.7334394; 
  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&appid=${openCageDataApiKey}`, { timeout: 10000 });
  return response.data;
};

module.exports = { getOpenCageData };