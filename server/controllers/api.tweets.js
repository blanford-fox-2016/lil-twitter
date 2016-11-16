'use strict'

const Tweet = require('../models/api.tweets')

const seeder = require('../data/seed.tweets.json')

/*
  * @api {GET} /api/tweets
  * @api purpose get 50 recent tweet
  * @apiName getRecentTweets
  * @apiGroup tweets
  *
  * @apiSuccess respond array of object 50 recent tweets
*/
let getRecentTweets = (req, res) => {
  Tweet.find({}, (err, all_data) => {
    if(err) res.status(400).json({'error': `Error : ${err}`})
    if(!all_data) res.status(404).json(`Failed to get recent tweet`)

    res.status(200).json(all_data)
  }).sort({_id: -1}).limit(50)
}

/*
  * @api {POST} /api/tweets
  * @api purpose post new tweet
  * @apiName postNewTweet
  * @apiGroup tweets
  *
  * @apiSuccess respond JSON new_data
*/
let postNewTweet = (req, res) => {
  var content = req.body.content.split(" ")
  var hashtagUI = []

  for (var i = 0; i < content.length; i++) {
    if(content[i][0] === '#'){
      content[i] = content[i].slice(1)
      hashtagUI.push(content[i])
    }
  }
  console.log(hashtagUI);

  Tweet.create({
    avatar_url: "https://s-media-cache-ak0.pinimg.com/736x/f9/44/98/f944980f424d28501fe6fb8232d844c5.jpg",
    content: req.body.content,
    username: "kenduigraha",
    hashtag: hashtagUI
  }, (err, new_data) => {
    if(err) res.status(400).json({'error': `Error : ${err}`})
    if(!new_data) res.status(404).json(`Failed to create new tweet`)

    res.status(200).json(new_data)
  })
}

/*
  * @api {DELETE} /api/tweets/:id
  * @api purpose delete one tweet
  * @apiName deleteOneTweet
  * @apiGroup tweets
  *
  * @apiSuccess respond JSON deleted_data
*/
let deleteOneTweet = (req, res) => {
  Tweet.findOneAndRemove({
    _id: req.params.id
  }, (err, deleted_data) => {
    if(err) res.status(400).json({'error': `Error : ${err}`})
    if(!deleted_data) res.status(404).json(`Failed to delete tweet`)

    res.status(200).json(deleted_data)
  })
}

/*
  * @api {POST} /api/tweets/seed
  * @api purpose seed data
  * @apiName seedDataTweets
  * @apiGroup tweets
  *
  * @apiSuccess respond array of object seeded data
*/
let seedDataTweets = (req, res) => {
  Tweet.create(seeder, (err, seed_data) => {
    if(err) res.status(400).json({'error': `Error : ${err}`})
    if(!seed_data) res.status(404).json(`Failed to seed data tweet`)

    res.status(200).json(seed_data)
  })
}

/*
  * @api {DELETE} /api/tweets/
  * @api purpose delete all tweets
  * @apiName deleteAllTweets
  * @apiGroup tweets
  *
  * @apiSuccess respond empty array
*/
let deleteAllTweets = (req, res) => {
  Tweet.remove({}, (err, removed_all) => {
    if(err) res.status(400).json({'error': `Error : ${err}`})
    if(!removed_all) res.status(404).json(`Failed to delete all tweet`)

    res.status(200).json(removed_all)
  })
}

/*
  * @api {GET} /api/tweets/search?hashtag=value
  * @api purpose get one tweet
  * @apiName searchTweetByHashTag
  * @apiGroup tweets
  *
  * @apiSuccess respond JSON one tweet
*/
let searchTweetByHashTag = (req, res) => {
  console.log(req.query.hashtag);
  Tweet.find({
    hashtag: req.query.hashtag
  }, (err, search_data) => {
    if(err) res.status(400).json({'error': `Error : ${err}`})
    if(!search_data) res.status(404).json(`Failed to search a tweet`)

    res.status(200).json(search_data)
  })
}

module.exports = {
  getRecentTweets,
  postNewTweet,
  deleteOneTweet,
  seedDataTweets,
  deleteAllTweets,
  searchTweetByHashTag
}
