const Tought = require("../models/Tought");

module.exports = {
  showToughts(req, res) {
    res.render("toughts/home");
  },

  async dashboard(req, res) {
    res.render("toughts/dashboard");
  },

  createTought(req, res) {
    res.render("toughts/create");
  },

  async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      user_id: req.session.userid,
    };

    try {
      await Tought.create(tought);

      req.flash("message-success", "Pensamento criado com sucesso!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (err) {
      console.log(err);
    }
  },
};
