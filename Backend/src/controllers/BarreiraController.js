const Barreira = require('../models/Barreira');
const SubTipoBarreira = require('../models/SubTipoBarreiras');

class BarreiraController {

    async index(request, response) {
        try {
            const barreiras = await Barreira.findAll();
            return response.json(barreiras);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Barreiras" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const barreira = await Barreira.findByPk(id)
            if (!barreira) {
                return response.status(404).json({ error: "Barreira não encontrado" })
            }
            return response.json(barreira)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Barreira"})
        }
    }

    async create(request, response) {
        try {
            const barreira = await Barreira.create(request.body)
            return response.json(barreira)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Barreira"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const barreira = await Barreira.findByPk(id)
            if (!barreira) {
                return response.status(404).json({ error: "Barreira não encontrado"})
            }
            await barreira.update(request.body)
            return response.json(barreira)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Barreira"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const barreira = await Barreira.findByPk(id);
            if (!barreira) {
                return response.status(404).json({ error: 'Barreira não encontrado.' });
            }
            await barreira.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Barreira.' });
        }
    }

    async associarSubtipos(request, response) {
        const { id } = request.params;
        const { subtipos } = request.body;

        try {
            const barreira = await Barreira.findByPk(id);
            if (!barreira) {
                return response.status(404).json({ error: 'Barreira não encontrada' });
            }
            
            await barreira.addSubtipos(subtipos);

            return response.json({ message: 'Subtipos associados com sucesso!' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Erro ao associar subtipos' });
        }
    }
}

module.exports = new BarreiraController()
 