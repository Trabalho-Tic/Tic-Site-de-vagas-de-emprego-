const SubTipoBarreira = require('../models/SubTipoBarreiras');
const SubtipoDeficiencia = require('../models/SubTipoDeficiencia');

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
        const { id } = request.params;
        const { subtiposIds } = request.body
        
        try {
            const subTipo = await SubtipoDeficiencia.findByPk(id);

            if (!subTipo) return response.status(404).json({ error: "TipoDeficiencia não encontrado" });

            const registros = subtiposIds.map(subId => ({
                id_subtipodeficiencia: id,
                id_barreira: subId
            }));

            await SubTipoBarreira.bulkCreate(registros, { ignoreDuplicates: true });

            return response.json({ message: "Criado com sucesso!", registrosCriados: registros });

        } catch (err) {
            console.error("ERRO:", err);
            return response.status(500).json({ error: "Erro ao criar vínculo N:N" });
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
 