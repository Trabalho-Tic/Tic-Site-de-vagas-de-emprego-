const Vaga = require('../models/Vaga');
const VagaDescricao = require('../models/VagaDescricao');
const VagaBeneficio = require('../models/VagaBeneficio');
const VagaProcesso = require('../models/VagaProcesso');
const VagaRequisicao = require('../models/VagaRequisicao');
const Acessibilidade = require('../models/Acessibilidade');

class VagaController {

    // ============================================================
    // LISTAR TODAS AS VAGAS
    // ============================================================
    async index(req, res) {
        try {
            const vagas = await Vaga.findAll({
                include: [
                    {
                        model: VagaProcesso,
                        as: 'processo',
                        attributes: ['processoSeletivo', 'entrevistador', 'time']
                    },
                    {
                        model: VagaDescricao,
                        as: 'descricao',
                        attributes: ['descricao']
                    },
                    {
                        model: VagaRequisicao,
                        as: 'requisicao',
                        // ❗❗ TIRADO "acessibilidade" pq NÃO existe no model
                        attributes: ['atuacao', 'conhecimentos', 'destaque']
                    },
                    {
                        model: VagaBeneficio,
                        as: 'beneficio',
                        attributes: ['salario', 'beneficios']
                    },
                    {
                        model: Acessibilidade,
                        as: 'acessibilidades',
                        through: { attributes: [] }
                    }
                ]
            });

            return res.json(vagas);
        } catch (error) {
            console.error("Erro em VagaController.index:", error);
            return res.status(500).json({ error: "Erro ao buscar vagas" });
        }
    }

    // ============================================================
    // BUSCAR UMA VAGA POR ID
    // ============================================================
    async show(req, res) {
        const { id } = req.params;

        try {
            const vaga = await Vaga.findByPk(id, {
                include: [
                    {
                        model: VagaProcesso,
                        as: 'processo',
                        attributes: ['processoSeletivo', 'entrevistador', 'time']
                    },
                    {
                        model: VagaDescricao,
                        as: 'descricao',
                        attributes: ['descricao']
                    },
                    {
                        model: VagaRequisicao,
                        as: 'requisicao',
                        // ❗❗ TIRADO "acessibilidade" pq NÃO existe no model
                        attributes: ['atuacao', 'conhecimentos', 'destaque']
                    },
                    {
                        model: VagaBeneficio,
                        as: 'beneficio',
                        attributes: ['salario', 'beneficios']
                    },
                    {
                        model: Acessibilidade,
                        as: 'acessibilidades',
                        through: { attributes: [] }
                    }
                ]
            });

            if (!vaga) {
                return res.status(404).json({ error: "Vaga não encontrada" });
            }

            return res.json(vaga);
        } catch (error) {
            console.error("Erro em VagaController.show:", error);
            return res.status(500).json({ error: "Erro ao buscar vaga" });
        }
    }

    // ============================================================
    // CRIAR VAGA
    // ============================================================
    async create(req, res) {
        try {
            const vaga = await Vaga.create(req.body);
            return res.json(vaga);
        } catch (error) {
            console.error("Erro em VagaController.create:", error);
            return res.status(500).json({ error: "Erro ao criar vaga" });
        }
    }

    // ============================================================
    // ATUALIZAR VAGA
    // ============================================================
    async update(req, res) {
        const { id } = req.params;

        try {
            const vaga = await Vaga.findByPk(id);

            if (!vaga) {
                return res.status(404).json({ error: "Vaga não encontrada" });
            }

            await vaga.update(req.body);

            return res.json(vaga);
        } catch (error) {
            console.error("Erro em VagaController.update:", error);
            return res.status(500).json({ error: "Erro ao atualizar vaga" });
        }
    }

    // ============================================================
    // DELETAR VAGA
    // ============================================================
    async delete(req, res) {
        const { id } = req.params;

        try {
            const vaga = await Vaga.findByPk(id);

            if (!vaga) {
                return res.status(404).json({ error: "Vaga não encontrada" });
            }

            await vaga.destroy();

            return res.status(204).send();
        } catch (error) {
            console.error("Erro em VagaController.delete:", error);
            return res.status(500).json({ error: "Erro ao deletar vaga" });
        }
    }

    // ============================================================
    // BUSCAR TODAS AS VAGAS DE UMA EMPRESA
    // ============================================================
    async vagasPorEmpresa(req, res) {
        try {
            const { idCompany } = req.params;

            const vagas = await Vaga.findAll({
                where: { id_company: idCompany },
                include: [
                    { model: VagaProcesso, as: 'processo' },
                    { model: VagaDescricao, as: 'descricao' },
                    {
                        model: VagaRequisicao,
                        as: 'requisicao',
                        attributes: ['atuacao', 'conhecimentos', 'destaque']
                    },
                    {
                        model: VagaBeneficio,
                        as: 'beneficio',
                        attributes: ['salario', 'beneficios']
                    },
                    {
                        model: Acessibilidade,
                        as: 'acessibilidades',
                        through: { attributes: [] }
                    }
                ]
            });

            return res.json(vagas);

        } catch (error) {
            console.error("Erro em vagasPorEmpresa:", error);
            return res.status(500).json({ error: "Erro ao buscar vagas da empresa" });
        }
    }
}

module.exports = new VagaController();
