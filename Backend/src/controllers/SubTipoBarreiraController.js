const SubTipoBarreira = require('../models/SubTipoBarreiras');

class SubTipoBarreiraController {

    async index(request, response) {
        try {
            const subTipoBarreiras = await SubTipoBarreira.findAll();
            return response.json(subTipoBarreiras);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar SubTipoBarreiras" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const subTipoBarreira = await SubTipoBarreira.findByPk(id)
            if (!subTipoBarreira) {
                return response.status(404).json({ error: "SubTipoBarreira não encontrado" })
            }
            return response.json(subTipoBarreira)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por SubTipoBarreira"})
        }
    }

    async create(request, response) {
        try {
            const subTipoBarreira = await SubTipoBarreira.create(request.body)
            return response.json(subTipoBarreira)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar SubTipoBarreira"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const subTipoBarreira = await SubTipoBarreira.findByPk(id)
            if (!subTipoBarreira) {
                return response.status(404).json({ error: "SubTipoBarreira não encontrado"})
            }
            await subTipoBarreira.update(request.body)
            return response.json(subTipoBarreira)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar SubTipoBarreira"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const subTipoBarreira = await SubTipoBarreira.findByPk(id);
            if (!subTipoBarreira) {
                return response.status(404).json({ error: 'SubTipoBarreira não encontrado.' });
            }
            await subTipoBarreira.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar SubTipoBarreira.' });
        }
    }
}

module.exports = new SubTipoBarreiraController()
 