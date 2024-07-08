require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
  newsApiKey: process.env.NEWS_API_KEY,
  openCageDataApiKey: process.env.OPEN_CAGE_DATA_API_KEY,
  googleApiKey: process.env.GOOGLE_API_KEY,
  foursquareApiKey: process.env.FOURSQUARE_API_KEY,
};