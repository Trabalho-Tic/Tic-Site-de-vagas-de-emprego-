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
    }
}, {
    tableName: "tb_subtipodeficiencia",
    timestamps: true
});

SubtipoDeficiencia.associate = (models) => {

    // 🔥 CORREÇÃO IMPORTANTE
    SubtipoDeficiencia.belongsToMany(models.TipoDeficiencia, {
        through: "tb_subtipodeficienciatipodeficiencias",
        foreignKey: "id_subtipodeficiencia",
        otherKey: "id_tipodeficiencia",
        as: "tipos"
    });

    SubtipoDeficiencia.belongsToMany(models.Barreira, {
        through: "tb_subtipobarreira",
        foreignKey: 'id_subtipodeficiencia',
        otherKey: 'id_barreira',
        as: 'barreiras'
    });

    SubtipoDeficiencia.belongsToMany(models.Candidato, {
        through: "tb_candidato_subtipodeficiencia",
        foreignKey: "id_subtipodeficiencia",
        otherKey: "id_candidato",
        as: "candidatos"
    });
};

module.exports = SubtipoDeficiencia;
