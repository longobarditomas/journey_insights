const axios = require('axios');
const { foursquareApiKey } = require('../config/config');

const getFoursquareMapsService = async (latitude, longitud) => {
    const lat = latitude || "-34.607741";
    const lon = longitud || "-58.438561";
    try {
        const token = foursquareApiKey || "";
        const config = {
            headers : {
                'Authorization' : token,
                'Content-type' : "application/json"
            }
        }
        const url = encodeURI(`https://api.foursquare.com/v3/places/search?session_token=${token}&ll=${lat},${lon}`);
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
};

module.exports = { getFoursquareMapsService };