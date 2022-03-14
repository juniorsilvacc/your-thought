const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = {
  showToughts(req, res) {
    res.render("toughts/home");
  },

  async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    if (!user) {
      res.redirect("/login");
    }

    const toughts = user.Toughts.map((result) => result.dataValues);

    res.render("toughts/dashboard", { toughts });
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
