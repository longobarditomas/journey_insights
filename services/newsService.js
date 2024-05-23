const axios = require('axios');
const { newsApiKey } = require('../config/config');

const getNewsData = async (country) => {
  const config = {
    headers: {
      'Authorization': newsApiKey,
      'Content-type': 'application/json',
    }
  };
  const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=general&pageSize=5&page=2`, config, { timeout: 10000 });
  return response.data;
};

module.exports = { getNewsData };