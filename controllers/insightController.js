const { getWeatherData } = require('../services/weatherService');
const { getNewsData } = require('../services/newsService');

const getCountryInsights = async (req, res, next) => {
  try {
    const city = req.query.city || "london";
    const country = req.query.country || "UK";

    const weatherData = await getWeatherData(city, country);
    let newsData = {};
    if (weatherData.sys.country)
      newsData = await getNewsData(weatherData.sys.country);

    const data = {
      weather: weatherData,
      news: newsData,
    };
    res.status(200).send(data);

  } catch (error) {
    next(error);
  }
};

module.exports = { getCountryInsights };
