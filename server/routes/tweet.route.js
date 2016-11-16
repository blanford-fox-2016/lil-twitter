'use strict'

// express dipendencies
const express = require('express');
const router = express.Router();

// local dipendencies
const Controller = require('../controllers/tweet.controller');

// GET all recent tweeet
router.get('/tweets/recents', Controller.list)

// Get all tweet by hastag
router.get('/tweets/search/:hastag', Controller.findHastag)

// POST a new tweet
router.post('/tweets', Controller.generate)

// Get the most popular tweet
//router.get('/tweets/hastags/popular', Controller.findPopular)


module.exports = router;
