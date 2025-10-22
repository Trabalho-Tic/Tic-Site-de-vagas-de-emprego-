const express = require('express');
const router = express.Router();

// Controllers já existentes…
const AcessibilidadeController = require("../controllers/AcessibilidadeController");
const BarreiraController = require("../controllers/BarreiraController");
const BarreiraAcessibilidadeController = require("../controllers/BarreiraAcessibilidadeController");
const SubTipoBarreiraController = require("../controllers/SubTipoBarreiraController");
const SubTipoDeficienciaController = require("../controllers/SubTipoDeficienciaController");
const TipoDeficienciaController = require("../controllers/TipoDeficienciaController");
const UserController = require("../controllers/UserController");
const VagaController = require("../controllers/VagaController");
const VagaDescricaoController = require('../controllers/VagaDescricaoController');
const VagaBeneficioController = require('../controllers/VagaBeneficioController');
const VagaProcessoController = require('../controllers/VagaProcessoController');
const VagaRequisicaoController = require('../controllers/VagaRequisicaoController');
const CompanyController = require('../controllers/CompanyController');

 //>>> ADIÇÕES (autenticação) <<<
//  const AuthController = require("../controllers/AuthController");            // [ADD]
//  const authMiddleware = require("../middlewares/authMiddleware");            // [ADD]

// ------------------ ROTAS PÚBLICAS ------------------

 //Auth (login)
 router.post('/auth/login', (req, res) => AuthController.login(req, res));  // [ADD]

 //User (registro)
 router.post('/user/create', (req, res) => UserController.create(req, res));

// ------------------ ROTAS PROTEGIDAS ------------------
// Ativa o middleware UMA VEZ; tudo abaixo exige JWT
//  router.use(authMiddleware);                                                // [ADD]

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

// Vaga
router.get('/Vaga', VagaController.index);
router.get('/Vaga/:id', VagaController.show);
router.post('/Vaga/create', VagaController.create);
router.put('/Vaga/update/:id', VagaController.update);
router.delete('/Vaga/delete/:id', VagaController.delete);

// Vaga Descrição 
router.post("/vagadescricao/:id", VagaDescricaoController.create);
router.put("/vagadescricao/:id", VagaDescricaoController.update);

// Vaga Beneficios 
router.post("/vagabeneficio/:id", VagaBeneficioController.create);
router.put("/vagabeneficio/:id", VagaBeneficioController.update);

// Vaga Processo 
router.post("/vagaprocesso/:id", VagaProcessoController.create);
router.put("/vagaprocesso/:id", VagaProcessoController.update);

// Vaga Requisição 
router.post("/vagarequisicao/:id", VagaRequisicaoController.create);
router.put("/vagarequisicao/:id", VagaRequisicaoController.update);


router.get('/user', UserController.index);
router.get('/user/:id', UserController.show);
router.post('/user/create', (req, res) => UserController.create(req, res));
router.put('/user/update/:id', UserController.update);
router.delete('/user/delete/:id', UserController.delete);

// Company
router.post('/company/create', CompanyController.create);
router.get('/company/:id', CompanyController.show);


// ASSOCIAÇÕES
router.post('/TipoDeficiencia/:id/SubTipoDeficiencia', TipoDeficienciaController.associarSubtipos);
router.post('/Barreira/:id/SubTipoDeficiencia', BarreiraController.associarSubtipos);
router.post('/Barreira/:id/Acessibilidade', BarreiraAcessibilidadeController.associarSubtipos);

module.exports = router;
