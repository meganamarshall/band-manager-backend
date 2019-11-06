require('dotenv').config();
const getCity = require('../services/get-city');

const getLocation = () => (req, res, next) => {
  const { zip } = req.body;
  if(!zip) {
    return next({
      statusCode: 400,
      error: 'zip code must be supplied'
    });
  }
  getCity(zip)
    .then(res => {
      const city = res.city;
      const state = res.state;
      if(!city) {
        throw {
          statusCode: 400,
          error: 'please enter valid zip code'
        };
      }
      req.body.address = { city, state };
      next();
    })
    .catch(next);
};

module.exports = getLocation;
