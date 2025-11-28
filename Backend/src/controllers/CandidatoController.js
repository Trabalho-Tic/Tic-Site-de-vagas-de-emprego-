const Candidato = require('../models/Candidato');
const User = require('../models/User');
const SubtipoDeficiencia = require('../models/SubTipoDeficiencia');

class CandidatoController {

  // =========================================================
  // LISTAR TODOS OS CANDIDATOS
  // =========================================================
  async index(req, res) {
    try {
      const candidatos = await Candidato.findAll({
        include: [
          { 
            model: User, 
            as: 'user', 
            attributes: ['id', 'nome', 'email', 'telefone'] 
          },
          {
            model: SubtipoDeficiencia,
            as: "subtipos",
            attributes: ["id", "nome"]
          }
        ],
      });

      return res.json(candidatos);
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error);
      return res.status(500).json({ error: "Erro ao buscar candidatos" });
    }
  }

  // =========================================================
  // BUSCAR UM CANDIDATO ESPECÍFICO
  // =========================================================
  async show(req, res) {
    const { id_user } = req.params;

    try {
      const candidato = await Candidato.findOne({
        where: { id_user },
        include: [
          { 
            model: User, 
            as: 'user', 
            attributes: ['id', 'nome', 'email', 'telefone'] 
          },
          {
            model: SubtipoDeficiencia,
            as: "subtipos",
            attributes: ["id", "nome"]
          }
        ],
      });

      if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      return res.json(candidato);
    } catch (error) {
      console.error("Erro ao buscar candidato:", error);
      return res.status(500).json({ error: "Erro ao buscar candidato" });
    }
  }

  // =========================================================
  // CRIAR NOVO CANDIDATO
  // =========================================================
  async create(req, res) {
    try {
      const { cpf, subtipos } = req.body;

      const existing = await Candidato.findOne({ where: { cpf } });
      if (existing) {
        return res.status(400).json({ error: "CPF já cadastrado" });
      }

      const candidato = await Candidato.create(req.body);

      // Se quiser permitir subtipos no cadastro:
      if (subtipos && subtipos.length > 0) {
        await candidato.setSubtipos(subtipos);
      }

      return res.status(201).json(candidato);
    } catch (error) {
      console.error("Erro ao criar candidato:", error);
      return res.status(500).json({ error: "Erro ao criar candidato" });
    }
  }

  // =========================================================
  // ATUALIZAR DADOS DO CANDIDATO
  // =========================================================
  async update(req, res) {
    const { id } = req.params;
    const { subtipos } = req.body;

    try {
      const candidato = await Candidato.findOne({ where: { id_user: id } });

      if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      // Foto se enviada pelo multer
      if (req.file) {
        req.body.foto = req.file.filename;
      }

      // Atualiza subtipos (TB PIVOT)
      if (subtipos && Array.isArray(subtipos)) {
        await candidato.setSubtipos(subtipos);
      }

      await candidato.update(req.body);

      return res.json(candidato);
    } catch (error) {
      console.error("Erro ao atualizar candidato:", error);
      return res.status(500).json({ error: "Erro ao atualizar candidato" });
    }
  }

  // =========================================================
  // DELETAR CANDIDATO
  // =========================================================
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
      console.error("Erro ao deletar candidato:", error);
      return res.status(500).json({ error: "Erro ao deletar candidato" });
    }
  }
}

module.exports = new CandidatoController();
