const express = require('express');
const router = express.Router();
const apitweets = require('../controllers/apiTweetsController');

/* GET home page. */
router.get('/', apitweets.getAllTweets);
router.post('/', apitweets.postNewTweet);
router.delete('/:id', apitweets.deleteTweet);

module.exports = router;
