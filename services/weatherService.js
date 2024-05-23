const axios = require('axios');
const { openWeatherApiKey } = require('../config/config');

const getWeatherData = async (city, country) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${openWeatherApiKey}`, { timeout: 10000 });
  return response.data;
};

module.exports = { getWeatherData };