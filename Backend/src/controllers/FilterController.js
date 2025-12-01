const filterService = require("../services/filterService");
const matchService = require("../services/matchService");

class FilterController {
  async filtrar(req, res) {
    try {
      const filtros = await filterService.filtrarVagas(req.query);

      // Caso candidatoId venha na query → combinar com match
      if (req.query.candidatoId) {
        const match = await matchService.calcularMatch(req.query.candidatoId);

        const filtradasComScore = match.filter((m) =>
          filtros.some((v) => v.id === m.vaga.id)
        );

        return res.json(filtradasComScore);
      }

      return res.json(filtros);
    } catch (error) {
      console.error("Erro no FilterController.filtrar:", error);
      return res.status(500).json({ error: "Erro ao filtrar vagas" });
    }
  }
}

module.exports = new FilterController();
