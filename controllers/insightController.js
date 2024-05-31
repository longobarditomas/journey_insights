const { getWeatherData }  = require('../services/weatherService');
const { getNewsData }     = require('../services/newsService');
const { getOpenCageData } = require('../services/openCageService');

const getCountryInsights = async (req, res, next) => {
  try {
    const city = req.query.city || "london";
    const country = req.query.country || "UK";

    const weatherData = await getWeatherData(city, country);
    
    let newsData = {};
    if (weatherData.sys.country)
      newsData = await getNewsData(weatherData.sys.country);

    const openCageData = await getOpenCageData(city, country);

    const data = {
      weather: weatherData,
      news: newsData,
      openCage: openCageData,
    };
    res.status(200).send(data);

  } catch (error) {
    next(error);
  }
};

module.exports = { getCountryInsights };
