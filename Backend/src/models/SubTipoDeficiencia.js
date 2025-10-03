const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubtipoDeficiencia = sequelize.define('SubtipoDeficiencia', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_tipodeficiencia: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_tipodeficiencia",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, {
    tableName: "tb_subtipodeficiencia",
    timestamps: true
});

SubtipoDeficiencia.associate = (models) => {
    SubtipoDeficiencia.belongsTo(models.TipoDeficiencia, {
        foreignKey: "id_tipodeficiencia",
        as: "tipoDeficiencia"
    });
};

module.exports = SubtipoDeficiencia;
