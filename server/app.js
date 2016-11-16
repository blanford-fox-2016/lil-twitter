'use strict'

// related to express
const express = require('express');
const app = express()
const port = 3000
const cors = require('cors')

// need body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser())
app.use(cors())

// related to mongoose and mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tweetYeah')
mongoose.Promise = global.Promise;

// related to our controller
const router = require('./routes/tweet.route');

app.use('/api', router)

app.listen(port, () => {
  console.log('server is running on port ', port);
})
