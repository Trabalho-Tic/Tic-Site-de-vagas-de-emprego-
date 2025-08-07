const Questao = require('../models/Questao');

class QuestaoController {

    async index(request, response) {
        try {
            const questoes = await Questao.findAll();
            return response.json(questoes);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Questaos" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const questao = await Questao.findByPk(id)
            if (!questao) {
                return response.status(404).json({ error: "Questao não encontrado" })
            }
            return response.json(questao)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Questao"})
        }
    }

    async create(request, response) {
        try {
            const questao = await Questao.create(request.body)
            return response.json(questao)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Questao"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const questao = await Questao.findByPk(id)
            if (!questao) {
                return response.status(404).json({ error: "Questao não encontrado"})
            }
            await questao.update(request.body)
            return response.json(questao)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Questao"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const questao = await Questao.findByPk(id);
            if (!questao) {
                return response.status(404).json({ error: 'Questao não encontrado.' });
            }
            await questao.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Questao.' });
        }
    }
}

module.exports = new QuestaoController()
 