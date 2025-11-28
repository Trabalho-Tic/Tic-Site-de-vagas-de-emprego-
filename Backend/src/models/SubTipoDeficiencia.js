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
        onDelete: "CASCADE"
    }
}, {
    tableName: "tb_subtipodeficiencia",
    timestamps: true
});

SubtipoDeficiencia.associate = (models) => {

    SubtipoDeficiencia.belongsTo(models.TipoDeficiencia, {
        foreignKey: "id_tipodeficiencia",
        as: "tipo"
    });

    SubtipoDeficiencia.belongsToMany(models.Barreira, {
        through: "tb_subtipobarreira",
        foreignKey: 'id_subtipodeficiencia',
        otherKey: 'id_barreira',
        as: 'barreiras'
    });

    // 🔥 NOVO: relação com candidatos
    SubtipoDeficiencia.belongsToMany(models.Candidato, {
        through: "tb_candidato_subtipodeficiencia",
        foreignKey: "id_subtipodeficiencia",
        otherKey: "id_candidato",
        as: "candidatos"
    });
};

module.exports = SubtipoDeficiencia;
