const VagaDescricao = require('../models/VagaDescricao');

class VagaDescricaoController {

    async create(request, response) {
        const { id } = request.params
        request.body.vagaId = id
        try {
            const vagaDescricao = await VagaDescricao.create(request.body)
            return response.json(vagaDescricao)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar VagaDescricao"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const vagaDescricao = await VagaDescricao.findByPk(id)
            if (!vagaDescricao) {
                return response.status(404).json({ error: "VagaDescricao não encontrado"})
            }
            await vagaDescricao.update(request.body)
            return response.json(vagaDescricao)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar VagaDescricao"})
        }
    }
    
}

module.exports = new VagaDescricaoController()
 