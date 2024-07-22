const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.post('/', loginController.login);
console.log('Rouet Path')
module.exports = router;


