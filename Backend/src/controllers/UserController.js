const User = require('../models/User');
const gerarHash = require("../utils/auth");

class UserController {
    async index(req, res) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    async create(req, res) {
        const { email, password } = req.body;

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: "Já existe um usuário com esse email" });
            }

            const hashPassword = await gerarHash(password);
            req.body.password = hashPassword;

            const newUser = await User.create(req.body);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            await user.update(req.body);
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            await user.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar usuário" });
        }
    }
}

module.exports = new UserController();
