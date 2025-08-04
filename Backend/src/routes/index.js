const express = require('express');
const router = express.Router();
const FormularioController = require('../controllers/FormularioController');

router.get('/formulario', FormularioController.index);
router.get('/formulario/:id', FormularioController.show);
router.post('/formulario/create', FormularioController.create);
router.put('/formulario/update/:id', FormularioController.update);
router.delete('/formulario/delete/:id', FormularioController.delete);

module.exports = router;
