const Candidato = require('../models/Candidato');
const User = require('../models/User');

class CandidatoController {
  async index(req, res) {
    try {
      const candidatos = await Candidato.findAll({
        include: { model: User, as: 'user', attributes: ['id', 'nome', 'email', 'telefone'] },
      });
      return res.json(candidatos);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar candidatos" });
    }
  }

  async show(req, res) {
    const { id_user } = req.params;
    try {
      const candidato = await Candidato.findOne({
        where: { id_user },
        include: { model: User, as: 'user', attributes: ['id', 'nome', 'email'] },
      });

      if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      return res.json(candidato);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar candidato" });
    }
  }

  async create(req, res) {
    const { id_user, cpf } = req.body;

    try {
      const existing = await Candidato.findOne({ where: { cpf } });
      if (existing) {
        return res.status(400).json({ error: "CPF já cadastrado" });
      }

      const candidato = await Candidato.create(req.body);
      return res.status(201).json(candidato);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar candidato" });
    }
  }

  async update(req, res) {
    const { id_user } = req.params;

    try {
      const candidato = await Candidato.findOne({ where: { id_user } });
      if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      await candidato.update(req.body);
      return res.json(candidato);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar candidato" });
    }
  }

  async delete(req, res) {
    const { id_user } = req.params;
    try {
      const candidato = await Candidato.findOne({ where: { id_user } });
      if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      await candidato.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar candidato" });
    }
  }
}

module.exports = new CandidatoController();
