'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Increment = require('mongoose-sequence')

let tweetSchema = new Schema ({
  tweet_id: Number,
  username: String,
  names: String,
  avatar : String,
  content : String,
  createdAt:  {type: Date, default: Date.now},
  hastags: [String]
})

tweetSchema.plugin(Increment, { inc_field: 'tweet_id' });

module.exports = mongoose.model('Tweet', tweetSchema)
