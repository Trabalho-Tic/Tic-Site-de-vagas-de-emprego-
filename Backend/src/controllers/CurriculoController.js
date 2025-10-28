const CandidatoCurriculo = require('../models/CandidatoCurriculo');

class CandidatoCurriculoController {

   async create(request, response) {
    const { id } = request.params;
    const { resumoProf, experiencias, formacao, cursos } = request.body;

    try {
      if (!request.file) {
        return response.status(400).json({ error: "Arquivo de currículo é obrigatório." });
      }

      const candidatoCurriculo = await CandidatoCurriculo.create({
        id_user: id,
        curriculo: request.file.filename, // nome do arquivo salvo pelo multer
        resumoProf,
        experiencias,
        formacao,
        cursos,
      });

      return response.json(candidatoCurriculo);
    } catch (error) {
      console.error("Erro ao criar CandidatoCurriculo:", error);
      return response.status(500).json({ error: "Erro ao criar CandidatoCurriculo" });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const file = request.file;

    try {
      const candidatoCurriculo = await CandidatoCurriculo.findByPk(id);
      if (!candidatoCurriculo) {
        return response.status(404).json({ error: "CandidatoCurriculo não encontrado" });
      }

      const updatedData = { ...request.body };
      if (file) updatedData.curriculo = file.filename;

      await candidatoCurriculo.update(updatedData);
      return response.json(candidatoCurriculo);
    } catch (error) {
      console.error("Erro ao atualizar CandidatoCurriculo:", error);
      return response.status(500).json({ error: "Erro ao atualizar CandidatoCurriculo" });
    }
  }

  async getByUserId(request, response) {
    const { id } = request.params;
    try {
      const candidatoCurriculo = await CandidatoCurriculo.findByPk(id);
      if (!candidatoCurriculo) {
        return response.status(404).json({ error: "CandidatoCurriculo não encontrado" });
      }
      return response.json(candidatoCurriculo);
    } catch (error) {
      console.error("Erro ao buscar CandidatoCurriculo:", error);
      return response.status(500).json({ error: "Erro ao buscar CandidatoCurriculo" });
    }
  }
}

module.exports = new CandidatoCurriculoController();
