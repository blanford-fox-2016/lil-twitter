const express = require('express');
const router = express.Router();

const controller = require('../controllers/api.users')

/* GET All Users. */
router.get('/', controller.allUsers)

/* Process New User. */
router.post('/', controller.addUser);

/* Process Register Local User. */
router.post('/register_local', controller.registerLocalUser);

/* Process Login User. */
router.post('/login', controller.loginUser);

/* Process Edit a User. */
router.put('/:id', controller.editUser);

/* Process Delete a User. */
router.delete('/:id', controller.deleteUser);

module.exports = router;
