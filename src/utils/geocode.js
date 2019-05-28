const axios = require("axios");

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2Fkam9obiIsImEiOiJjancyOXo0ZTkwdWZzM3lwZ3c4dWhiMXBtIn0.IM2Xvk8MBxvePrhgcCxUzg&limit=1`;
  axios
    .get(geocodeURL)
    .then(response => {
      
      if (response.data.features.length === 0) {
        callback("No such location, try again", undefined);
      } else {
        const { center, place_name } = response.data.features[0]
        const longtitude = center[0];
        const latitude = center[1];
        const location = place_name;
        callback(null, { latitude, longtitude, location });
      }
    })
    .catch(e => {
      callback("Unable to conenct to geocode service!", undefined);
    });
};

module.exports = geocode;
