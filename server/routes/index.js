var express = require('express');
var router = express.Router();
const twitController = require('../controllers/controllers.api.twit')

router.post('/', twitController.createTwit)

module.exports = router;
