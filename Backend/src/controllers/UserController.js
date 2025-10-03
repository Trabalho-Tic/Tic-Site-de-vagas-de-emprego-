const User = require('../models/User');
const gerarHash = require("../utils/auth");

// Helper para remover o campo password de qualquer retorno
function sanitizeUser(userInstance) {
    const json = userInstance?.toJSON ? userInstance.toJSON() : userInstance;
    const { password, ...safe } = json || {};
    return safe;
}

class UserController {
    async index(req, res) {
        try {
            const users = await User.findAll();
            // remove password de todos
            return res.json(users.map(sanitizeUser));
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
            return res.json(sanitizeUser(user));
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    async create(req, res) {
    const { email, password, cpf } = req.body;  // Certifique-se de que o campo é 'cpf' no banco, e não 'CPF'

    try {
        // Verifica se já existe um usuário com o email fornecido
        const existingEmail = await User.findOne({ where: { email } });

        // Verifica se já existe um usuário com o CPF fornecido
        const existingCPF = await User.findOne({ where: { cpf } });

        // Se o email já existe, retorna um erro
        if (existingEmail) {
            return res.status(400).json({ error: "Já existe um usuário com esse email" });
        } 
        // Se o CPF já existe, retorna um erro
        else if (existingCPF) {
            return res.status(400).json({ error: "Já existe um usuário com esse CPF" });
        }

        // Se não houverem erros, gera o hash da senha e cria o novo usuário
        const hashPassword = await gerarHash(password);
        req.body.password = hashPassword;

        const newUser = await User.create(req.body);
        
        // Não retorna a senha no JSON de resposta
        return res.status(201).json(sanitizeUser(newUser));
    } catch (error) {
        // Em caso de erro no processo de criação
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
            // não retornar password
            return res.json(sanitizeUser(user));
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
