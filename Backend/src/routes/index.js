const express = require('express');
const router = express.Router();
const FormularioController = require('../controllers/FormularioController');
const QuestionarioController = require('../controllers/QuestionarioController');
const DominioController = require("../controllers/DominioController")

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

module.exports = router;
