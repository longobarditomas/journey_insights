require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
  newsApiKey: process.env.NEWS_API_KEY,
};