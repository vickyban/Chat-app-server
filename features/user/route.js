const express = require('express');
const router = express.Router();

// match path = '/users/'
const controller = require('./controller');

router.post('/login', controller.user_login);
router.post('/signup', controller.user_signup);

module.exports = router;