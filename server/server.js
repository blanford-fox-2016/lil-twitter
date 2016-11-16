'use strict'

//=====================
// require express ===
//==================

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const twitter = require('./routes/routes.twitter.js')


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
//==============
// mongoose ===
//=============


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/twitter')
mongoose.Promise = global.Promise



app.use('/api', twitter)

app.listen(port, function(){
  console.log('listening on', port)
})
