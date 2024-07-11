const axios = require('axios');
const { foursquareApiKey } = require('../config/config');

const getFoursquareMapsService = async (latitude, longitud, category) => {
    const lat = latitude || "-34.607741";
    const lon = longitud || "-58.438561";
    const cat = category || "4d4b7105d754a06374d81259";
    try {
        const token = foursquareApiKey || "";
        const config = {
            headers : {
                'Authorization' : token,
                'Content-type' : "application/json"
            }
        }
        const url = encodeURI(`https://api.foursquare.com/v3/places/search?sort=POPULARITY&session_token=${token}&ll=${lat},${lon}&categories=${cat}`);
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
};

module.exports = { getFoursquareMapsService };