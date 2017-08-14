'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const router = express.Router();

const tripsRouter = require('./routes/trips');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.use('/trips', tripsRouter);

app.use(express.static('public'));

app.get('/dashboard', function(req, res) {
  return res.sendFile('dashboard.html', {root: './public'});
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not found'});
});

module.exports = app;