const { Op } = require("sequelize");
const Vaga = require("../models/Vaga");
const Acessibilidade = require("../models/Acessibilidade");
const VagaRequisicao = require("../models/VagaRequisicao");
const VagaBeneficio = require("../models/VagaBeneficio");

module.exports = {
  async filtrarVagas(query) {

    const where = {};
    const include = [];

    // -----------------------------
    // FILTRO BÁSICO
    // -----------------------------
    if (query.cidade) where.cidade = { [Op.iLike]: `%${query.cidade}%` };
    if (query.modelo) where.modelo = query.modelo;

    // -----------------------------
    // SALÁRIO
    // -----------------------------
    if (query.minSalario) {
      include.push({
        model: VagaBeneficio,
        as: "beneficio",
        where: { salario: { [Op.gte]: query.minSalario } }
      });
    }

    // -----------------------------
    // PROFISSIONAL (área)
    // -----------------------------
    if (query.area || query.conhecimento) {
      include.push({
        model: VagaRequisicao,
        as: "requisicao",
        where: {
          atuacao: query.area ? { [Op.iLike]: `%${query.area}%` } : undefined,
        }
      });
    }

    // -----------------------------
    // ACESSIBILIDADE
    // -----------------------------
    if (query.acessibilidade) {
      include.push({
        model: Acessibilidade,
        as: "acessibilidades",
        where: { descricao: query.acessibilidade },
        through: { attributes: [] }
      });
    }

    // -----------------------------
    // EXECUTAR CONSULTA
    // -----------------------------
    const vagas = await Vaga.findAll({
      where,
      include
    });

    return vagas;
  }
};
