const CandidatoCurriculo = require('../models/CandidatoCurriculo');

class CandidatoCurriculoController {
  // ===========================
  // 🔹 CRIAR CURRÍCULO
  // ===========================
  async create(request, response) {
    const { id } = request.params;
    const { resumoProf, experiencias, formacao, cursos, habilidades } = request.body;

    try {
      const candidatoCurriculo = await CandidatoCurriculo.create({
        id_user: id,
        curriculo: request.file ? request.file.filename : null, // arquivo opcional
        resumoProf,
        experiencias,
        formacao,
        cursos,
        habilidades,
      });

      return response.status(201).json(candidatoCurriculo);
    } catch (error) {
      console.error("Erro ao criar CandidatoCurriculo:", error);
      return response.status(500).json({ error: "Erro ao criar CandidatoCurriculo" });
    }
  }

  // ===========================
  // 🔹 ATUALIZAR CURRÍCULO
  // ===========================
  async update(request, response) {
    const { id } = request.params;
    const file = request.file;

    try {
      const candidatoCurriculo = await CandidatoCurriculo.findOne({
        where: { id_user: id },
      });

      if (!candidatoCurriculo) {
        return response.status(404).json({ error: "CandidatoCurriculo não encontrado" });
      }

      const updatedData = { ...request.body };

      // Substitui arquivo se houver novo
      if (file) {
        updatedData.curriculo = file.filename;
      }

      // Remove o arquivo se vier string vazia
      if (request.body.curriculo === "") {
        updatedData.curriculo = null;
      }

      await candidatoCurriculo.update(updatedData);
      return response.json(candidatoCurriculo);
    } catch (error) {
      console.error("Erro ao atualizar CandidatoCurriculo:", error);
      return response.status(500).json({ error: "Erro ao atualizar CandidatoCurriculo" });
    }
  }

  // ===========================
  // 🔹 BUSCAR POR ID DO USUÁRIO
  // ===========================
  async getByUserId(request, response) {
    const { id } = request.params;

    try {
      const candidatoCurriculo = await CandidatoCurriculo.findOne({
        where: { id_user: id },
      });

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
