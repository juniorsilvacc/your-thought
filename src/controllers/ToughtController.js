const Tought = require("../models/Tought");

module.exports = {
  async showToughts(req, res) {
    res.render("toughts/home");
  },

  async dashboard(req, res) {
    res.render("toughts/dashboard");
  },

  createToughts(req, res) {
    res.render("toughts/create");
  },
};
