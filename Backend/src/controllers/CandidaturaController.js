const Candidatura = require("../models/Candidatura");
const Candidato = require("../models/Candidato");
const Vaga = require("../models/Vaga");

class CandidaturaController {
  // 🧠 Criar uma candidatura (candidato se candidatando)
  async create(req, res) {
    try {
      const { id_vaga, id_candidato } = req.body;

      if (!id_vaga || !id_candidato) {
        return res.status(400).json({ error: "id_vaga e id_candidato são obrigatórios." });
      }

      // Impedir duplicações
      const existente = await Candidatura.findOne({
        where: { id_vaga, id_candidato },
      });

      if (existente) {
        return res.status(400).json({ error: "Você já se candidatou a esta vaga." });
      }

      const nova = await Candidatura.create({ id_vaga, id_candidato });
      return res.status(201).json(nova);
    } catch (error) {
      console.error("❌ Erro ao criar candidatura:", error);
      return res.status(500).json({ error: "Erro interno ao criar candidatura." });
    }
  }

  // 📋 Listar candidaturas de uma vaga (empresa visualiza)
  async listarPorVaga(req, res) {
    try {
      const { id_vaga } = req.params;
      const candidaturas = await Candidatura.findAll({
        where: { id_vaga },
        include: [
          {
            model: Candidato,
            as: "candidato",
            include: ["user"], // inclui os dados do usuário (nome, email, etc)
          },
        ],
      });

      return res.json(candidaturas);
    } catch (error) {
      console.error("❌ Erro ao listar candidaturas por vaga:", error);
      return res.status(500).json({ error: "Erro ao buscar candidaturas da vaga." });
    }
  }

  // 🙋‍♂️ Listar candidaturas de um candidato (para ele ver onde se inscreveu)
  async listarPorCandidato(req, res) {
    try {
      const { id_candidato } = req.params;
      const candidaturas = await Candidatura.findAll({
        where: { id_candidato },
        include: [
          {
            model: Vaga,
            as: "vaga",
            include: ["empresa"], // inclui dados da empresa
          },
        ],
      });

      return res.json(candidaturas);
    } catch (error) {
      console.error("❌ Erro ao listar candidaturas do candidato:", error);
      return res.status(500).json({ error: "Erro ao buscar candidaturas do candidato." });
    }
  }
  
  async jaCandidatado(req, res) {
    try {
      const { id_vaga, id_candidato } = req.body;
      const candidatura = await Candidatura.findOne({
        where: { id_candidato, id_vaga },
      });

      return res.json(!!candidatura);
    } catch (error) {
      console.error("❌ Erro ao listar candidaturas do candidato:", error);
      return res.status(500).json({ error: "Erro ao buscar candidaturas do candidato." });
    }
  }

  // ❌ Deletar candidatura (cancelar inscrição)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const candidatura = await Candidatura.findByPk(id);
      if (!candidatura)
        return res.status(404).json({ error: "Candidatura não encontrada." });

      await candidatura.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error("❌ Erro ao deletar candidatura:", error);
      return res.status(500).json({ error: "Erro ao deletar candidatura." });
    }
  }
}

module.exports = new CandidaturaController();
