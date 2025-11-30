const VagaRequisicao = require('../models/VagaRequisicao');

class VagaRequisicaoController {

    async create(request, response) {
        const { id } = request.params;

        try {
            const vagaRequisicao = await VagaRequisicao.create({
                atuacao: request.body.atuacao,
                conhecimentos: request.body.conhecimentos,
                destaque: request.body.destaque,
                id_vaga: id,
            });

            return response.json(vagaRequisicao);

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao criar VagaRequisicao" });
        }
    }

    async update(request, response) {
        const { id } = request.params;

        try {
            const vagaRequisicao = await VagaRequisicao.findByPk(id);

            if (!vagaRequisicao) {
                return response.status(404).json({ error: "VagaRequisicao não encontrado" });
            }

            await vagaRequisicao.update({
                atuacao: request.body.atuacao,
                conhecimentos: request.body.conhecimentos,
                destaque: request.body.destaque,
            });

            return response.json(vagaRequisicao);

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao atualizar VagaRequisicao" });
        }
    }

}

module.exports = new VagaRequisicaoController();
