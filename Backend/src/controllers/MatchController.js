const matchService = require("../services/matchService");

class MatchController {
  async recomendadas(req, res) {
    const { candidatoId } = req.params;

    try {
      const resultado = await matchService.calcularMatch(candidatoId);

      return res.json(resultado);
    } catch (error) {
      console.error("Erro no MatchController.recomendadas:", error);
      return res.status(500).json({ error: "Erro ao gerar vagas recomendadas" });
    }
  }
}

module.exports = new MatchController();
