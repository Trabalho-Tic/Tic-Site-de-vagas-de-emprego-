const Acessibilidade = require('../models/Acessibilidade');

class AcessibilidadeController {

    async index(request, response) {
        try {
            const acessibilidades = await Acessibilidade.findAll();
            return response.json(acessibilidades);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Acessibilidades" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const acessibilidade = await Acessibilidade.findByPk(id)
            if (!acessibilidade) {
                return response.status(404).json({ error: "Acessibilidade não encontrado" })
            }
            return response.json(acessibilidade)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Acessibilidade"})
        }
    }

    async create(request, response) {
        try {
            const acessibilidade = await Acessibilidade.create(request.body)
            return response.json(acessibilidade)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Acessibilidade"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const acessibilidade = await Acessibilidade.findByPk(id)
            if (!acessibilidade) {
                return response.status(404).json({ error: "Acessibilidade não encontrado"})
            }
            await acessibilidade.update(request.body)
            return response.json(acessibilidade)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Acessibilidade"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const acessibilidade = await Acessibilidade.findByPk(id);
            if (!acessibilidade) {
                return response.status(404).json({ error: 'Acessibilidade não encontrado.' });
            }
            await acessibilidade.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Acessibilidade.' });
        }
    }
}

module.exports = new AcessibilidadeController()
 