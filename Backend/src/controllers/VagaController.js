const Vaga = require('../models/Vaga');

class VagaController {

    async index(request, response) {
        try {
            const vagas = await Vaga.findAll();
            return response.json(Vagas);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Vagas" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const vaga = await Vaga.findByPk(id)
            if (!vaga) {
                return response.status(404).json({ error: "Vaga não encontrado" })
            }
            return response.json(vaga)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Vaga"})
        }
    }

    async create(request, response) {
        try {
            const vaga = await Vaga.create(request.body)
            return response.json(vaga)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Vaga"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const vaga = await Vaga.findByPk(id)
            if (!vaga) {
                return response.status(404).json({ error: "Vaga não encontrado"})
            }
            await vaga.update(request.body)
            return response.json(vaga)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Vaga"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const vaga = await Vaga.findByPk(id);
            if (!vaga) {
                return response.status(404).json({ error: 'Vaga não encontrado.' });
            }
            await vaga.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Vaga.' });
        }
    }

}

module.exports = new VagaController()
 