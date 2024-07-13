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
  
  const coords = weatherData.coord;
  let newsData = {};
  if (weatherData.sys.country)
    newsData = await getNewsData(weatherData.sys.country);

  const openCageData = await getOpenCageData(city, country);
  
  const weather  = parseWeatherData(weatherData);   
  const currency = parseCurrencyData(openCageData.results[0].annotations.currency); 
  
  const restaurantsData = await getFoursquareMapsService(coords.lat, coords.lon);
  const restaurants     = restaurantsData ? parseFoursquareData(restaurantsData) : []; 
  
  const museumsData = await getFoursquareMapsService(coords.lat, coords.lon, "4bf58dd8d48988d181941735");
  const museums     = museumsData ? parseFoursquareData(museumsData) : []; 
  
  const attractionsData = await getFoursquareMapsService(coords.lat, coords.lon, "5109983191d435c0d71c2bb1");
  const attractions     = attractionsData ? parseFoursquareData(attractionsData) : []; 

  const countryInsights = {
    city : city,
    country : country,
    flag : openCageData.results[0].annotations.flag,
    coordinates : coords,
    weather : weather,
    currency : currency,
    news : newsData.articles,
    restaurants : restaurants,
    museums : museums,
    attractions : attractions,
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

function parseFoursquareData(fsData) {
  return fsData.sort((a,b) => a.distance - b.distance).map(data => {
    return {
      name: data.name,
      location: data.location,
      geocodes: data.geocodes.main,
      distance: data.distance,
      categories: data.categories.map(categ => categ.name),
    };
  })
}

module.exports = { getCountryInsights };
