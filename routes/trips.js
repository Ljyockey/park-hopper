'use strict';

const express = require('express');
const router = express.Router();

const {Trip} = require('../models/trip');

router.get('/', (req, res) => Trip.findAll()
  .then(trips => res.json({trips: trips})));

router.post('/', (req, res) => {
  return Trip.create(req.body)
    .then(trip => res.status(201).json(trip));
});

router.delete('/:id', (req, res) => {
  return Trip.destroy({where: {id: req.params.id}})
    .then(trip => res.status(204).end());
});

router.put('/:id', (req, res) => {
  const newValues = {
    rides: req.body.rides,
    shows: req.body.shows,
    shoppingDining: req.body.shoppingDining,
    other: req.body.other
  };
  console.log(newValues);
  return Trip.update(newValues, {where: {id: req.params.id}})
    .then(trip => res.status(204).end());
});

module.exports = router;