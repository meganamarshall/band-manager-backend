const request = require('../request');

describe('core app api', () => {
  it('is alive', () => {
    return request
      .get('/hello')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('world');
      });
  });

  it('returns application/json 404 on bad api path', () => {
    return request
      .post('/api/bad-path')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toMatch(/not found/i);
      });
  });
});
