const Formulario = require('../models/Fomulario');

class FormularioController {

    async index(request, response) {
        const formularios = await Formulario.findAll();
        return response.json(formularios);
    }

}

module.exports = new FormularioController()
 