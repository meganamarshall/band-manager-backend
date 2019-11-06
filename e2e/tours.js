/* eslint-disable-next-line*/
const router = require('express').Router();
const Tour = require('../lib/models/Tour');
const getLocation = require('../lib/middleware/zip-code-api');

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
  })
  .post('/:id/stops', getLocation(), ({ params, body }, res, next) => {
    Tour.addStop(params.id, body)
      .then(addedStop => res.json(addedStop))
      .catch(next);
  });
 

module.exports = router;
