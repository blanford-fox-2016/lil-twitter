'use strict'
const Tweets = require('../models/Tweets');

let getAllTweets = (req, res, next) => {
  Tweets.find({}, (err, tweets) => {
    if (err) {
      console.log(err);
    } else {
      res.send(tweets);
    }
  })
}

let postNewTweet = (req, res, next) => {
  Tweets.create({
    username: req.body.username,
    name: req.body.name,
    content: req.body.content,
    avatar_url: req.body.avatar_url
  }, (err, tweet) => {
    if (err) {
      console.log(err);
    } else {
      res.send(tweet)
    }
  })
}

let deleteTweet = (req, res, next) => {
  Tweets.remove({
    _id: req.params.id
  }, (err, deleted) => {
    if (err) {
      console.log(err);
    } else {
      res.json(deleted);
    }
  })
}

module.exports = {
  getAllTweets,
  postNewTweet,
  deleteTweet
}
