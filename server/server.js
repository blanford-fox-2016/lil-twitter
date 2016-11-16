'use strict'

// related to express
const express = require('express');
const app = express()
const port = 3000

// need body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser())

// related to mongoose and mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spreader')
mongoose.Promise = global.Promise;

// related to our controller
const router = require('./routes/route.api.spreader');

app.use('/api', router)

app.listen(port, () => {
  console.log('server is running on port ', port);
})
