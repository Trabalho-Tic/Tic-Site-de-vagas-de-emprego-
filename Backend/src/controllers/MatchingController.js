const Candidato = require("../models/Candidato");
const SubtipoDeficiencia = require("../models/SubTipoDeficiencia");
const SubTipoBarreiras = require("../models/SubTipoBarreiras");
const Barreira = require("../models/Barreira");
const Acessibilidade = require("../models/Acessibilidade");
const Vaga = require("../models/Vaga");

class MatchingController {


  // ============================================================
  // 1) VAGAS 100% COMPATÍVEIS (RECOMENDADAS)
  // ============================================================
  async vagasRecomendadas(req, res) {
    const { idCandidato } = req.params;

    try {
      // 1. Carregar candidato com:
      // - Subtipos de deficiência
      // - Barreiras gerais
      // - SubTipoBarreiras (barreiras específicas)
      const candidato = await Candidato.findOne({
        where: { id_user: idCandidato },
        include: [
          {
            model: SubtipoDeficiencia,
            as: "subtipos",
            include: [
              {
                model: Barreira,
                as: "barreiras",
                include: [
                  { model: Acessibilidade, as: "acessibilidades" }
                ]
              },
              {
                model: SubTipoBarreiras,
                as: "subtipoBarreiras",
                include: [
                  { model: Acessibilidade, as: "acessibilidades" }
                ]
              }
            ]
          }
        ]
      });

      if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      // 2. Juntar todas acessibilidades obrigatórias
      let acessNecessarias = new Set();

      // Barreiras gerais
      candidato.subtipos.forEach(sub => {
        sub.barreiras?.forEach(bar => {
          bar.acessibilidades?.forEach(ac => {
            acessNecessarias.add(ac.id);
          });
        });
      });

      // Barreiras específicas (SubTipoBarreiras)
      candidato.subtipos.forEach(sub => {
        sub.subtipoBarreiras?.forEach(stb => {
          stb.acessibilidades?.forEach(ac => {
            acessNecessarias.add(ac.id);
          });
        });
      });

      const obrigatorias = [...acessNecessarias];

      if (obrigatorias.length === 0) {
        return res.json({
          recomendadas: [],
          message: "Nenhuma acessibilidade necessária encontrada para este candidato."
        });
      }

      // 3. Buscar todas as vagas
      const vagas = await Vaga.findAll({
        include: [
          { model: Acessibilidade, as: "acessibilidades" }
        ]
      });

      // 4. Filtrar vagas perfeitas
      let vagasCompatíveis = [];

      vagas.forEach(vaga => {
        const acessVaga = vaga.acessibilidades.map(a => a.id);

        const atendeTodas = obrigatorias.every(necessaria =>
          acessVaga.includes(necessaria)
        );

        if (atendeTodas) {
          vagasCompatíveis.push({
            vaga,
            score: 100,
            faltando: [],
            atendeTotal: true
          });
        }
      });

      return res.json({
        total: vagasCompatíveis.length,
        obrigatorias,
        recomendadas: vagasCompatíveis
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro no matching recomendado" });
    }
  }



  // ============================================================
  // 2) TODAS AS VAGAS + SCORE DE COMPATIBILIDADE
  // ============================================================
  async todasAsVagas(req, res) {
    const { idCandidato } = req.params;

    try {
      // 1. Buscar candidato com tudo necessário
      const candidato = await Candidato.findOne({
        where: { id_user: idCandidato },
        include: [
          {
            model: SubtipoDeficiencia,
            as: "subtipos",
            include: [
              {
                model: Barreira,
                as: "barreiras",
                include: [
                  { model: Acessibilidade, as: "acessibilidades" }
                ]
              },
              {
                model: SubTipoBarreiras,
                as: "subtipoBarreiras",
                include: [
                  { model: Acessibilidade, as: "acessibilidades" }
                ]
              }
            ]
          }
        ]
      });

      if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      // 2. Coletar acessibilidades obrigatórias
      let acessNecessarias = new Set();

      candidato.subtipos.forEach(sub => {
        sub.barreiras?.forEach(bar => {
          bar.acessibilidades?.forEach(ac => {
            acessNecessarias.add(ac.id);
          });
        });
      });

      candidato.subtipos.forEach(sub => {
        sub.subtipoBarreiras?.forEach(stb => {
          stb.acessibilidades?.forEach(ac => {
            acessNecessarias.add(ac.id);
          });
        });
      });

      const obrigatorias = [...acessNecessarias];

      // 3. Buscar vagas
      const vagas = await Vaga.findAll({
        include: [
          { model: Acessibilidade, as: "acessibilidades" }
        ]
      });

      // 4. Calcular score
      let vagasComScore = [];

      vagas.forEach(vaga => {
        const acessVaga = vaga.acessibilidades.map(a => a.id);

        const totalNec = obrigatorias.length;
        const cobridas = obrigatorias.filter(necessaria =>
          acessVaga.includes(necessaria)
        ).length;

        const faltando = obrigatorias.filter(necessaria =>
          !acessVaga.includes(necessaria)
        );

        const score = totalNec === 0
          ? 0
          : Math.round((cobridas / totalNec) * 100);

        vagasComScore.push({
          vaga,
          score,
          faltando,
          atendeTotal: score === 100
        });
      });

      return res.json({
        total: vagasComScore.length,
        obrigatorias,
        vagas: vagasComScore
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao listar vagas" });
    }
  }
}

module.exports = new MatchingController();
