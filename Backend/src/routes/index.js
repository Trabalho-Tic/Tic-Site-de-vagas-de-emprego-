const express = require('express');
const router = express.Router();

// ------------------ IMPORTS DE CONTROLLERS ------------------
const AcessibilidadeController = require("../controllers/AcessibilidadeController");
const BarreiraController = require("../controllers/BarreiraController");
const BarreiraAcessibilidadeController = require("../controllers/BarreiraAcessibilidadeController");
const SubTipoBarreiraController = require("../controllers/SubTipoBarreiraController");
const SubTipoDeficienciaController = require("../controllers/SubTipoDeficienciaController");
const TipoDeficienciaController = require("../controllers/TipoDeficienciaController");
const UserController = require("../controllers/UserController");
const CompanyController = require("../controllers/CompanyController");
const CandidatoController = require("../controllers/CandidatoController");
const VagaController = require("../controllers/VagaController");
const VagaDescricaoController = require('../controllers/VagaDescricaoController');
const VagaBeneficioController = require('../controllers/VagaBeneficioController');
const VagaProcessoController = require('../controllers/VagaProcessoController');
const VagaRequisicaoController = require('../controllers/VagaRequisicaoController');

// ------------------ AUTENTICAÇÃO ------------------
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/authMiddleware");

// ====================================================
// ROTAS PÚBLICAS
// ====================================================

// Login
router.post('/auth/login', (req, res) => AuthController.login(req, res));

// Registro de usuário base
router.post('/user/create', (req, res) => UserController.create(req, res));

// Registro público de empresas e candidatos
router.post('/company/create', (req, res) => CompanyController.create(req, res));
router.post('/candidato/create', (req, res) => CandidatoController.create(req, res));

// ====================================================
// ROTAS PROTEGIDAS (JWT OBRIGATÓRIO)
// ====================================================
// router.use(authMiddleware);

// ------------------ USUÁRIOS ------------------
router.get('/user', UserController.index);
router.get('/user/:id', UserController.show);
router.put('/user/update/:id', UserController.update);
router.delete('/user/delete/:id', UserController.delete);

// ------------------ EMPRESAS ------------------
router.get('/company', CompanyController.index);
router.get('/company/:id', CompanyController.show);
router.put('/company/update/:id', CompanyController.update);
router.delete('/company/delete/:id', CompanyController.delete);

// ------------------ CANDIDATOS ------------------
router.get('/candidato', CandidatoController.index);
router.get('/candidato/:id_user', CandidatoController.show);
router.put('/candidato/update/:id_user', CandidatoController.update);
router.delete('/candidato/delete/:id_user', CandidatoController.delete);

// ------------------ ACESSIBILIDADE ------------------
router.get('/Acessibilidade', AcessibilidadeController.index);
router.get('/Acessibilidade/:id', AcessibilidadeController.show);
router.post('/Acessibilidade/create', AcessibilidadeController.create);
router.put('/Acessibilidade/update/:id', AcessibilidadeController.update);
router.delete('/Acessibilidade/delete/:id', AcessibilidadeController.delete);

// ------------------ BARREIRA ------------------
router.get('/Barreira', BarreiraController.index);
router.get('/Barreira/:id', BarreiraController.show);
router.post('/Barreira/create', BarreiraController.create);
router.put('/Barreira/update/:id', BarreiraController.update);
router.delete('/Barreira/delete/:id', BarreiraController.delete);

// ------------------ BARREIRA-ACESSIBILIDADE ------------------
router.get('/BarreiraAcessibilidade', BarreiraAcessibilidadeController.index);
router.get('/BarreiraAcessibilidade/:id', BarreiraAcessibilidadeController.show);
router.post('/BarreiraAcessibilidade/create', BarreiraAcessibilidadeController.create);
router.put('/BarreiraAcessibilidade/update/:id', BarreiraAcessibilidadeController.update);
router.delete('/BarreiraAcessibilidade/delete/:id', BarreiraAcessibilidadeController.delete);

// ------------------ SUBTIPO BARREIRA ------------------
router.get('/SubTipoBarreira', SubTipoBarreiraController.index);
router.get('/SubTipoBarreira/:id', SubTipoBarreiraController.show);
router.post('/SubTipoBarreira/create', SubTipoBarreiraController.create);
router.put('/SubTipoBarreira/update/:id', SubTipoBarreiraController.update);
router.delete('/SubTipoBarreira/delete/:id', SubTipoBarreiraController.delete);

// ------------------ SUBTIPO DEFICIÊNCIA ------------------
router.get('/SubTipoDeficiencia', SubTipoDeficienciaController.index);
router.get('/SubTipoDeficiencia/:id', SubTipoDeficienciaController.show);
router.post('/SubTipoDeficiencia/create', SubTipoDeficienciaController.create);
router.put('/SubTipoDeficiencia/update/:id', SubTipoDeficienciaController.update);
router.delete('/SubTipoDeficiencia/delete/:id', SubTipoDeficienciaController.delete);

// ------------------ TIPO DEFICIÊNCIA ------------------
router.get('/TipoDeficiencia', TipoDeficienciaController.index);
router.get('/TipoDeficiencia/:id', TipoDeficienciaController.show);
router.post('/TipoDeficiencia/create', TipoDeficienciaController.create);
router.put('/TipoDeficiencia/update/:id', TipoDeficienciaController.update);
router.delete('/TipoDeficiencia/delete/:id', TipoDeficienciaController.delete);

// ------------------ VAGAS ------------------
router.get('/Vaga', VagaController.index);
router.get('/Vaga/:id', VagaController.show);
router.post('/Vaga/create', VagaController.create);
router.put('/Vaga/update/:id', VagaController.update);
router.delete('/Vaga/delete/:id', VagaController.delete);

// ------------------ VAGA DESCRIÇÃO ------------------
router.post("/vagadescricao/:id", VagaDescricaoController.create);
router.put("/vagadescricao/:id", VagaDescricaoController.update);

// ------------------ VAGA BENEFÍCIO ------------------
router.post("/vagabeneficio/:id", VagaBeneficioController.create);
router.put("/vagabeneficio/:id", VagaBeneficioController.update);

// ------------------ VAGA PROCESSO ------------------
router.post("/vagaprocesso/:id", VagaProcessoController.create);
router.put("/vagaprocesso/:id", VagaProcessoController.update);

// ------------------ VAGA REQUISIÇÃO ------------------
router.post("/vagarequisicao/:id", VagaRequisicaoController.create);
router.put("/vagarequisicao/:id", VagaRequisicaoController.update);

// ------------------ ASSOCIAÇÕES ------------------
router.post('/TipoDeficiencia/:id/SubTipoDeficiencia', TipoDeficienciaController.associarSubtipos);
router.post('/Barreira/:id/SubTipoDeficiencia', BarreiraController.associarSubtipos);
router.post('/Barreira/:id/Acessibilidade', BarreiraAcessibilidadeController.associarSubtipos);

module.exports = router;
