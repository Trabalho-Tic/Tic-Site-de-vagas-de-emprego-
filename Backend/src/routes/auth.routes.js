const express = require('express');
const rateLimit = require('express-rate-limit'); // 👈 novo
const { login, register } = require('../controllers/AuthController');
const requireAuth = require('../middlewares/auth');

const router = express.Router();

// Limite de 20 tentativas por IP a cada 15 minutos
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,                   // até 20 requests
  standardHeaders: true,     // retorna RateLimit-* headers
  legacyHeaders: false,      // desativa X-RateLimit-* antigos
  message: { error: 'Muitas tentativas de login. Tente novamente mais tarde.' },
});

// Se você quiser logs quando bloquear:
// handler: (req, res /*, next*/) => res.status(429).json({ error: '...' }),

router.post('/register', register);
router.post('/login', loginLimiter, login); // 👈 aplica aqui
router.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));

module.exports = router;