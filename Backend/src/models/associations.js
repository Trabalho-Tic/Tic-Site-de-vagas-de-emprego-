const Formulario = require("./Formulario")
const Questionario = require("./Questionario")
const Dominio = require("./Dominio")
const Questao = require("./Questao")
const Candidato = require("./Candidato")
const Resposta = require("./Resposta")

Formulario.hasMany(Questionario, {
    foreignKey: "id_formulario",
    as: "questionario"
})

Questionario.belongsTo(Formulario, {
    foreignKey: "id_formulario",
    as: "formulario"
})

module.exports = { Formulario, Questionario }