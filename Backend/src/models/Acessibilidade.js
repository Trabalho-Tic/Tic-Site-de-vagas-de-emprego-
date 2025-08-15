const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Acessibilidade = sequelize.define('Acessibilidade', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primarykey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "tb_acessibilidade",
    timestamps: true
})

module.exports = Acessibilidade