const express = require('express');
const router = express.Router();
const loginRoute = require('./loginRoute');

router.use('/login',loginRoute);

module.exports = router;