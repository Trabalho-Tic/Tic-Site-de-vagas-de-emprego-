const VagaRequisicao = require('../models/VagaRequisicao');

class VagaRequisicaoController {

    async create(request, response) {
        const { id } = request.params
        request.body.id_vaga = id
        try {
            const vagaRequisicao = await VagaRequisicao.create(request.body)
            return response.json(vagaRequisicao)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar VagaRequisicao"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const vagaRequisicao = await VagaRequisicao.findByPk(id)
            if (!vagaRequisicao) {
                return response.status(404).json({ error: "VagaRequisicao não encontrado"})
            }
            await vagaRequisicao.update(request.body)
            return response.json(vagaRequisicao)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar VagaRequisicao"})
        }
    }

}

module.exports = new VagaRequisicaoController()
 