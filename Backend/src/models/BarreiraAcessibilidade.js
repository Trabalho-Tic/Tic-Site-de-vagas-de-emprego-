const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const SubTipoBarreira = sequelize.define('SubTipoBarreira', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    id_subtipodeficiencia: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_subtipodeficiencia",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_barreira: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_barreira",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, {
    tableName: "tb_subtipobarreira",
    timestamps: true
})

module.exports = SubTipoBarreira