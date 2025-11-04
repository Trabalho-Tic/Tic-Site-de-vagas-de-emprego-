const User = require('../models/User');
const gerarHash = require("../utils/auth");
const Company = require('../models/Company');
const Candidato = require('../models/Candidato');
const CandidatoCurriculo = require('../models/CandidatoCurriculo');

// Helper: remove o campo "password" das respostas
function sanitizeUser(userInstance) {
  const json = userInstance?.toJSON ? userInstance.toJSON() : userInstance;
  const { password, ...safe } = json || {};
  return safe;
}

class UserController {
  // LISTAR TODOS OS USUÁRIOS
  async index(req, res) {
    try {
      const users = await User.findAll({
        include: [
          { model: Company, as: 'company', attributes: ['id', 'nome', 'cnpj', 'cidade', 'category'] },
          { model: Candidato, as: 'candidato', attributes: ['id_user', 'cpf', 'deficiencias'] },
          { model: CandidatoCurriculo, as: 'curriculos', attributes: ['id_user', 'curriculo', 'resumoProf', 'experiencias', 'formacao', 'cursos', 'habilidades'] }
        ],
      });
      return res.json(users.map(sanitizeUser));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  // MOSTRAR UM USUÁRIO ESPECÍFICO
  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        include: [
          { model: Company, as: 'company', attributes: ['id',"logo", 'nome', 'cnpj', 'cidade', 'category'] },
          { model: Candidato, as: 'candidato', attributes: ['id_user', 'cpf', 'deficiencias'] }
        ],
      });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      return res.json(sanitizeUser(user));
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async showCurriculo(req, res) {

  }

  // CRIAR USUÁRIO BASE
  async create(req, res) {
    const { email, password } = req.body;

    try {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ error: "Já existe um usuário com esse email" });
      }

      const hashPassword = await gerarHash(password);
      req.body.password = hashPassword;

      const newUser = await User.create(req.body);
      return res.status(201).json(sanitizeUser(newUser));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
    }
  }

  // ATUALIZAR USUÁRIO
  async update(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await user.update(req.body);
      return res.json(sanitizeUser(user));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  // DELETAR USUÁRIO E SEUS FILHOS (Candidato ou Empresa)
  async delete(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await Company.destroy({ where: { id_user: id } });
      await Candidato.destroy({ where: { id_user: id } });
      await user.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}

module.exports = new UserController();
