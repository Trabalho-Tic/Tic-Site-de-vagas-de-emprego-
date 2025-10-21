const { sequelize, 
    TipoDeficiencia, 
    SubtipoDeficiencia, 
    Barreira, 
    Acessibilidade, 
    SubTipoBarreiras, 
    BarreiraAcessibilidades 
} = require('../models');

async function seedDatabase() {
  try {
    console.log('🚀 Iniciando população do banco de dados...');

    await sequelize.sync({ force: true });
    console.log('🧹 Tabelas recriadas com sucesso.');

    // ===== TIPOS DE DEFICIÊNCIA =====
    const tipos = await TipoDeficiencia.bulkCreate([
      { nome: 'Deficiência Visual' },
      { nome: 'Deficiência Auditiva' },
      { nome: 'Deficiência Física' },
      { nome: 'Deficiência Intelectual' },
      { nome: 'Deficiência Múltipla' },
      { nome: 'Transtornos de Aprendizagem' },
      { nome: 'Deficiência Psíquica' },
      { nome: 'Deficiência Motora' },
      { nome: 'Deficiência Neurológica' },
      { nome: 'Deficiência Sensorial' },
      { nome: 'Deficiência Cognitiva' },
      { nome: 'Deficiência Auditiva Profunda' },
      { nome: 'Deficiência Visual Total' },
      { nome: 'Deficiência Física Parcial' },
      { nome: 'Deficiência Combinada' },
      { nome: 'Síndrome de Asperger' },
      { nome: 'Dislexia' },
      { nome: 'Paralisia Cerebral' },
      { nome: 'Deficiência Auditiva Leve' },
      { nome: 'Deficiência Visual Parcial' }
    ]);
    console.log('✅ Tipos de Deficiência inseridos.');

    // ===== SUBTIPOS =====
    const subtipos = await SubtipoDeficiencia.bulkCreate([
      { nome: 'Cegueira', id_tipodeficiencia: tipos[0].id },
      { nome: 'Baixa Visão', id_tipodeficiencia: tipos[0].id },
      { nome: 'Surdez', id_tipodeficiencia: tipos[1].id },
      { nome: 'Deficiência Auditiva Parcial', id_tipodeficiencia: tipos[1].id },
      { nome: 'Paraplegia', id_tipodeficiencia: tipos[2].id },
      { nome: 'Tetraplegia', id_tipodeficiencia: tipos[2].id },
      { nome: 'Síndrome de Down', id_tipodeficiencia: tipos[3].id },
      { nome: 'Autismo', id_tipodeficiencia: tipos[3].id },
      { nome: 'Dislexia', id_tipodeficiencia: tipos[5].id },
      { nome: 'Transtorno de Atenção', id_tipodeficiencia: tipos[5].id },
      { nome: 'Paralisia Cerebral', id_tipodeficiencia: tipos[7].id },
      { nome: 'Espasticidade', id_tipodeficiencia: tipos[7].id },
      { nome: 'Síndrome de Asperger', id_tipodeficiencia: tipos[15].id },
      { nome: 'Deficiência Cognitiva Leve', id_tipodeficiencia: tipos[10].id },
      { nome: 'Deficiência Auditiva Profunda', id_tipodeficiencia: tipos[11].id },
      { nome: 'Deficiência Visual Total', id_tipodeficiencia: tipos[12].id },
      { nome: 'Deficiência Física Parcial', id_tipodeficiencia: tipos[13].id },
      { nome: 'Deficiência Combinada', id_tipodeficiencia: tipos[14].id },
      { nome: 'Deficiência Neurológica', id_tipodeficiencia: tipos[8].id },
      { nome: 'Deficiência Sensorial Parcial', id_tipodeficiencia: tipos[9].id }
    ]);
    console.log('✅ Subtipos de Deficiência inseridos.');

    // ===== BARREIRAS =====
    const barreiras = await Barreira.bulkCreate([
      { descricao: 'Falta de rampas de acesso' },
      { descricao: 'Ausência de sinalização tátil' },
      { descricao: 'Falta de intérprete de Libras' },
      { descricao: 'Escadas sem corrimão' },
      { descricao: 'Falta de material em braile' },
      { descricao: 'Banheiros inacessíveis' },
      { descricao: 'Portas estreitas' },
      { descricao: 'Corredores apertados' },
      { descricao: 'Falta de transporte adaptado' },
      { descricao: 'Sinalização inadequada' },
      { descricao: 'Falta de apoio pedagógico' },
      { descricao: 'Falta de equipamentos adaptados' },
      { descricao: 'Barreiras cognitivas' },
      { descricao: 'Falta de tecnologia assistiva' },
      { descricao: 'Desnível no piso' },
      { descricao: 'Falta de cadeiras de rodas' },
      { descricao: 'Falta de suporte emocional' },
      { descricao: 'Falta de audiodescrição' },
      { descricao: 'Falta de alerta sonoro' },
      { descricao: 'Falta de legendas em vídeos' }
    ]);
    console.log('✅ Barreiras inseridas.');

    // ===== ACESSIBILIDADES =====
    const acessibilidades = await Acessibilidade.bulkCreate([
      { descricao: 'Rampa de acesso' },
      { descricao: 'Elevador adaptado' },
      { descricao: 'Sinalização tátil' },
      { descricao: 'Intérprete de Libras' },
      { descricao: 'Material em braile' },
      { descricao: 'Software leitor de tela' },
      { descricao: 'Banheiro acessível' },
      { descricao: 'Portas automáticas' },
      { descricao: 'Corredores ampliados' },
      { descricao: 'Transporte adaptado' },
      { descricao: 'Apoio pedagógico' },
      { descricao: 'Equipamentos adaptados' },
      { descricao: 'Tecnologia assistiva' },
      { descricao: 'Alerta sonoro' },
      { descricao: 'Audiodescrição' },
      { descricao: 'Legendagem de vídeos' },
      { descricao: 'Piso nivelado' },
      { descricao: 'Cadeira de rodas disponível' },
      { descricao: 'Suporte emocional' },
      { descricao: 'Plataformas digitais acessíveis' }
    ]);
    console.log('✅ Acessibilidades inseridas.');

    // ===== RELAÇÃO SUBTIPO ↔ BARREIRA =====
    const subTipoBarreirasData = [];
    for (let i = 0; i < subtipos.length; i++) {
      const barreiraIndex = i % barreiras.length; // Distribui as barreiras de forma circular
      subTipoBarreirasData.push({ id_subtipodeficiencia: subtipos[i].id, id_barreira: barreiras[barreiraIndex].id });
    }
    await SubTipoBarreiras.bulkCreate(subTipoBarreirasData);
    console.log('✅ Relações Subtipo ↔ Barreira inseridas.');

    // ===== RELAÇÃO BARREIRA ↔ ACESSIBILIDADE =====
    const barreiraAcessibilidadeData = [];
    for (let i = 0; i < barreiras.length; i++) {
      const acessibilidadeIndex = i % acessibilidades.length;
      barreiraAcessibilidadeData.push({ id_barreira: barreiras[i].id, id_acessibilidade: acessibilidades[acessibilidadeIndex].id });
    }
    await BarreiraAcessibilidades.bulkCreate(barreiraAcessibilidadeData);
    console.log('✅ Relações Barreira ↔ Acessibilidade inseridas.');

    console.log('🎉 Banco populado com sucesso!');
    await sequelize.close();
  } catch (error) {
    console.error('❌ Erro ao popular o banco:', error);
  }
}

seedDatabase();
