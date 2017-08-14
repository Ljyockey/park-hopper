'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require ('../sequelize');

const Trip = sequelize.define('Trip', {
  park: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dateOfVisit: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'date_of_visit'
  },
  crowdIndex: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'crowd_index'
  },
  rides: {
    type: Sequelize.TEXT
  },
  shows: {
    type: Sequelize.TEXT
  },
  shoppingDining: {
    type: Sequelize.TEXT,
    field: 'shopping_dining'
  },
  other: {
    type: Sequelize.TEXT
  }
},
{
  tableName: 'trips',
  underscored: true
});

module.exports = {Trip};