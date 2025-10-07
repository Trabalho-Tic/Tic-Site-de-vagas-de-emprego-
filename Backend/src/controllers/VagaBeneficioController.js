const VagaBeneficio = require("../models/VagaBeneficio");

class VagaBeneficioController {

    async create(request, response) {
        const { id } = request.params
        request.body.vagaId = id
        try {
            const vagaBeneficio = await VagaBeneficio.create(request.body)
            return response.json(vagaBeneficio)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Vaga"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const vagaBeneficio = await VagaBeneficio.findByPk(id)
            if (!vagaBeneficio) {
                return response.status(404).json({ error: "VagaBeneficio não encontrado"})
            }
            await vagaBeneficio.update(request.body)
            return response.json(vagaBeneficio)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Vaga"})
        }
    }

}

module.exports = new VagaBeneficioController()
 