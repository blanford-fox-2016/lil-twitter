var express = require('express');
var router = express.Router();
const userController = require('../controllers/controllers.api.user')

router.get('/seed', userController.seedUser)
router.get('/', userController.getUser)
router.get('/:userId', userController.getUserByUserId)
router.post('/', userController.localRegisterUser)
router.post('/login', userController.loginUser)
router.delete('/', userController.deleteAllUsers)
router.delete('/:userId', userController.deleteUserByUserId)

module.exports = router;
