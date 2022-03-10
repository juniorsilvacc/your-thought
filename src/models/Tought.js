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
}

module.exports = Tought;
