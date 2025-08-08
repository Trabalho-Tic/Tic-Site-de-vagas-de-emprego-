const { Questionario, Formulario } = require('../models/associations');

class FormularioController {

    async index(request, response) {
        try {
            const formularios = await Formulario.findAll();
            return response.json(formularios);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Formularios" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const formulario = await Formulario.findByPk(id)
            if (!formulario) {
                return response.status(404).json({ error: "Formulario não encontrado" })
            }
            return response.json(formulario)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por formulario"})
        }
    }

    async showWithQuestionario(request, response) {     
        try {
            const { id } = request.params
            const formulario = await Formulario.findByPk(id, {include: { model: Questionario, as: "questionario"}})
            if (!formulario) {
                response.status(404).json({ error: "Formulario não encontrado"})
            }
            response.status(200).json(formulario)
        } catch (error) {
            response.status(500).json({ error: "Erro ao buscar formulario"})
        }
    }

    async create(request, response) {
        try {
            const formulario = await Formulario.create(request.body)
            return response.json(formulario)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Formulario"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const formulario = await Formulario.findByPk(id)
            if (!formulario) {
                return response.status(404).json({ error: "Formulario não encontrado"})
            }
            await formulario.update(request.body)
            return response.json(formulario)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Formulario"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const formulario = await Formulario.findByPk(id);
            if (!formulario) {
                return response.status(404).json({ error: 'Formulario não encontrado.' });
            }
            await formulario.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Formulario.' });
        }
    }
}

module.exports = new FormularioController()
 