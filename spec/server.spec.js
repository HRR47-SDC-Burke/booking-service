jest.mock('newrelic', () => jest.fn());
const app = require('./../server/app.js').app;
const request = require('supertest');
const assert = require('assert');
let testedListingId;

describe('POST /api/booking', function() {
  it('Returns the posted listing', function(done) {
    request(app)
      .post('/api/booking')
      .send({
        ownerName: 'testOwner',
        rating: 4.50,
        numRatings: 2,
        pricePerNight: 450,
        discountAmount: 10
      })
      .expect(201)
      .then(res => {
        testedListingId = res.body.listing[0].id;
        assert(typeof testedListingId, 'number');
        assert(res.body.listing[0].ownerName, 'testOwner');
        assert(res.body.listing[0].hasOwnProperty('rating'), true);
        assert(res.body.listing[0].hasOwnProperty('numRatings'), true);
        assert(res.body.listing[0].hasOwnProperty('pricePerNight'), true);
        assert(res.body.listing[0].hasOwnProperty('discountAmount'), true);
      })
      .then(done);
  });
});

describe('GET /api/booking/:id', function() {
  it('Responds with JSON', function(done) {
    request(app)
      .get('/api/booking/' + testedListingId)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Returns a listing with ownerName property', function(done) {
    request(app)
      .get('/api/booking/' + testedListingId)
      .expect(res => typeof res.body.listing[0].ownerName === 'string')
      .expect(200, done);
  });

  it('Returns a listing with detail properties', function(done) {
    request(app)
      .get('/api/booking/' + testedListingId)
      .expect(200)
      .then(res => {
        assert(res.body.listing[0].hasOwnProperty('id'), true);
        assert(res.body.listing[0].hasOwnProperty('rating'), true);
        assert(res.body.listing[0].hasOwnProperty('numRatings'), true);
        assert(res.body.listing[0].hasOwnProperty('pricePerNight'), true);
        assert(res.body.listing[0].hasOwnProperty('discountAmount'), true);
      })
      .then(done);
  });

  it('Returns 404 for a not found listing', function(done) {
    request(app)
      .get('/api/booking/-1')
      .expect(404, done);
  });
});

describe('PUT /api/booking', function() {
  it('Returns the updated listing', function(done) {
    request(app)
      .put('/api/booking/' + testedListingId)
      .send({
        ownerName: 'notTheTestOwner',
        discountAmount: 20,
      })
      .expect(200)
      .then(res => {
        assert(res.body.listing[0], testedListingId);
        assert(res.body.listing[0].ownerName, 'notTheTestOwner');
        assert(res.body.listing[0].hasOwnProperty('rating'), true);
        assert(res.body.listing[0].hasOwnProperty('numRatings'), true);
        assert(res.body.listing[0].hasOwnProperty('pricePerNight'), true);
        assert(res.body.listing[0].discountAmount, 20);
      })
      .then(done);
  });

  it('Returns 404 for a not found listing', function(done) {
    request(app)
      .put('/api/booking/-1')
      .send({
        ownerName: 'notTheTestOwner',
        discountAmount: 20,
      })
      .expect(404, done);
  });
});

describe('DELETE /api/booking', function() {
  it('Returns the deleted listing', function(done) {
    request(app)
      .delete('/api/booking/' + testedListingId)
      .expect(200)
      .then(res => {
        assert(res.body.listing[0], testedListingId);
        assert(res.body.listing[0].ownerName, 'notTheTestOwner');
        assert(res.body.listing[0].hasOwnProperty('rating'), true);
        assert(res.body.listing[0].hasOwnProperty('numRatings'), true);
        assert(res.body.listing[0].hasOwnProperty('pricePerNight'), true);
        assert(res.body.listing[0].discountAmount, 20);
      })
      .then(done);
  });

  it('Returns 404 for a listing that is already deleted', function(done) {
    request(app)
      .delete('/api/booking/' + testedListingId)
      .expect(404, done);
  });
});
