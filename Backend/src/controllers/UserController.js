const User = require('../models/User');
const gerarHash = require("../utils/auth")
const bcrypt = require("bcrypt")

class UserController {

    async index(request, response) {
        try {
            const users = await User.findAll();
            return response.json(users);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar users" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const user = await User.findByPk(id)
            if (!user) {
                return response.status(404).json({ error: "User não encontrado" })
            }
            return response.json(user)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por User"})
        }
    }

    async create(request, response) {
        const { password } = request.body

        try {
            const hashPassword = await gerarHash(password)

            request.body.password = hashPassword

            const user = await User.create(request.body)
            return response.json(user)
        } catch (error) {
            return response.status(500).json({ error: error })
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const user = await User.findByPk(id)
            if (!user) {
                return response.status(404).json({ error: "User não encontrado"})
            }
            await user.update(request.body)
            return response.json(user)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar User"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return response.status(404).json({ error: 'User não encontrado.' });
            }
            await user.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar User.' });
        }
    }
}

module.exports = new UserController()
 