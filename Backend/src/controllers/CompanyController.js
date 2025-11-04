const Company = require("../models/Company");
const User = require("../models/User");
const Vaga = require("../models/Vaga");

class CompanyController {
  // 📄 Listar todas as empresas com dados do usuário dono
  async index(req, res) {
    try {
      const companies = await Company.findAll({
        include: [
          {model: User, as: "user", attributes: ["id", "nome", "email", "telefone"]},
          {model: Vaga, as: "vagas", attributes: ["nome", "pais", "cidade", "modelo"]},
        ]
      });
      return res.json(companies);
    } catch (error) {
      console.error("❌ Erro em CompanyController.index:", error);
      return res.status(500).json({ error: "Erro ao buscar empresas" });
    }
  }

  // 📄 Mostrar uma empresa específica
  async show(req, res) {
    const { id } = req.params;
    try {
      const company = await Company.findByPk(id, {
        include: {
          model: User,
          as: "user",
          attributes: ["id", "nome", "email", "telefone"],
        },
      });

      if (!company)
        return res.status(404).json({ error: "Empresa não encontrada" });

      return res.json(company);
    } catch (error) {
      console.error("❌ Erro em CompanyController.show:", error);
      return res.status(500).json({ error: "Erro ao buscar empresa" });
    }
  }

  // 🧩 Criar empresa (rota pública)
  async create(req, res) {
    try {
      const { id_user, cnpj } = req.body;

      // ⚠️ Validação básica
      if (!id_user)
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
      if (!cnpj)
        return res.status(400).json({ error: "CNPJ é obrigatório" });

      // 🔍 Evita duplicidade de CNPJ
      const existing = await Company.findOne({ where: { cnpj } });
      if (existing)
        return res.status(400).json({ error: "CNPJ já cadastrado" });

      // 🖼️ Pega nome do arquivo salvo pelo Multer (se existir)
      const logoFile = req.file ? req.file.filename : null;

      // 🧱 Cria empresa com segurança — somente campos válidos
      const newCompany = await Company.create({
        nome: req.body.nome,
        cnpj: req.body.cnpj,
        logo: logoFile, // <- nome do arquivo salvo em /uploads/logos
        url_site: req.body.url_site || null,
        email: req.body.email,
        category: req.body.category,
        pais: req.body.pais || null,
        cidade: req.body.cidade || null,
        sobre: req.body.sobre || null,
        id_user,
      });

      return res.status(201).json(newCompany);
    } catch (error) {
      console.error("❌ Erro em CompanyController.create:", error);
      return res.status(500).json({ error: "Erro ao criar empresa" });
    }
  }

  // ✏️ Atualizar dados da empresa
  async update(req, res) {
    const { id } = req.params;

    try {
      const company = await Company.findByPk(id);
      if (!company)
        return res.status(404).json({ error: "Empresa não encontrada" });

      // 🖼️ Atualiza logo se novo arquivo for enviado
      const logoFile = req.file ? req.file.filename : company.logo;

      await company.update({
        nome: req.body.nome || company.nome,
        cnpj: req.body.cnpj || company.cnpj,
        logo: logoFile,
        url_site: req.body.url_site || company.url_site,
        email: req.body.email || company.email,
        category: req.body.category || company.category,
        pais: req.body.pais || company.pais,
        cidade: req.body.cidade || company.cidade,
        sobre: req.body.sobre || company.sobre,
      });

      return res.json(company);
    } catch (error) {
      console.error("❌ Erro em CompanyController.update:", error);
      return res.status(500).json({ error: "Erro ao atualizar empresa" });
    }
  }

  // 🗑️ Deletar empresa
  async delete(req, res) {
    const { id } = req.params;

    try {
      const company = await Company.findByPk(id);
      if (!company)
        return res.status(404).json({ error: "Empresa não encontrada" });

      await company.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error("❌ Erro em CompanyController.delete:", error);
      return res.status(500).json({ error: "Erro ao deletar empresa" });
    }
  }
}

module.exports = new CompanyController();
