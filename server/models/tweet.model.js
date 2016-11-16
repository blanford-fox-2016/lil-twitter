'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Increment = require('mongoose-increment')

let tweetSchema = new Schema ({
  username: String,
  avatar : String,
  content : String,
  createdAt: String,
  hastags: [String]
})

tweetSchema.plugin(Increment, { inc_field: 'tweet_id' });
module.exports = mongoose.model('Twit', tweetSchema)
