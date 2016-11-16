'use strict'
const mongoose = require('mongoose');

let tagSchema = mongoose.Schema({
    hastag_name: String
});


let Schema = mongoose.Schema

let tweetsSchema = new Schema({

  username: String,
  profile_picture:String,
  content: String,
  hashtag:[tagSchema]

},{
  timestamps:true
})

let Tweets = mongoose.model('Tweets', tweetsSchema)

module.exports = Tweets
