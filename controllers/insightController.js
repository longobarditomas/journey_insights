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

    const currency = openCageData.results[0].annotations.currency; 

    const csountryInsights = {
      city : city,
      country : country,
      flag : openCageData.results[0].annotations.flag,
      coordinates : weatherData.coord,
      weather : {
        main : weatherData.weather[0].main,
        description : weatherData.weather[0].description,
        icon : weatherData.weather[0].icons,
        temp : {
          temp : weatherData.main.temp,
          feels_like : weatherData.main.feels_like,
          temp_min : weatherData.main.temp_min,
          temp_max : weatherData.main.temp_max,
        },
        wind : weatherData.wind,
      },
      currency : {
        name : currency.name,
        iso_code : currency.iso_code,
        iso_numeric : currency.iso_numeric,
        symbol : currency.symbol,
      },
      news : newsData.articles,
    }

    /* const data = {
      data: csountryInsights,
      weather: weatherData,
      news: newsData,
      openCage: openCageData,
    }; */
    res.status(200).send(csountryInsights);

  } catch (error) {
    next(error);
  }
};

module.exports = { getCountryInsights };
