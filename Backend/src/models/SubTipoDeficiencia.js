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

    SubtipoDeficiencia.belongsToMany(models.TipoDeficiencia, {
        through: "tb_subtipodeficienciatipodeficiencia",
        foreignKey: "id_subtipo",
        otherKey: "id_tipodeficiencia",
        as: "tipos"
    });

    SubtipoDeficiencia.belongsToMany(models.Barreira, {
      through: "tb_subtipobarreira",
      foreignKey: 'id_subtipodeficiencia',
      otherKey: 'id_barreira',
      as: 'barreiras'
    });

};

module.exports = SubtipoDeficiencia;
