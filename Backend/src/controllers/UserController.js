// Backend/src/controllers/UserController.js
const User = require('../models/User');
const gerarHash = require('../utils/auth');

function toSafeUser(userInstance) {
  // remove o campo de senha do retorno
  const json = userInstance.toJSON ? userInstance.toJSON() : userInstance;
  if (json && json.password) delete json.password;
  return json;
}

class UserController {
  // GET /users
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }, // não expor hash
      });
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  // GET /users/:id
  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  // POST /users  (registro)
  async create(req, res) {
    try {
      const { nome, email, cpf, telefone, typeUser, password } = req.body;

      // validação mínima
      if (!nome || !email || !cpf || !telefone || !typeUser || !password) {
        return res.status(400).json({
          error:
            'Campos obrigatórios: nome, email, cpf, telefone, typeUser, password',
        });
      }

      // checar unicidade de email
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ error: 'Já existe um usuário com esse email' });
      }

      // gerar hash seguro
      const hashPassword = await gerarHash(password);

      const user = await User.create({
        nome,
        email,
        cpf,
        telefone,
        typeUser,
        password: hashPassword,
      });

      return res.status(201).json(toSafeUser(user));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  // PATCH/PUT /users/:id
  async update(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // se tentar alterar email, garantir unicidade
      if (req.body.email && req.body.email !== user.email) {
        const exists = await User.findOne({ where: { email: req.body.email } });
        if (exists) {
          return res
            .status(400)
            .json({ error: 'Já existe um usuário com esse email' });
        }
      }

      // se vier "password" no corpo, re-hash antes de salvar
      if (req.body.password) {
        req.body.password = await gerarHash(req.body.password);
      }

      await user.update(req.body);
      return res.json(toSafeUser(user));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  // DELETE /users/:id
  async delete(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}

module.exports = new UserController();
