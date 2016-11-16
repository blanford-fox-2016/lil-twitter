'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema

let tweetSchema = new Schema({
  "avatar_url"  : String,
  "content"     : String,
  "username"    : String,
  "hashtag"     : Array
},{
  "timestamps": true
})


module.exports = mongoose.model('Tweets', tweetSchema)
