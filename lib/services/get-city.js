
const request = require('superagent');

const BASE_URL = 'https://www.zipcodeapi.com/rest';
const API_KEY = process.env.API_KEY;

module.exports = function getCity(zip) {
  const URL = `${BASE_URL}/${API_KEY}/info.json/${zip}/degrees`;
  return request
    .get(URL)
    .then(res => res.body);
};
