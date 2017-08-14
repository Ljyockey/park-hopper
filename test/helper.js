const faker = require('faker');
const {PORT} = require('../config');
const {runServer, closeServer} = require('../server');
const {sequelize} = require('../sequelize');

const {Trip} = require('../models/trip');

before(function() {
  return sequelize.sync({force: true})
    .then(() => runServer(PORT));
});

after(function() {
  return closeServer();
});

function dropTables() {
  return Promise.all([
    Trip.truncate()
  ]);
}

function buildTrip() {
  return {
    park: faker.address.city(),
    dateOfVisit: '08/11/2017',
    crowdIndex: faker.random.number(),
    rides: faker.random.words(),
    shows: faker.random.words(),
    shoppingDining: faker.random.words(),
    other: faker.lorem.sentence()
  };
}

function seedTrip() {
  return Trip.create(buildTrip());
}

function seedTestData() {
  const trips = [];
  for (let i=0; i<5; i++) {
    trips.push(seedTrip());
  }
  return Promise.all(trips);
}

module.exports = {
  buildTrip,
  dropTables,
  seedTestData
};