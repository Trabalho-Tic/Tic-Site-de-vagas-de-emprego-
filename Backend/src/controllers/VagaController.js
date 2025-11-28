const Vaga = require('../models/Vaga');
const VagaDescricao = require('../models/VagaDescricao');
const VagaBeneficio = require('../models/VagaBeneficio');
const VagaProcesso = require('../models/VagaProcesso');
const VagaRequisicao = require('../models/VagaRequisicao');
const Acessibilidade = require('../models/Acessibilidade');

class VagaController {

    // =========================================================
    // LISTAR TODAS AS VAGAS
    // =========================================================
    async index(request, response) {
        try {
            const vagas = await Vaga.findAll({
                include: [
                    { model: VagaProcesso, as: 'processo', attributes: ['processoSeletivo', 'entrevistador', 'time'] },
                    { model: VagaDescricao, as: 'descricao', attributes: ['descricao'] },
                    { model: VagaRequisicao, as: 'requisicao', attributes: ['atuacao', 'conhecimentos', 'destaque'] },
                    { model: VagaBeneficio, as: 'beneficio', attributes: ['salario', 'beneficios'] },
                    { model: Acessibilidade, as: "acessibilidades", attributes: ["id", "descricao"] }
                ]
            });
            return response.json(vagas);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Vagas" });
        }
    }

    // =========================================================
    // BUSCAR UMA VAGA ESPECÍFICA
    // =========================================================
    async show(request, response) {
        const { id } = request.params;
        try {
            const vaga = await Vaga.findByPk(id, {
                include: [
                    { model: VagaProcesso, as: 'processo', attributes: ['processoSeletivo', 'entrevistador', 'time'] },
                    { model: VagaDescricao, as: 'descricao', attributes: ['descricao'] },
                    { model: VagaRequisicao, as: 'requisicao', attributes: ['atuacao', 'conhecimentos', 'destaque'] },
                    { model: VagaBeneficio, as: 'beneficio', attributes: ['salario', 'beneficios'] },
                    { model: Acessibilidade, as: "acessibilidades", attributes: ["id", "descricao"] }
                ]
            });
            if (!vaga) {
                return response.status(404).json({ error: "Vaga não encontrada" });
            }
            return response.json(vaga);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Vaga" });
        }
    }

    // =========================================================
    // CRIAR VAGA
    // =========================================================
    async create(request, response) {
        console.log(request.body);
        try {
            const { acessibilidades } = request.body;

            const vaga = await Vaga.create(request.body);

            if (acessibilidades && Array.isArray(acessibilidades)) {
                await vaga.setAcessibilidades(acessibilidades);
            }

            return response.json(vaga);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao criar Vaga" });
        }
    }

    // =========================================================
    // ATUALIZAR VAGA
    // =========================================================
    async update(request, response) {
        const { id } = request.params;
        const { acessibilidades } = request.body;

        try {
            const vaga = await Vaga.findByPk(id);
            if (!vaga) {
                return response.status(404).json({ error: "Vaga não encontrada" });
            }

            await vaga.update(request.body);

            if (acessibilidades && Array.isArray(acessibilidades)) {
                await vaga.setAcessibilidades(acessibilidades);
            }

            return response.json(vaga);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Vaga" });
        }
    }

    // =========================================================
    // DELETAR VAGA
    // =========================================================
    async delete(request, response) {
        const { id } = request.params;
        try {
            const vaga = await Vaga.findByPk(id);
            if (!vaga) {
                return response.status(404).json({ error: 'Vaga não encontrada.' });
            }
            await vaga.destroy();
            return response.status(204).send();
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao deletar Vaga.' });
        }
    }

    // =========================================================
    // VAGAS POR EMPRESA 
    // =========================================================
    async vagasPorEmpresa(req, res) {
        try {
            const { idCompany } = req.params;

            const vagas = await Vaga.findAll({
                where: { id_company: idCompany },
                include: [
                    { model: VagaProcesso, as: 'processo' },
                    { model: VagaDescricao, as: 'descricao' },
                    { model: VagaRequisicao, as: 'requisicao' },
                    { model: VagaBeneficio, as: 'beneficio' },
                    { model: Acessibilidade, as: "acessibilidades", attributes: ["id", "descricao"] }
                ],
            });

            return res.json(vagas);
        } catch (error) {
            console.error("Erro em vagasPorEmpresa:", error);
            return res.status(500).json({ error: "Erro ao buscar vagas da empresa" });
        }
    }
}

module.exports = new VagaController();
