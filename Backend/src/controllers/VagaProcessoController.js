const VagaProcesso = require('../models/VagaProcesso');

class VagaProcessoController {

    async create(request, response) {
        const { id } = request.params
        request.body.vagaId = id
        try {
            const vagaProcesso = await VagaProcesso.create(request.body)
            return response.json(vagaProcesso)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar VagaProcesso"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const vagaProcesso = await VagaProcesso.findByPk(id)
            if (!vagaProcesso) {
                return response.status(404).json({ error: "VagaProcesso não encontrado"})
            }
            await vagaProcesso.update(request.body)
            return response.json(vagaProcesso)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar VagaProcesso"})
        }
    }
    
}

module.exports = new VagaProcessoController()
 