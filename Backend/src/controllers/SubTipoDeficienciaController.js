const SubtipoDeficiencia = require('../models/SubTipoDeficiencia');

class SubTipoDeficienciaController {

    async index(request, response) {
        try {
            const subTipoDeficiencias = await SubtipoDeficiencia.findAll();
            return response.json(subTipoDeficiencias);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar SubTipoDeficiencias" })
        }
    }

    // =========================================================
    // NOVO: LISTAR SUBTIPOS POR TIPO
    // =========================================================
    async listarPorTipo(req, res) {
        const { idTipo } = req.params;

        try {
            const subtipos = await SubtipoDeficiencia.findAll({
                where: { id_tipodeficiencia: idTipo },
                attributes: ["id", "nome"]
            });

            return res.json(subtipos);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar subtipos" });
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const subTipoDeficiencia = await SubtipoDeficiencia.findByPk(id)
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
            const subTipoDeficiencia = await SubtipoDeficiencia.create(request.body)
            return response.json(subTipoDeficiencia)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar SubTipoDeficiencia"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const subTipoDeficiencia = await SubtipoDeficiencia.findByPk(id)
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
            const subTipoDeficiencia = await SubtipoDeficiencia.findByPk(id);
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
