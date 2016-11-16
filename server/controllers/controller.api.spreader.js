'use strict'

const Spreader = require('../models/model.api.spreader');

// get all tweet
let doList = (req, res) => {
  Spreader
    .find()
    .then((spreader) => res.json(spreader))
    .catch((err) => res.json(err))
}

let doGenerate = (req, res) => {
  let data = {
    username: req.body.username,
    avatar : req.body.avatar,
    content: req.body.content,
    hastags: [req.body.hastags]
  }

  Spreader
    .create(data)
    .then((spreader) => res.json(spreader))
    .catch((err) => res.json(err))
}

let doFindHashtag = (req, res) => {
  Spreader
    .find({hashtags: req.params.hashtags})
    .then((spreader) => res.json(spreader))
    .catch((err) => res.json(err))
}


module.exports = {
  doList,
  doGenerate,
  dofFindHashtag
}
