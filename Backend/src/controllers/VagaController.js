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
            return response.status(500).json({ error: "Erro ao buscar Vagas" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const vaga = await Vaga.findByPk(id, {
                include: [
                    { model: VagaProcesso, as: 'processo', attributes: ['processoSeletivo', 'entrevistador', 'time'] },
                    { model: VagaDescricao, as: 'descricao', attributes: ['descricao'] },
                    { model: VagaRequisicao, as: 'requisicao', attributes: ['atuacao', 'conhecimentos', 'destaque'] },
                    { model: VagaBeneficio, as: 'beneficio', attributes: ['salario', 'beneficios'] },
                ]
            })
            if (!vaga) {
                return response.status(404).json({ error: "Vaga não encontrado" })
            }
            return response.json(vaga)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Vaga"})
        }
    }

    async create(request, response) {
        console.log(request.body)
        try {
            const vaga = await Vaga.create(request.body)
            return response.json(vaga)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Vaga"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const vaga = await Vaga.findByPk(id)
            if (!vaga) {
                return response.status(404).json({ error: "Vaga não encontrado"})
            }
            await vaga.update(request.body)
            return response.json(vaga)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Vaga"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const vaga = await Vaga.findByPk(id);
            if (!vaga) {
                return response.status(404).json({ error: 'Vaga não encontrado.' });
            }
            await vaga.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Vaga.' });
        }
    }

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
                ],
            });

            return res.json(vagas);
        } catch (error) {
            console.error("Erro em vagasPorEmpresa:", error);
            return res.status(500).json({ error: "Erro ao buscar vagas da empresa" });
        }
    }
}

module.exports = new VagaController()
 