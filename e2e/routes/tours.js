/* eslint-disable-next-line*/
const router = require('express').Router();
const Tour = require('../../lib/models/Tour');
const getLocation = require('../../lib/middleware/zip-code-api');

router
  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(createdTour => res.json(createdTour))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tour.findById(req.params.id)
      .then(tour => res.json(tour))
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
  })
  .delete('/:id/stops/:stopId', ({ params }, res, next) => {
    Tour.deleteStop(params.id, params.stopId)
      .then(deletedStop => res.json(deletedStop))
      .catch(next);
  })
  .put('/:id/stops/:stopId/attendance', ({ params, body }, res, next) => {
    Tour.updateAttendance(params.id, params.stopId, body.attendance)
      .then(updatedStop => res.json(updatedStop))
      .catch(next);
  })
  .delete('/:id', ({ params }, res, next) => {
    Tour.findByIdAndDelete(params.id)
      .then(deletedTour => res.json(deletedTour))
      .catch(next);
  });
 

module.exports = router;
