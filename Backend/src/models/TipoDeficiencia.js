const { DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const TipoDeficiencia = sequelize.define('TipoDeficiencia', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'tb_tipodeficiencia',
    timestamps: true
})

module.exports = TipoDeficiencia