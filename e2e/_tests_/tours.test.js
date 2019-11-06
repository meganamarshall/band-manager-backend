jest.mock('../../lib/middleware/zip-code-api.js');
const request = require('../request');
const db = require('../db');
// const { ObjectId } = require('mongoose').Types;
// const getCity = require('../../lib/middleware/zip-code-api');

const tour = {
  title: 'Great NE Tour 2019',
  bandName: 'U Sco',
  launchDate: '12-01-2019',
  stops: []
};

const anotherTour = {
  title: 'SW Tour 2020',
  bandName: 'Teton',
  launchDate: '12-31-2019',
  stops: []
};

function postTour(tour) {
  return request
    .post('/api/v1/tours')
    .send(tour)
    .expect(200)
    .then(({ body }) => body);
}

describe('tour api routes', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  it('posts a tour', () => {
    return request
      .post('/api/v1/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            launchDate: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "bandName": "U Sco",
            "launchDate": Any<String>,
            "stops": Array [],
            "title": "Great NE Tour 2019",
          }
        `
        );
      });
  });
  it('gets all tours', () => {
    return Promise.all([postTour(tour), postTour(anotherTour)])
      .then(() => {
        return request.get('/api/v1/tours').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[1]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            launchDate: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "bandName": "Teton",
            "launchDate": Any<String>,
            "stops": Array [],
            "title": "SW Tour 2020",
          }
        `
        );
      });
  });
});
