const express = require('express');
const cors = require('cors');

const app = express();
const apiRoutes = require('./routes');              // suas rotas já existentes (/users, etc.)
const authRoutes = require('./routes/auth.routes'); // as rotas novas

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));

app.use('/auth', authRoutes);
app.use('/', apiRoutes);

module.exports = app;