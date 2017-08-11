'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
const app = require('../app');

describe('index.html', function() {

  it('should return HTML file: index', function() {
    return chai.request(app)
      .get('')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.html;
      })
      .catch(function(err) {
        console.log(err);
      });
  });

});

describe('dashboard.html', function() {

  it('should return HTML file: dashboard', function() {
    return chai.request(app)
      .get('/dashboard')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.html;
      })
      .catch(function(err) {
        console.log(err);
      });
  });

});