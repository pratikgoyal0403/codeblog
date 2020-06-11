const express = require('express');

const router = express.Router();

const authController = require('../controller/auth');


router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLoginPage);
router.get('/signup', authController.getSignupPage);
router.post('/signup', authController.postSignupPage);
router.get('/logout', authController.getLogoutPage);


module.exports = router;