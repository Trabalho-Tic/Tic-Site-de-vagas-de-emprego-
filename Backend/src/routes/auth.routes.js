const express = require('express');
const { login } = require('../controllers/AuthController');
const requireAuth = require('../middlewares/auth'); 
const router = express.Router();

router.post('/login', login);

router.get('/me', requireAuth, (req, res) => {
  return res.json({ user: req.user });
});