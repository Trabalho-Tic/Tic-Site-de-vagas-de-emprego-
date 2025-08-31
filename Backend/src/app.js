// Backend/src/app.js
const express = require('express');
const cors = require('cors');

const routes = require('./routes'); // seu index de rotas
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: false, // usando token no header, não cookie
}));

app.use('/auth', authRoutes);
app.use('/', routes);

module.exports = app;