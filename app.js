'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const router = express.Router();

//require routes once they're made

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

//app.use('/route', routeVariable);

app.use(express.static('public'));

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not found'});
});

module.exports = app;