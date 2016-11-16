const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller')

router.post('/register', controller.registerProcess)
router.post('/login', controller.loginProcess)






module.exports = router;
