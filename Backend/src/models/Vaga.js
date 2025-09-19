const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Vaga = sequelize.define("tb_vaga", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "tb_vaga",
    timestamps: true
}
)

module.exports = Vaga