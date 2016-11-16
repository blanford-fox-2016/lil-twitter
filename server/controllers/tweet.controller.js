'use strict'

const Tweet = require('../models/tweet.model');


// giving us all recent tweets
let list = (req, res) => {
  Tweet
    .find()
    .then((tweets) => res.json(tweets))
    .catch((err) => res.json(err))
}

// find tweet by hastag
let findHastag = (req, res) => {
  Tweet
    .find({hastags: new RegExp(req.params.hastag, 'i')})
    .then((tweet) => res.json(tweet))
    .catch((err) => res.json(err))
}

// Post a new tweet
let generate = (req, res) => {
  Tweet
    .crate(req.body)
    .then((tweet) => res.json(tweet))
    .catch((err) => res.json(err))
}


// The most popular tweet
// let findPopular = (req, res) => {
//   Tweet
//     .find({hastags: $})
// }
