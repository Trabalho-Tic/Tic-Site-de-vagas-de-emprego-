const { DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const Formulario = sequelize.define('Formulario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataCriacao: {
        type: DataTypes.DATEONLY,
        allowNull: false 
    }
}, {
    tableName: 'tb_formulario',
    timestamps: true,
    createdAt: false
})

module.exports = Formulario