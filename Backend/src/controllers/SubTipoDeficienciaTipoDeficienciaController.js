const SubTipoDeficienciaTipoDeficiencias = require("../models/SubTipoDeficienciaTipoDeficiencia");
const TipoDeficiencia = require("../models/TipoDeficiencia");

class SubTipoDeficienciaTipoDeficienciasController {
  async create(request, response) {
    const { id } = request.params;
    const { subtiposIds } = request.body;

    if (!Array.isArray(subtiposIds)) {
      return response.status(400).json({ error: "subtiposIds deve ser um array de UUIDs!" });
    }

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
