const express = require('express');
const router = express.Router();

const controller = require('../controllers/api.tweets')
/*
  * recent tweet (maximal 50 tweets)
  * controller's function : getRecentTweets
*/
router.get('/', controller.getRecentTweets);

/*
  * process new tweet
  * controller's function : postNewTweet
*/
router.post('/', controller.postNewTweet);

/*
  * delete a tweet
  * controller's function : deleteOneTweet
*/
router.delete('/:id', controller.deleteOneTweet);

/*
  * seed data into tweets collection
  * controller's function : seedDataTweets
*/
router.post('/', controller.seedDataTweets);

/*
  * delete all data in tweets collection
  * controller's function : deleteAllTweets
*/
router.delete('/', controller.deleteAllTweets);

/*
  * Search a tweet by hashtag
  * controller's function : searchTweetByHashTag
*/
router.get('/search', controller.searchTweetByHashTag);

module.exports = router;
