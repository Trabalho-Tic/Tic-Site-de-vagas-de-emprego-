const express = require('express');
const router = express.Router();
const AcessibilidadeController = require("../controllers/AcessibilidadeController")
const BarreiraController = require("../controllers/BarreiraController")
const BarreiraAcessibilidadeController = require("../controllers/BarreiraAcessibilidadeController")
const SubTipoBarreiraController = require("../controllers/SubTipoBarreiraController")
const SubTipoDeficienciaController = require("../controllers/SubTipoDeficienciaController")
const TipoDeficienciaController = require("../controllers/TipoDeficienciaController")
const UserController = require("../controllers/UserController")

// Acessibilidade
router.get('/Acessibilidade', AcessibilidadeController.index);
router.get('/Acessibilidade/:id', AcessibilidadeController.show);
router.post('/Acessibilidade/create', AcessibilidadeController.create);
router.put('/Acessibilidade/update/:id', AcessibilidadeController.update);
router.delete('/Acessibilidade/delete/:id', AcessibilidadeController.delete);

// Barreira
router.get('/Barreira', BarreiraController.index);
router.get('/Barreira/:id', BarreiraController.show);
router.post('/Barreira/create', BarreiraController.create);
router.put('/Barreira/update/:id', BarreiraController.update);
router.delete('/Barreira/delete/:id', BarreiraController.delete);

// BarreiraAcessibilidade
router.get('/BarreiraAcessibilidade', BarreiraAcessibilidadeController.index);
router.get('/BarreiraAcessibilidade/:id', BarreiraAcessibilidadeController.show);
router.post('/BarreiraAcessibilidade/create', BarreiraAcessibilidadeController.create);
router.put('/BarreiraAcessibilidade/update/:id', BarreiraAcessibilidadeController.update);
router.delete('/BarreiraAcessibilidade/delete/:id', BarreiraAcessibilidadeController.delete);

// SubTipoBarreira
router.get('/SubTipoBarreira', SubTipoBarreiraController.index);
router.get('/SubTipoBarreira/:id', SubTipoBarreiraController.show);
router.post('/SubTipoBarreira/create', SubTipoBarreiraController.create);
router.put('/SubTipoBarreira/update/:id', SubTipoBarreiraController.update);
router.delete('/SubTipoBarreira/delete/:id', SubTipoBarreiraController.delete);

// SubTipoDeficiencia
router.get('/SubTipoDeficiencia', SubTipoDeficienciaController.index);
router.get('/SubTipoDeficiencia/:id', SubTipoDeficienciaController.show);
router.post('/SubTipoDeficiencia/create', SubTipoDeficienciaController.create);
router.put('/SubTipoDeficiencia/update/:id', SubTipoDeficienciaController.update);
router.delete('/SubTipoDeficiencia/delete/:id', SubTipoDeficienciaController.delete);

// TipoDeficiencia
router.get('/TipoDeficiencia', TipoDeficienciaController.index);
router.get('/TipoDeficiencia/:id', TipoDeficienciaController.show);
router.post('/TipoDeficiencia/create', TipoDeficienciaController.create);
router.put('/TipoDeficiencia/update/:id', TipoDeficienciaController.update);
router.delete('/TipoDeficiencia/delete/:id', TipoDeficienciaController.delete);


// User
router.get('/user', UserController.index);
router.post('/user/create', UserController.create);


module.exports = router;
