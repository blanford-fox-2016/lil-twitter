var express = require('express');
var router = express.Router();
const twitController = require('../controllers/controllers.api.twit')

router.get('/seed', twitController.twitSeed)
router.get('/recent', twitController.getTwitRecent)
router.get('/:id', twitController.getTwitById)
router.post('/', twitController.createTwit)
router.delete('/', twitController.deleteAllTwit)

module.exports = router;
