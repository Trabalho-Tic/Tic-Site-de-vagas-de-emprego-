const Company = require('../models/Company');
const User = require('../models/User');

class CompanyController {

  // Listar todas as empresas com dados do usuário dono
  async index(req, res) {
    try {
      const companies = await Company.findAll({
        include: { model: User, as: 'user', attributes: ['id', 'nome', 'email', 'telefone'] },
      });
      return res.json(companies);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar empresas" });
    }
  }

  // Mostrar empresa específica
  async show(req, res) {
    const { id } = req.params;
    try {
      const company = await Company.findByPk(id, {
        include: { model: User, as: 'user', attributes: ['id', 'nome', 'email'] },
      });
      if (!company) return res.status(404).json({ error: "Empresa não encontrada" });
      return res.json(company);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar empresa" });
    }
  }

  // Criar empresa (rota pública)
  async create(req, res) {
    const { id_user, cnpj } = req.body;
    try {
      const existing = await Company.findOne({ where: { cnpj } });
      if (existing) {
        return res.status(400).json({ error: "CNPJ já cadastrado" });
      }

      const company = await Company.create(req.body);
      return res.status(201).json(company);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar empresa" });
    }
  }

  // Atualizar dados da empresa
  async update(req, res) {
    const { id } = req.params;
    try {
      const company = await Company.findByPk(id);
      if (!company) {
        return res.status(404).json({ error: "Empresa não encontrada" });
      }

      await company.update(req.body);
      return res.json(company);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar empresa" });
    }
  }

  // Deletar empresa
  async delete(req, res) {
    const { id } = req.params;
    try {
      const company = await Company.findByPk(id);
      if (!company) {
        return res.status(404).json({ error: "Empresa não encontrada" });
      }

      await company.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar empresa" });
    }
  }
}

module.exports = new CompanyController();
