'use strict'

const express = require('express');
const Twitter = require('../controller/controller.twitter');
const router = express.Router();

//=============
// routes ====
//===========

router.get('/', Twitter.showList)
router.post('/', Twitter.newTweets)

router.get('/:hasthtag', Twitter.hashtag)
router.get('/popular', Twitter.popular)


module.exports = router ;
