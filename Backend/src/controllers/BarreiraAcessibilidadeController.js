const BarreiraAcessibilidade = require('../models/BarreiraAcessibilidade');
const Barreira = require('../models/Barreira');

class BarreiraAcessibilidadeController {

    async index(request, response) {
        try {
            const barreiraAcessibilidades = await BarreiraAcessibilidade.findAll();
            return response.json(barreiraAcessibilidades);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar BarreiraAcessibilidades" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const barreiraAcessibilidade = await BarreiraAcessibilidade.findByPk(id)
            if (!barreiraAcessibilidade) {
                return response.status(404).json({ error: "BarreiraAcessibilidade não encontrado" })
            }
            return response.json(barreiraAcessibilidade)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por BarreiraAcessibilidade"})
        }
    }

    async create(request, response) {
        try {
            const barreiraAcessibilidade = await BarreiraAcessibilidade.create(request.body)
            return response.json(barreiraAcessibilidade)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar BarreiraAcessibilidade"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const barreiraAcessibilidade = await BarreiraAcessibilidade.findByPk(id)
            if (!barreiraAcessibilidade) {
                return response.status(404).json({ error: "BarreiraAcessibilidade não encontrado"})
            }
            await barreiraAcessibilidade.update(request.body)
            return response.json(barreiraAcessibilidade)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar BarreiraAcessibilidade"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const barreiraAcessibilidade = await BarreiraAcessibilidade.findByPk(id);
            if (!barreiraAcessibilidade) {
                return response.status(404).json({ error: 'BarreiraAcessibilidade não encontrado.' });
            }
            await barreiraAcessibilidade.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar BarreiraAcessibilidade.' });
        }
    }

    async associarSubtipos(request, response) {
        const { id } = request.params;
        const { acessibilidades } = request.body;

        try {
            const barreira = await Barreira.findByPk(id);
            if (!barreira) {
                return response.status(404).json({ error: 'Barreira não encontrada' });
            }
            
            await barreira.addSubtipos(acessibilidades);

            return response.json({ message: 'Subtipos associados com sucesso!' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Erro ao associar subtipos' });
        }
    }
}

module.exports = new BarreiraAcessibilidadeController()
 