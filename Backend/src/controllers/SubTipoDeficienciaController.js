const SubTipoDeficiencia = require('../models/SubTipoDeficiencia');

class SubTipoDeficienciaController {

    async index(request, response) {
        try {
            const subTipoDeficiencias = await SubTipoDeficiencia.findAll();
            return response.json(subTipoDeficiencias);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar SubTipoDeficiencias" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const subTipoDeficiencia = await SubTipoDeficiencia.findByPk(id)
            if (!subTipoDeficiencia) {
                return response.status(404).json({ error: "SubTipoDeficiencia não encontrado" })
            }
            return response.json(subTipoDeficiencia)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por SubTipoDeficiencia"})
        }
    }

    async create(request, response) {
        try {
            const subTipoDeficiencia = await SubTipoDeficiencia.create(request.body)
            return response.json(subTipoDeficiencia)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar SubTipoDeficiencia"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const subTipoDeficiencia = await SubTipoDeficiencia.findByPk(id)
            if (!subTipoDeficiencia) {
                return response.status(404).json({ error: "SubTipoDeficiencia não encontrado"})
            }
            await subTipoDeficiencia.update(request.body)
            return response.json(subTipoDeficiencia)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar SubTipoDeficiencia"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const subTipoDeficiencia = await SubTipoDeficiencia.findByPk(id);
            if (!subTipoDeficiencia) {
                return response.status(404).json({ error: 'SubTipoDeficiencia não encontrado.' });
            }
            await subTipoDeficiencia.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar SubTipoDeficiencia.' });
        }
    }
}

module.exports = new SubTipoDeficienciaController()
 