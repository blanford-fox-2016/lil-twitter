var express = require('express');
var router = express.Router();
const twitController = require('../controllers/controllers.api.twit')

router.get('/seed', twitController.twitSeed)
router.post('/', twitController.createTwit)

module.exports = router;
