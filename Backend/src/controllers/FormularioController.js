const Formulario = require('../models/Fomulario');

class FormularioController {

    async index(request, response) {
        const formularios = await Formulario.findAll();
        return response.json(formularios);
    }

    async create(request, response) {
        const formulario = await Formulario.create(request.body)
        return response.json(formulario)
    }

}

module.exports = new FormularioController()
 