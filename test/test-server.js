
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();
chai.use(chaiHttp);
const app = server.app;

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