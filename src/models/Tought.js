const { Model, DataTypes } = require("sequelize");

class Tought extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Tought;
