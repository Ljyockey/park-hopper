'use strict';

const express = require('express');
const router = express.Router();

const {Trip} = require('../models/trip');

router.get('/', (req, res) => Trip.findAll()
  .then(trips => res.json({trips: trips})));

module.exports = router;