const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Admin = sequelize.define("Admin", {
  id_user: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "tb_admin",
  timestamps: true,
});

Admin.belongsTo(User, { foreignKey: "id_user", as: "user" });
User.hasOne(Admin, { foreignKey: "id_user", as: "admin" });

module.exports = Admin;
