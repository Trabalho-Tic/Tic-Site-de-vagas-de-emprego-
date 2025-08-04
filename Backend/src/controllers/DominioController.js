const Dominio = require('../models/Dominio');

class DominioController {

    async index(request, response) {
        try {
            const dominios = await Dominio.findAll();
            return response.json(dominios);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Dominios" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const dominio = await Dominio.findByPk(id)
            if (!dominio) {
                return response.status(404).json({ error: "Dominio não encontrado" })
            }
            return response.json(dominio)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Dominio"})
        }
    }

    async create(request, response) {
        try {
            const dominio = await Dominio.create(request.body)
            return response.json(dominio)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Dominio"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const dominio = await Dominio.findByPk(id)
            if (!dominio) {
                return response.status(404).json({ error: "Dominio não encontrado"})
            }
            await dominio.update(request.body)
            return response.json(dominio)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Dominio"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const dominio = await Dominio.findByPk(id);
            if (!dominio) {
                return response.status(404).json({ error: 'Dominio não encontrado.' });
            }
            await dominio.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Dominio.' });
        }
    }
}

module.exports = new DominioController()
 