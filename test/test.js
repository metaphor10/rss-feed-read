const request = require('supertest');
const chai = require('chai')
const app = require('../app.js');
should = chai.should();


describe('check endpoints endpoint ', function() {
  it('return json response', function() {
    return request(app)
      .get('/api/v1/companies')
      .expect(200)
      .expect('Content-Type',/json/)
      .expect('{"users":[{"name":"Timmy"}]}')
  })

  it('returns json response for post', function () {
    return request(app)
    .post('/api/v1/companies')
    .set("Content-Type", "application/json")
    .send({rss: { joerogan: "http://joeroganexp.joerogan.libsynpro.com/rss" }})
    .expect(200)
    .expect('Content-Type',/json/)
    .expect('{"results":["joerogan"]}')
  })
})