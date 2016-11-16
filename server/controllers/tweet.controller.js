'use strict'

const Tweet = require('../models/tweet.model');

// get all tweet
let list = (req, res) => {
  Tweet
    .find()
    .then((tweets) => res.json(tweets))
    .catch((err) => res.json(err))
}

let generate = (req, res) => {
  let data = {
    username: req.body.username,
    avatar : req.body.avatar,
    content: req.body.content,
    hastags: [req.body.hastags]
  }

  Tweet
    .create(data)
    .then((tweet) => res.json(tweet))
    .catch((err) => res.json(err))
}

let findHastag = (req, res) => {
  console.log(req.params)
  Tweet
    .find({hastags: req.params.hastag})
    .then((tweet) => res.json(tweet))
    .catch((err) => res.json(err))
}


module.exports = {
  list,
  generate,
  findHastag

}
