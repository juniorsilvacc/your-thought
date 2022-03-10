const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Tought = require("../models/Tought");
const User = require("../models/User");

const connection = new Sequelize(dbConfig);

Tought.init(connection);
User.init(connection);

Tought.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
