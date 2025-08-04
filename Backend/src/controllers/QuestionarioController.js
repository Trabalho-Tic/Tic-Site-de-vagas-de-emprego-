const Questionario = require('../models/Questionario');

class QuestionarioController {

    async index(request, response) {
        try {
            const questionarios = await Questionario.findAll();
            return response.json(questionarios);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Questionarios" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const questionario = await Questionario.findByPk(id)
            if (!questionario) {
                return response.status(404).json({ error: "Questionario não encontrado" })
            }
            return response.json(questionario)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Questionario"})
        }
    }

    async create(request, response) {
        try {
            const questionario = await Questionario.create(request.body)
            return response.json(questionario)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Questionario"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const questionario = await Questionario.findByPk(id)
            if (!questionario) {
                return response.status(404).json({ error: "Questionario não encontrado"})
            }
            await questionario.update(request.body)
            return response.json(questionario)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Questionario"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const questionario = await Questionario.findByPk(id);
            if (!questionario) {
                return response.status(404).json({ error: 'Questionario não encontrado.' });
            }
            await questionario.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Questionario.' });
        }
    }
}

module.exports = new QuestionarioController()
 