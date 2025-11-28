const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const SubTipoBarreiras = sequelize.define('SubTipoBarreiras', {
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
    tableName: "tb_subtipobarreiras",
    timestamps: true
})

SubTipoBarreiras.associate = (models) => {
    // Cada registro da tabela pertence a um Subtipo
    SubTipoBarreiras.belongsTo(models.SubtipoDeficiencia, {
        foreignKey: 'id_subtipodeficiencia',
        as: 'subtipo',
        onDelete: 'CASCADE'
    });

    // E pertence a uma Barreira
    SubTipoBarreiras.belongsTo(models.Barreira, {
        foreignKey: 'id_barreira',
        as: 'barreira',
        onDelete: 'CASCADE'
    });

    SubTipoBarreiras.belongsToMany(models.Acessibilidade, {
        through: "tb_subtipobarreira_acessibilidade",
        foreignKey: "id_subtipobarreira",
        otherKey: "id_acessibilidade",
        as: "acessibilidades"
    });
};

module.exports = SubTipoBarreiras