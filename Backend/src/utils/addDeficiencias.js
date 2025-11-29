const { sequelize, 
  TipoDeficiencia, 
  SubtipoDeficiencia, 
  Barreira, 
  Acessibilidade, 
  SubTipoBarreiras, 
  BarreiraAcessibilidades,
  SubTipoDeficienciaTipoDeficiencias
} = require('../models');

async function seedDatabase() {
  try {
    console.log('🚀 Iniciando população do banco...');
    await sequelize.sync({ force: true });
    console.log('🧹 Banco resetado.');

    // ===== 20+ SUBTIPOS (sem FK agora) =====
    const subtipos = await SubtipoDeficiencia.bulkCreate([
      { nome: 'Cegueira' },
      { nome: 'Baixa Visão' },
      { nome: 'Daltonismo' },
      { nome: 'Sensibilidade à luz' },
      { nome: 'Surdez Total' },
      { nome: 'Perda Auditiva Leve' },
      { nome: 'Perda Auditiva Moderada' },
      { nome: 'Dificuldade de equilíbrio auditivo' },
      { nome: 'Amputação' },
      { nome: 'Paraplegia' },
      { nome: 'Tetraplegia' },
      { nome: 'Mobilidade reduzida' },
      { nome: 'Coordenação motora reduzida' },
      { nome: 'Síndrome de Down' },
      { nome: 'Autismo Leve' },
      { nome: 'Autismo Moderado' },
      { nome: 'Asperger Leve' },
      { nome: 'Dislexia Grau 1' },
      { nome: 'Déficit de atenção leve' },
      { nome: 'Sensibilidade sonora extrema' },
      { nome: 'Dificuldade de memorização' },
      { nome: 'Dificuldade de leitura' },
      { nome: 'Dificuldade de escrita' },
      { nome: 'Dificuldade de raciocínio lógico' }
    ]);
    console.log('✅ Subtipos inseridos.');

    // ===== 20+ TIPOS DE DEFICIÊNCIA =====
    const tipos = await TipoDeficiencia.bulkCreate([
      { nome: 'Deficiência Visual' },
      { nome: 'Deficiência Auditiva' },
      { nome: 'Deficiência Física' },
      { nome: 'Deficiência Intelectual' },
      { nome: 'Deficiência Múltipla' },
      { nome: 'Deficiência Motora' },
      { nome: 'Deficiência Neurológica' },
      { nome: 'Deficiência Sensorial' },
      { nome: 'Deficiência Psíquica' },
      { nome: 'TEA - Transtorno do Espectro Autista' },
      { nome: 'Dislexia' },
      { nome: 'TDAH' },
      { nome: 'Síndrome de Down' },
      { nome: 'Paralisia Cerebral' },
      { nome: 'Surdez Profunda' },
      { nome: 'Cegueira Total' },
      { nome: 'Baixa Audição' },
      { nome: 'Paralisia parcial de membros' },
      { nome: 'Transtornos emocionais' },
      { nome: 'Deficiência Cognitiva' }
    ]);
    console.log('✅ Tipos de deficiência inseridos.');

    // ===== 20+ BARREIRAS =====
    const barreiras = await Barreira.bulkCreate([
      { descricao: 'Falta de rampas de acesso' },
      { descricao: 'Ausência de piso tátil' },
      { descricao: 'Elevador inoperante' },
      { descricao: 'Atendimento sem intérprete de Libras' },
      { descricao: 'Portas estreitas' },
      { descricao: 'Corredores sem espaço para locomoção' },
      { descricao: 'Banheiros não adaptados' },
      { descricao: 'Plataforma digital sem acessibilidade' },
      { descricao: 'Sistema sem leitor de tela' },
      { descricao: 'Conteúdo sem linguagem simplificada' },
      { descricao: 'Vídeos sem legenda' },
      { descricao: 'Ausência de audiodescrição' },
      { descricao: 'Falta de apoio pedagógico' },
      { descricao: 'Ambientes barulhentos' },
      { descricao: 'Iluminação excessiva' },
      { descricao: 'Falta de sinalização visual clara' },
      { descricao: 'Não há alerta luminoso' },
      { descricao: 'Não há alerta sonoro' },
      { descricao: 'Falta de softwares assistivos' },
      { descricao: 'Vagas PCD insuficientes' },
      { descricao: 'Ausência de mobiliário adaptado' },
      { descricao: 'Falta de tecnologia inclusiva' },
      { descricao: 'Desnível no piso' },
      { descricao: 'Falta de comunicação acessível' }
    ]);
    console.log('✅ Barreiras inseridas.');

    // ===== 20+ ACESSIBILIDADES =====
    const acessibilidades = await Acessibilidade.bulkCreate([
      { descricao: 'Rampas adequadas' },
      { descricao: 'Piso tátil instalado' },
      { descricao: 'Elevador funcionando' },
      { descricao: 'Intérprete de Libras no atendimento' },
      { descricao: 'Portas automáticas ou largas' },
      { descricao: 'Corredores com espaço adequado' },
      { descricao: 'Banheiros adaptados' },
      { descricao: 'Sistema com leitor de tela' },
      { descricao: 'Conteúdo com linguagem simples' },
      { descricao: 'Legendas em vídeos' },
      { descricao: 'Audiodescrição disponível' },
      { descricao: 'Alerta luminoso' },
      { descricao: 'Alerta sonoro' },
      { descricao: 'Apoio pedagógico especializado' },
      { descricao: 'Softwares assistivos' },
      { descricao: 'Mobiliário adaptado' },
      { descricao: 'Mídias acessíveis' },
      { descricao: 'Treinamento no atendimento' },
      { descricao: 'Tecnologia assistiva disponível' },
      { descricao: 'Comunicação visual clara' },
      { descricao: 'Plataforma digital acessível' },
      { descricao: 'Conteúdo organizado e explicativo' },
      { descricao: 'Mapas e placas acessíveis' },
      { descricao: 'Suporte especializado' },
      { descricao: 'Equipamentos PCD disponíveis' }
    ]);
    console.log('✅ Acessibilidades inseridas.');

    // ===== 20+ RELAÇÕES SUBTIPO ↔ TIPO =====
    const relSubTipoTipo = [];
    for (let i = 0; i < subtipos.length; i++) {
      for (let j = 0; j < tipos.length; j++) {
        if (relSubTipoTipo.length >= 24) break; // já garante 20+
        relSubTipoTipo.push({
          id_tipodeficiencia: tipos[j].id,
          id_subtipodeficiencia: subtipos[i].id
        });
      }
      if (relSubTipoTipo.length >= 24) break;
    }
    await SubTipoDeficienciaTipoDeficiencias.bulkCreate(relSubTipoTipo);
    console.log('🔗 Relação Subtipo ↔ Tipo inserida.');

    // ===== 20+ RELAÇÕES SUBTIPO ↔ BARREIRA =====
    const relSubBarreira = [];
    for (let i = 0; i < 24; i++) {
      relSubBarreira.push({
        id_subtipodeficiencia: subtipos[i % subtipos.length].id,
        id_barreira: barreiras[i % barreiras.length].id
      });
    }
    await SubTipoBarreiras.bulkCreate(relSubBarreira);
    console.log('🔗 Relação Subtipo ↔ Barreira inserida.');

    // ===== 20+ RELAÇÕES BARREIRA ↔ ACESSIBILIDADE =====
    const relBarreiraAcess = [];
    for (let i = 0; i < 24; i++) {
      relBarreiraAcess.push({
        id_barreira: barreiras[i % barreiras.length].id,
        id_acessibilidade: acessibilidades[i % acessibilidades.length].id
      });
    }
    await BarreiraAcessibilidades.bulkCreate(relBarreiraAcess);
    console.log('🔗 Relação Barreira ↔ Acessibilidade inserida.');

    console.log('🎉 Banco populado com sucesso!');
    await sequelize.close();

  } catch (err) {
    console.error('❌ Erro no seed:', err);
    await sequelize.close();
  }
}

seedDatabase();
