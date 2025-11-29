const express = require("express");
const router = express.Router();

// ------------------ CONTROLLERS ------------------
const AcessibilidadeController = require("../controllers/AcessibilidadeController");
const BarreiraController = require("../controllers/BarreiraController");
const BarreiraAcessibilidadeController = require("../controllers/BarreiraAcessibilidadeController");
const SubTipoBarreiraController = require("../controllers/SubTipoBarreiraController");
const SubTipoDeficienciaController = require("../controllers/SubTipoDeficienciaController");
const TipoDeficienciaController = require("../controllers/TipoDeficienciaController");
const UserController = require("../controllers/UserController");
const SubTipoDeficienciaTipoDeficienciasController = require("../controllers/SubTipoDeficienciaTipoDeficienciaController");
const CompanyController = require("../controllers/CompanyController");
const CandidatoController = require("../controllers/CandidatoController");
const VagaController = require("../controllers/VagaController");
const VagaDescricaoController = require("../controllers/VagaDescricaoController");
const VagaBeneficioController = require("../controllers/VagaBeneficioController");
const VagaProcessoController = require("../controllers/VagaProcessoController");
const VagaRequisicaoController = require("../controllers/VagaRequisicaoController");
const CandidaturaController = require("../controllers/CandidaturaController");
const CurriculoController = require("../controllers/CurriculoController");
const AuthController = require("../controllers/AuthController");
const MatchingController = require("../controllers/MatchingController");

// ------------------ MIDDLEWARES ------------------
const createUploader = require("../middlewares/upload");
const authMiddleware = require("../middlewares/authMiddleware");


// ====================================================
// ROTAS PÚBLICAS
// ====================================================

router.post("/auth/login", AuthController.login);

router.post("/user/create", UserController.create);

router.post("/company/create", createUploader("logos").single("logo"), CompanyController.create);

router.post("/candidato/create", CandidatoController.create);


// ====================================================
// ROTAS PROTEGIDAS (JWT OPCIONAL)
// ====================================================
// router.use(authMiddleware);


// ====================================================
// USUÁRIO
// ====================================================
router.get("/user", UserController.index);
router.get("/user/:id", UserController.show);
router.put("/user/update/:id", UserController.update);
router.delete("/user/delete/:id", UserController.delete);


// ====================================================
// EMPRESA
// ====================================================
router.get("/company", CompanyController.index);
router.get("/company/:id", CompanyController.show);
router.put("/company/update/:id", CompanyController.update);
router.delete("/company/delete/:id", CompanyController.delete);


// ====================================================
// CANDIDATO
// ====================================================
router.get("/candidato", CandidatoController.index);
router.get("/candidato/:id_user", CandidatoController.show);

router.put(
  "/candidato/update/:id_user",
  createUploader("fotos").single("foto"),
  CandidatoController.update
);

router.delete("/candidato/delete/:id_user", CandidatoController.delete);


// ====================================================
// SUBTIPO DEFICIÊNCIA
// ====================================================
router.get("/SubTipoDeficiencia", SubTipoDeficienciaController.index);
router.get("/SubTipoDeficiencia/:id", SubTipoDeficienciaController.show);
router.get("/SubTipoDeficiencia/tipo/:idTipo", SubTipoDeficienciaController.listarPorTipo);
router.post("/SubTipoDeficiencia/create", SubTipoDeficienciaController.create);
router.put("/SubTipoDeficiencia/update/:id", SubTipoDeficienciaController.update);
router.delete("/SubTipoDeficiencia/delete/:id", SubTipoDeficienciaController.delete);


// ====================================================
// TIPO DEFICIÊNCIA
// ====================================================
router.get("/TipoDeficiencia", TipoDeficienciaController.index);
router.get("/TipoDeficiencia/:id", TipoDeficienciaController.show);
router.post("/TipoDeficiencia/create", TipoDeficienciaController.create);
router.put("/TipoDeficiencia/update/:id", TipoDeficienciaController.update);
router.delete("/TipoDeficiencia/delete/:id", TipoDeficienciaController.delete);


// ====================================================
// BARRERAS
// ====================================================
router.get("/Barreira", BarreiraController.index);
router.get("/Barreira/:id", BarreiraController.show);
router.post("/Barreira/create", BarreiraController.create);
router.put("/Barreira/update/:id", BarreiraController.update);
router.delete("/Barreira/delete/:id", BarreiraController.delete);


// ====================================================
// SUBTIPO BARREIRA
// ====================================================
router.get("/SubTipoBarreira", SubTipoBarreiraController.index);
router.get("/SubTipoBarreira/:id", SubTipoBarreiraController.show);
router.post("/SubTipoBarreira/create/:id", SubTipoBarreiraController.create);
router.put("/SubTipoBarreira/update/:id", SubTipoBarreiraController.update);
router.delete("/SubTipoBarreira/delete/:id", SubTipoBarreiraController.delete);


// ====================================================
// ACESSIBILIDADES
// ====================================================
router.get("/Acessibilidade", AcessibilidadeController.index);
router.get("/Acessibilidade/:id", AcessibilidadeController.show);
router.post("/Acessibilidade/create", AcessibilidadeController.create);
router.put("/Acessibilidade/update/:id", AcessibilidadeController.update);
router.delete("/Acessibilidade/delete/:id", AcessibilidadeController.delete);


// ====================================================
// BARRERAS x ACESSIBILIDADES
// ====================================================
router.get("/BarreiraAcessibilidade", BarreiraAcessibilidadeController.index);
router.get("/BarreiraAcessibilidade/:id", BarreiraAcessibilidadeController.show);
router.post("/BarreiraAcessibilidade/create", BarreiraAcessibilidadeController.create);
router.put("/BarreiraAcessibilidade/update/:id", BarreiraAcessibilidadeController.update);
router.delete("/BarreiraAcessibilidade/delete/:id", BarreiraAcessibilidadeController.delete);


// ====================================================
// VAGAS
// ====================================================
router.get("/Vaga", VagaController.index);
router.get("/vaga/empresa/:idCompany", VagaController.vagasPorEmpresa);
router.get("/Vaga/:id", VagaController.show);
router.post("/Vaga/create", VagaController.create);
router.put("/Vaga/update/:id", VagaController.update);
router.delete("/Vaga/delete/:id", VagaController.delete);


// ====================================================
// VAGA DETALHES
// ====================================================
router.post("/vagadescricao/:id", VagaDescricaoController.create);
router.put("/vagadescricao/:id", VagaDescricaoController.update);

router.post("/vagabeneficio/:id", VagaBeneficioController.create);
router.put("/vagabeneficio/:id", VagaBeneficioController.update);

router.post("/vagaprocesso/:id", VagaProcessoController.create);
router.put("/vagaprocesso/:id", VagaProcessoController.update);

router.post("/vagarequisicao/:id", VagaRequisicaoController.create);
router.put("/vagarequisicao/:id", VagaRequisicaoController.update);


// ====================================================
// CURRÍCULO
// ====================================================
router.post("/criarCurriculo/:id", createUploader("curriculos").single("curriculo"), CurriculoController.create);
router.put("/updateCurriculo/:id", createUploader("curriculos").single("curriculo"), CurriculoController.update);
router.get("/buscarCurriculo/:id", CurriculoController.getByUserId);


// ====================================================
// CANDIDATURA
// ====================================================
router.get("/listarPorCandidato/:id", CandidaturaController.listarPorCandidato);
router.get("/listarPorVaga/:id", CandidaturaController.listarPorVaga);
router.post("/candidatura/create", CandidaturaController.create);
router.post("/candidatura/validar", CandidaturaController.jaCandidatado);
router.post("/candidatura/deletar", CandidaturaController.delete);


// ------------------ ASSOCIAÇÕES ------------------
router.post("/TipoDeficiencia/:id/SubTipoDeficiencia", SubTipoDeficienciaTipoDeficienciasController.create);
router.post("/Barreira/:id/SubTipoDeficiencia", BarreiraController.associarSubtipos);
router.post("/Barreira/:id/Acessibilidade", BarreiraAcessibilidadeController.associarSubtipos);


// ====================================================
// MATCHING ⚡ NOVAS ROTAS IMPORTANTES
// ====================================================
router.get("/vagas/recomendadas/:idCandidato", MatchingController.vagasRecomendadas);
router.get("/vagas/todas/:idCandidato", MatchingController.todasAsVagas);

module.exports = router;
