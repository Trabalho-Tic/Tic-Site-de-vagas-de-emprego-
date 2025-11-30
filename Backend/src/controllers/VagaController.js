const Vaga = require('../models/Vaga');
const VagaDescricao = require('../models/VagaDescricao');
const VagaBeneficio = require('../models/VagaBeneficio');
const VagaProcesso = require('../models/VagaProcesso');
const VagaRequisicao = require('../models/VagaRequisicao');

class VagaController {

    async index(request, response) {
        try {
            const vagas = await Vaga.findAll({
                include: [
                    { model: VagaProcesso, as: 'processo', attributes: ['processoSeletivo', 'entrevistador', 'time'] },
                    { model: VagaDescricao, as: 'descricao', attributes: ['descricao'] },
                    { model: VagaRequisicao, as: 'requisicao', attributes: ['atuacao', 'conhecimentos', 'destaque'] },
                    { model: VagaBeneficio, as: 'beneficio', attributes: ['salario', 'beneficios'] },
                ]
            });

            return response.json(vagas);

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao buscar Vagas" });
        }
    }

    async show(request, response) {
        const { id } = request.params;

        try {
            const vaga = await Vaga.findByPk(id, {
                include: [
                    { model: VagaProcesso, as: 'processo', attributes: ['processoSeletivo', 'entrevistador', 'time'] },
                    { model: VagaDescricao, as: 'descricao', attributes: ['descricao'] },
                    { model: VagaRequisicao, as: 'requisicao', attributes: ['atuacao', 'conhecimentos', 'destaque'] },
                    { model: VagaBeneficio, as: 'beneficio', attributes: ['salario', 'beneficios'] },
                ]
            });

            if (!vaga) {
                return response.status(404).json({ error: "Vaga não encontrada" });
            }

            return response.json(vaga);

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao buscar por Vaga" });
        }
    }

}

module.exports = new VagaController();
