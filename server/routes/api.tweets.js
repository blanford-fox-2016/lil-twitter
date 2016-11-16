const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/api.tweets')

// ROUTING
router.get('/tweets', controller.getDatas)
router.post('/tweets', controller.postData)
router.get('/tweets/:id', controller.getData)
router.delete('/tweets/:id', controller.deleteData)
// router.put('/tweets/:id', controller.updateData)

module.exports = router
