const Vaga = require("../models/Vaga");
const Acessibilidade = require("../models/Acessibilidade");

class VagaAcessibilidadeController {
  async create(req, res) {
    const { id } = req.params;
    const { acessibilidades } = req.body;

    try {
      const vaga = await Vaga.findByPk(id);

      if (!vaga) {
        return res.status(404).json({ error: "Vaga não encontrada" });
      }

      if (!Array.isArray(acessibilidades)) {
        return res.status(400).json({ error: "Envie um array de IDs de acessibilidades" });
      }

      // ⚡ vincula N:N
      await vaga.setAcessibilidades(acessibilidades);

      return res.json({ message: "Acessibilidades salvas com sucesso" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao vincular acessibilidades" });
    }
  }
}

module.exports = new VagaAcessibilidadeController();
