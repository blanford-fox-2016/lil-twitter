const express = require('express');
const router = express.Router();
const controller = require('../controller/twit.controller')

/* GET users listing. */
router.get('/recent', controller.getRecentTwit);
router.get('/search', controller.popularHashtag);
router.get('/river', controller.popularRiver);
router.get('/search', controller.search)
router.post('/', controller.createNewTwit);
router.delete('/:id', controller.deleteTwit);



module.exports = router;
