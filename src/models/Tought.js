const { DataTypes } = require("sequelize");

const db = require("../database/index");

const User = require("../models/User");

const Tought = db.define("Tought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;
