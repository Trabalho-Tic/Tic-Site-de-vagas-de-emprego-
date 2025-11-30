const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
});

TipoDeficiencia.associate = (models) => {

    // 🔥 CORREÇÃO IMPORTANTE — N:N
    TipoDeficiencia.belongsToMany(models.SubtipoDeficiencia, {
        through: "tb_subtipodeficienciatipodeficiencias",
        foreignKey: "id_tipodeficiencia",
        otherKey: "id_subtipodeficiencia",
        as: "subtipos"
    });

};

module.exports = TipoDeficiencia;
