const express = require('express'); 
const router = express.Router();    

const {LoginHandler} = require('../handlers/loginHandler');  
handler = new LoginHandler();   

router.post('/login-details', handler.loginHandler);

module.exports = router;    