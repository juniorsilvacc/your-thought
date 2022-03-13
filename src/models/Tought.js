const { Model, DataTypes } = require("sequelize");

class Tought extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        user_id: DataTypes.NUMBER,
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
