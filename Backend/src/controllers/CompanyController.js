const Company = require('../models/Company');

class CompanyController {

    async index(request, response) {
        try {
            const companys = await Company.findAll();
            return response.json(companys);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar Companys" })
        }
    }

    async show(request, response) {
        const { id } = request.params
        try {
            const company = await Company.findByPk(id)
            if (!company) {
                return response.status(404).json({ error: "Company não encontrado" })
            }
            return response.json(company)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar por Company"})
        }
    }

    async create(request, response) {
        try {
            const company = await Company.create(request.body)
            return response.json(company)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar Company"})
        }
    }
    
    async update(request, response) {
        const { id } = request.params
        try {
            const company = await Company.findByPk(id)
            if (!company) {
                return response.status(404).json({ error: "Company não encontrado"})
            }
            await company.update(request.body)
            return response.json(company)
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar Company"})
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
        try {
            const company = await Company.findByPk(id);
            if (!company) {
                return response.status(404).json({ error: 'Company não encontrado.' });
            }
            await company.destroy();
            return response.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar Company.' });
        }
    }
}

module.exports = new CompanyController()
 