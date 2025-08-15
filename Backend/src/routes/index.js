const express = require('express');
const router = express.Router();
const AcessibilidadeController = require("../controllers/AcessibilidadeController")

// Acessibilidade
router.get('/Acessibilidade', AcessibilidadeController.index);
router.get('/Acessibilidade/:id', AcessibilidadeController.show);
router.post('/Acessibilidade/create', AcessibilidadeController.create);
router.put('/Acessibilidade/update/:id', AcessibilidadeController.update);
router.delete('/Acessibilidade/delete/:id', AcessibilidadeController.delete);

module.exports = router;
