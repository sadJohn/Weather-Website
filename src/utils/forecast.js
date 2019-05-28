const axios = require("axios");

const forecast = (latitude, longtitude, callback) => {
  const darkskyURL = `https://api.darksky.net/forecast/202673701a2a0784c867fb11c0a14bab/${latitude},${longtitude}?units=si`;
  axios
    .get(darkskyURL)
    .then(response => {
      const forecastData = response.data.currently
      const forcastMsg = `${forecastData.summary}, It's currently ${forecastData.temperature} degree out, There is a ${ forecastData.precipProbability }% chance to rain.`
      callback(undefined, forcastMsg);
    })
    .catch(e => {
      callback(e, undefined);
    });
};

module.exports = forecast;
