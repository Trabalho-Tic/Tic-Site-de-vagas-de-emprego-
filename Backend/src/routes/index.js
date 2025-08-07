const express = require('express');
const router = express.Router();
const FormularioController = require('../controllers/FormularioController');
const QuestionarioController = require('../controllers/QuestionarioController');
const DominioController = require("../controllers/DominioController")
// const QuestaoController = require("../controllers/QuestaoController")
const CandidatoController = require("../controllers/CandidatoController")

// Formulario
router.get('/formulario', FormularioController.index);
router.get('/formulario/:id', FormularioController.show);
router.post('/formulario/create', FormularioController.create);
router.put('/formulario/update/:id', FormularioController.update);
router.delete('/formulario/delete/:id', FormularioController.delete);

// Questioanrio
router.get('/Questionario', QuestionarioController.index);
router.get('/Questionario/:id', QuestionarioController.show);
router.post('/Questionario/create', QuestionarioController.create);
router.put('/Questionario/update/:id', QuestionarioController.update);
router.delete('/Questionario/delete/:id', QuestionarioController.delete);

// Dominio
router.get('/Dominio', DominioController.index);
router.get('/Dominio/:id', DominioController.show);
router.post('/Dominio/create', DominioController.create);
router.put('/Dominio/update/:id', DominioController.update);
router.delete('/Dominio/delete/:id', DominioController.delete);

// // Questao
// router.get('/Questao', QuestaoController.index);
// router.get('/Questao/:id', QuestaoController.show);
// router.post('/Questao/create', QuestaoController.create);
// router.put('/Questao/update/:id', QuestaoController.update);
// router.delete('/Questao/delete/:id', QuestaoController.delete);

// Candidato
router.get('/Candidato', CandidatoController.index);
router.get('/Candidato/:id', CandidatoController.show);
router.post('/Candidato/create', CandidatoController.create);
router.put('/Candidato/update/:id', CandidatoController.update);
router.delete('/Candidato/delete/:id', CandidatoController.delete);

module.exports = router;
