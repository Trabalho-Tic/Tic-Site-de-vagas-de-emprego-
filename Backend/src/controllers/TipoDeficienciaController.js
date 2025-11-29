const TipoDeficiencia = require('../models/TipoDeficiencia');
const SubtipoDeficiencia = require('../models/SubTipoDeficiencia');
const Barreira = require('../models/Barreira');
const Acessibilidade = require('../models/Acessibilidade');

class TipoDeficienciaController {

    async index(request, response) {
        try {
            const tipoDeficiencias = await TipoDeficiencia.findAll({
                include: {
                    model: SubtipoDeficiencia,
                    as: 'subtipos',
                    attributes: ['id', 'nome'],
                    include: {
                        model: Barreira,
                        as: 'barreiras',
                        attributes: ['descricao'],
                        include: {
                            model: Acessibilidade,
                            attributes: ['descricao'],
                            as: 'acessibilidades'
                        }
                    }
                }
            });
            return response.json(tipoDeficiencias);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar TipoDeficiencias" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const tipoDeficiencia = await TipoDeficiencia.findByPk(id)
            if (!tipoDeficiencia) {
                return response.status(404).json({ error: "TipoDeficiencia não encontrado" })
            }
            return response.json(tipoDeficiencia)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por TipoDeficiencia"})
        }
    }

    async create(request, response) {
        try {
            const tipoDeficiencia = await TipoDeficiencia.create(request.body)
            return response.json(tipoDeficiencia)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar TipoDeficiencia"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const tipoDeficiencia = await TipoDeficiencia.findByPk(id)
            if (!tipoDeficiencia) {
                return response.status(404).json({ error: "TipoDeficiencia não encontrado"})
            }
            await tipoDeficiencia.update(request.body)
            return response.json(tipoDeficiencia)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar TipoDeficiencia"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const tipoDeficiencia = await TipoDeficiencia.findByPk(id);
            if (!tipoDeficiencia) {
                return response.status(404).json({ error: 'TipoDeficiencia não encontrado.' });
            }
            await tipoDeficiencia.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar TipoDeficiencia.' });
        }
    }

}


module.exports = new TipoDeficienciaController()
 