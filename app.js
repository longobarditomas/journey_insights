const express = require('express')
const app  = express()
const port = 8000
const axios = require('axios')
const rateLimit = require('express-rate-limit');
require('dotenv').config()

app.use(express.static('public'));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  message: "Too many requests from this IP, please try again after a minute"
});

app.use(limiter);

/* OPEN WEATHER */

app.get("/openweather", async (req, res, next) => {
  try{
    const token = process.env.OPEN_WEATHER_API_KEY;
    const lat = req.query.lat || "-34.607741";
    const lon = req.query.lon || "-58.438561";
    const city = req.query.lon || "london";
    const country = req.query.lon || "UK";
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}k&appid=${token}`, {timeout : 10000 });
    //const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`, {timeout : 10000 });
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error.response)
    res.status(error.response.status).send(error.response.data);
  else if (error.request) 
    res.status(504).send("Third Party Service Gateway Timeout");
  else res.status(500).send("SERVER ERROR");
});


/* ROUTER */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})