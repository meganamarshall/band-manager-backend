/* eslint-disable-next-line*/
const router = require('express').Router();
const Tour = require('../lib/models/Tour');


router
  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(createdTour => res.json(createdTour))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tour.find()
      .then(tour => res.json(tour))
      .catch(next);
  });
 

module.exports = router;
