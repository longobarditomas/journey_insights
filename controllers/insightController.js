const { getWeatherData }  = require('../services/weatherService');
const { getNewsData }     = require('../services/newsService');
const { getOpenCageData } = require('../services/openCageService');
const { getFoursquareMapsService } = require('../services/foursquareService');

const getCountryInsights = async (req, res, next) => {
  try {
    const city = req.query.city || "london";
    const country = req.query.country || "UK";

    const countryInsights = await getInsights(city, country);
    res.status(200).send(countryInsights);
  } catch (error) {
    next(error);
  }
};

async function getInsights(city, country) {
  const weatherData = await getWeatherData(city, country);
    
  let newsData = {};
  if (weatherData.sys.country)
    newsData = await getNewsData(weatherData.sys.country);

  const openCageData = await getOpenCageData(city, country);
  
  const weather  = parseWeatherData(weatherData);   
  const currency = parseCurrencyData(openCageData.results[0].annotations.currency); 
  
  const foursquareData = await getFoursquareMapsService(weatherData.coord.lat, weatherData.coord.lon);
  const restaurantes = parseRestauranteData(foursquareData.results); 

  const countryInsights = {
    city : city,
    country : country,
    flag : openCageData.results[0].annotations.flag,
    coordinates : weatherData.coord,
    weather : weather,
    currency : currency,
    news : newsData.articles,
    restaurantes : restaurantes,
  }
  return countryInsights;
}

function parseWeatherData(weatherData) {
  return {
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
  }
}

function parseCurrencyData(currencyData) {
  return {
    name : currencyData.name,
    iso_code : currencyData.iso_code,
    iso_numeric : currencyData.iso_numeric,
    symbol : currencyData.symbol,
  }
}

function parseRestauranteData(restauranteData) {
  return restauranteData.map(four => {
    return {
      name: four.name,
      location: four.location,
      geocodes: four.geocodes.main,
      categories: four.categories.map(categ => categ.name),
    };
  })
}

module.exports = { getCountryInsights };
