const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/api.houses')

// ROUTING
router.get('/houses', controller.getDatas)
router.post('/houses', controller.postData)
router.get('/houses/:id', controller.getData)
router.delete('/houses/:id', controller.deleteData)
router.put('/houses/:id', controller.updateData)

module.exports = router
