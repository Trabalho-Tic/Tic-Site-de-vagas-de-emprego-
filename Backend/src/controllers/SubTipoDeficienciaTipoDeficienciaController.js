const SubTipoDeficienciaTipoDeficiencias = require("../models/SubTipoDeficienciaTipoDeficiencia");
const TipoDeficiencia = require("../models/TipoDeficiencia");

class SubTipoDeficienciaTipoDeficienciasController {

  async index(request, response) {

    const { id } = request.params;

    try {
      const registros = await SubTipoDeficienciaTipoDeficiencias.findAll({
        where: { id_tipodeficiencia: id }
      });
      return response.json(registros);
    } catch (err) {
      return response.status(500).json({ error: "Erro ao buscar registros N:N" });
    }
  }

  async create(request, response) {
    const { id } = request.params;
    const { subtiposIds } = request.body;

    try {
      const tipo = await TipoDeficiencia.findByPk(id);
      if (!tipo) return response.status(404).json({ error: "TipoDeficiencia não encontrado" });

      const registros = subtiposIds.map(subId => ({
        id_tipodeficiencia: id,
        id_subtipodeficiencia: subId
      }));

      await SubTipoDeficienciaTipoDeficiencias.bulkCreate(registros, { ignoreDuplicates: true });

      return response.json({ message: "Criado com sucesso!", registrosCriados: registros });

    } catch (err) {
      console.error("ERRO:", err);
      return response.status(500).json({ error: "Erro ao criar vínculo N:N" });
    }
  }
}

module.exports = new SubTipoDeficienciaTipoDeficienciasController();
