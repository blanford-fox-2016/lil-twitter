'use strict'

// express dependencies
const express = require('express');
const router = express.Router();

// local dependencies
const Controller = require('../controllers/controller.api.spreader');

// GET all recent spread
router.get('/spreader/recents', Controller.doList)

// Get all spread by hashtags
router.get('/spreader/search/:hashtags', Controller.doFindHashtag)

// POST a new spread
router.post('/spreader', Controller.doGenerate)

module.exports = router;
