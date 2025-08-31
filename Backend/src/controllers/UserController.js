const User = require('../models/User');
const gerarHash = require('../utils/auth');
const { userCreateSchema, userUpdateSchema } = require('../validators/user.schema');

function toSafeUser(userInstance) {
  const json = userInstance.toJSON ? userInstance.toJSON() : userInstance;
  if (json && json.password) delete json.password;
  return json;
}

class UserController {
  // GET /users
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
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

  // POST /users (registro) — agora com Zod
  async create(req, res) {
    try {
      // ✅ Validação do corpo com Zod
      const parsed = userCreateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: parsed.error.errors, // lista de erros campo a campo
        });
      }

      const { nome, email, cpf, telefone, typeUser, password } = parsed.data;

      // Checar unicidade de email
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ error: 'Já existe um usuário com esse email' });
      }

      // Gerar hash seguro
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

  // PATCH/PUT /users/:id — opcional: validar com schema parcial
  async update(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // ✅ Validação opcional do body parcial (só os campos enviados)
      const parsed = userUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: parsed.error.errors,
        });
      }

      const payload = parsed.data;

      // Se tentar alterar email, garantir unicidade
      if (payload.email && payload.email !== user.email) {
        const exists = await User.findOne({ where: { email: payload.email } });
        if (exists) {
          return res.status(400).json({ error: 'Já existe um usuário com esse email' });
        }
      }

      // Se vier "password", re-hash antes de salvar
      if (payload.password) {
        payload.password = await gerarHash(payload.password);
      }

      await user.update(payload);
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
