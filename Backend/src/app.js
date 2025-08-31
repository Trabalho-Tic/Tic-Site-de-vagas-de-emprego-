const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // 👈 novo

const app = express();

// Em produção atrás de proxy (Nginx/Heroku/Render), habilite:
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // 👈 importante pro rate-limit contar IP certo
}

app.use(helmet()); // 👈 aplica cabeçalhos de segurança
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));

const authRoutes = require('./routes/auth.routes');
const apiRoutes  = require('./routes');

app.use('/auth', authRoutes);
app.use('/', apiRoutes);

module.exports = app;