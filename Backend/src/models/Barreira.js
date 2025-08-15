const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Barreira = sequelize.define('Barreira', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "tb_barreira",
    timestamps: true
})

module.exports = Barreira