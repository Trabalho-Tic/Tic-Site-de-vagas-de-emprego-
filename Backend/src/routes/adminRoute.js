const express = require('express');
const router = express.Router();
const authController = require('../controllers/adminAuthController');


router.post('/admin/login', authController.login);

module.exports = router;