const Candidato = require("../models/Candidato");
const SubtipoDeficiencia = require("../models/SubTipoDeficiencia");
const Acessibilidade = require("../models/Acessibilidade");
const Vaga = require("../models/Vaga");
const SubTipoBarreiras = require("../models/SubTipoBarreiras");
const BarreiraAcessibilidades = require("../models/BarreiraAcessibilidade");

module.exports = {
  async calcularMatch(idCandidato) {
    
    const candidato = await Candidato.findByPk(idCandidato, {
      include: [{ model: SubtipoDeficiencia, as: "subtipos" }]
    });

    if (!candidato || candidato.subtipos.length === 0) {
      // candidato sem subtipos → score 0 para todas as vagas
      const vagas = await Vaga.findAll({
        include: [{ model: Acessibilidade, as: "acessibilidades" }]
      });

      return vagas.map(vaga => ({
        vaga,
        score: 0,
        porcentagem: 0,
        barreirasCandid: 0,
        cobertas: 0,
        faltando: 0
      }));
    }

    // 1️⃣ barreiras relacionadas ao candidato
    const barreiras = await SubTipoBarreiras.findAll({
      where: { id_subtipodeficiencia: candidato.subtipos.map(s => s.id) }
    });

    const barreirasIds = barreiras.map(b => b.id_barreira);

    // 2️⃣ acessibilidades necessárias
    const acessCompat = await BarreiraAcessibilidades.findAll({
      where: { id_barreira: barreirasIds }
    });

    const acessCompatIds = [...new Set(acessCompat.map(a => a.id_acessibilidade))];

    // 3️⃣ vagas com acessibilidades
    const vagas = await Vaga.findAll({
      include: [{ model: Acessibilidade, as: "acessibilidades" }]
    });

    // 4️⃣ calcular score
    const totalBarreiras = acessCompatIds.length;

    const resultado = vagas.map(vaga => {

      const acessVagaIds = vaga.acessibilidades.map(a => a.id);

      const matching = acessVagaIds.filter(id => acessCompatIds.includes(id));

      const score = totalBarreiras === 0 ? 0 : matching.length / totalBarreiras;

      return {
        vaga,
        score,
        porcentagem: Math.round(score * 100),
        barreirasCandid: totalBarreiras,
        cobertas: matching.length,
        faltando: totalBarreiras - matching.length
      };
    });

    // ordenar por compatibilidade
    return resultado.sort((a, b) => b.score - a.score);
  }
};
