const getCity = require('../services/get-city');

module.exports = () => (req, res, next) => {
  const { zip } = req.body;
  if(!zip) {
    return next({
      statusCode: 400,
      error: 'zip code must be supplied'
    });
  }
  getCity(zip)
    .then(({ city, state }) => {
      if(!city) {
        throw {
          statusCode: 400,
          error: 'please enter valid zip code'
        };
      }
      req.body.city = city;
      req.body.state = state;
      next();
    })
    .catch(next);
}
