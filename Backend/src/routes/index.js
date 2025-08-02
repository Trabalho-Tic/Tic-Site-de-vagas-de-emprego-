const express = require('express');
const router = express.Router();
const FormlarioController = require('../controllers/FormularioController');

router.get('/formulario', FormlarioController.index);

module.exports = router;
