const express = require('express');
const { login, register } = require('../controllers/AuthController');
const requireAuth = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));

module.exports = router;