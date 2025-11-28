const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const SubTipoDeficienciaTipoDeficiencia = sequelize.define('SubTipoDeficienciaTipoDeficiencia', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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
    }
}, {
    tableName: "tb_subtipodeficienciatipodeficiencia",
    timestamps: true
})

SubTipoDeficienciaTipoDeficiencia.associate = (models) => {
    SubTipoDeficienciaTipoDeficiencia.belongsTo(models.SubtipoDeficiencia, {
        foreignKey: 'id_subtipodeficiencia',
        as: 'subtipo',
        onDelete: 'CASCADE'
    });

    SubTipoDeficienciaTipoDeficiencia.belongsTo(models.TipoDeficiencia, {
        foreignKey: 'id_tipodeficiencia',
        as: 'tipodeficiencia',
        onDelete: 'CASCADE'
    });
};

module.exports = SubTipoDeficienciaTipoDeficiencia