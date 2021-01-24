const request = require('supertest');
const app = require('../app.js');

describe('GET /api/v1/companies', function() {
  it('return json response', function() {
    return request(app)
      .get('/api/v1/companies')
      .expect(200)
      .expect('Content-Type',/json/)
      .expect('{"users":[{"name":"Timmy"}]}')
  })
})