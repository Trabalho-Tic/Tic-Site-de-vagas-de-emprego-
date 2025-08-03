const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Endereco = sequelize.define("Endereco", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true        
    },
    cep: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroCasa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "tb_endereco",
    timestamps: true,
})