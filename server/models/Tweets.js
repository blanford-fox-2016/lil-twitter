'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tweetsSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
  }
},
{
  timestamps: true
});

let tweets = mongoose.model('tweets', tweetsSchema)

module.exports = tweets;
