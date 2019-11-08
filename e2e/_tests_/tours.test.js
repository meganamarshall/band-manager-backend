const request = require('../request');
const db = require('../db');

const tour = {
  title: 'Great NE Tour 2019',
  bandName: 'U Sco',
  launchDate: '12-01-2019',
  stops: []
};

const attendance = {
  attendance: 55
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
  it('can add a stop and get city/state info', () => {
    return postTour(tour).then(tour => {
      return request
        .post(`/api/v1/tours/${tour._id}/stops`)
        .send({
          venueName: 'BlackWaterBar',
          zip: 97219,
          date: new Date()
        })
        .then(({ body }) => {
          expect(body.stops[0]).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              date: expect.any(String)
            },
            `
            Object {
              "_id": Any<String>,
              "address": Object {
                "city": "Portland",
                "state": "OR",
              },
              "attendance": 0,
              "date": Any<String>,
              "venueName": "BlackWaterBar",
              "zip": 97219,
            }
          `
          );
        });
    });
  });
  it('stops can be deleted', () => {
    return postTour(tour).then(postedTour => {
      return request
        .post(`/api/v1/tours/${postedTour._id}/stops`)
        .send({
          venueName: 'HighWaterMark',
          zip: 66207
        })
        .expect(200)
        .then(({ body }) => {
          return request
            .delete(
              `/api/v1/tours/${postedTour._id}/stops/${body.stops[0]._id}`
            )
            .expect(200);
        })
        .then(({ body }) => {
          expect(body.length).toBe(0);
        });
    });
  });
  it('can update the attendance of a stop', () => {
    return postTour(anotherTour).then(postedTour => {
      return request
        .post(`/api/v1/tours/${postedTour._id}/stops`)
        .send({
          venueName: 'OConnors',
          zip: 97209,
          date: new Date()
        })
        .expect(200)
        .then(({ body }) => {
          return request
            .put(
              `/api/v1/tours/${postedTour._id}/stops/${body.stops[0]._id}/attendance`
            )
            .send(attendance)
            .expect(200);
        })
        .then(({ body }) => {
          expect(body[0]).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              date: expect.any(String)
            },
            `
            Object {
              "_id": Any<String>,
              "address": Object {
                "city": "Portland",
                "state": "OR",
              },
              "attendance": 55,
              "date": Any<String>,
              "venueName": "OConnors",
              "zip": 97209,
            }
          `
          );
        });
    });
  });
  it('can get a tour by id', () => {
    return postTour(tour)
      .then(postedTour => {
        return request  
          .get(`/api/v1/tours/${postedTour._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.bandName).toEqual('U Sco');
          });
      });
  });
});
