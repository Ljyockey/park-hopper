
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const app = require('../app');
const {Trip} = require('../models/trip');
const {buildTrip, dropTables, seedTestData} = require('./helper');

chai.use(chaiHttp);

describe('Trips API resource', function() {

  beforeEach(function() {
    console.log('seeding data');
    return seedTestData();
  });

  afterEach(function() {
    console.log('dropping tables');
    return dropTables();
  });

  describe('GET endpoints', function() {

    it('should return all trips', function() {
      return chai.request(app)
        .get('/trips')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.a('object');
        });
    });

  });

  describe('POST enpoints', function() {

    it('should create new trip', function() {
      const trip = buildTrip();
      return chai.request(app)
        .post('/trips').send(trip)
        .then(function(res) {
          res.should.have.status(201);
          res.body.park.should.equal(trip.park);
          res.body.crowdIndex.should.equal(trip.crowdIndex);
          res.body.rides.should.equal(trip.rides);
          res.body.shows.should.equal(trip.shows);
          res.body.shoppingDining.should.equal(trip.shoppingDining);
          res.body.other.should.equal(trip.other);
        });
    });

  });

  describe('PUT endpoints', function() {
    it('should edit trip', function() {
      let id;
      const t = buildTrip();
      const newValues = {
        rides: t.rides,
        shows: t.shows,
        shoppingDining: t.shoppingDining
      };
      return Trip.findOne()
        .then(function(trip) {
          id = trip.id;
          return chai.request(app)
            .put(`/trips/${id}`).send(newValues);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Trip.findOne({where: {id: id}});
        })
        .then(function(res) {
          res.rides.should.equal(newValues.rides);
        });
    });
  });

  describe('DELETE endpoints', function() {
    it('should remove trip', function() {
      let trip;
      return Trip.findOne()
        .then(function(_trip) {
          trip = _trip;
          return chai.request(app)
            .delete(`/trips/${trip.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Trip.findOne({where: {id: trip.id}});
        })
        .then(function(res) {
          should.not.exist(res);
        });
    });
  });

});