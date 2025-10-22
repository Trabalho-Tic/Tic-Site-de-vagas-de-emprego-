require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const db = require('../models'); // importa sequelize e todos os models

async function addCompany() {
  try {

    // Cria a empresa
    const company = await db.company.create({
      id: uuidv4(), // pode gerar UUID manualmente ou deixar o default
      nome: "Tech Solutions",
      cnpj: "12.345.678/0001-99",
      logo: "https://exemplo.com/logo.png",
      url_site: "https://techsolutions.com",
      email: "contato@techsolutions.com",
      category: "Tecnologia",
      pais: "Brasil",
      cidade: "São Paulo",
      sobre: "Empresa focada em soluções tecnológicas inovadoras."
    });

    console.log("✅ Empresa criada com sucesso:", company.toJSON());
    process.exit(0); // encerra o script
  } catch (err) {
    console.error("❌ Erro ao criar empresa:", err);
    process.exit(1);
  }
}

addCompany();
