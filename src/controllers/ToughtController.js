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

    let emptyToughts = false;

    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render("toughts/dashboard", { toughts, emptyToughts });
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

  async removeTought(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    try {
      await Tought.destroy({ where: { id, UserId } });

      req.flash("message-success", "Pensamento removido com sucesso!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updateTought(req, res) {
    const id = req.params.id;

    const tought = await Tought.findOne({ where: { id }, raw: true });

    res.render("toughts/edit", { tought });
  },

  async updateToughtSave(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
    };

    await Tought.update(tought, { where: { id } });

    req.flash("message-success", "Pensamento atualizado com sucesso!");

    req.session.save(() => {
      res.redirect("/toughts/dashboard");
    });
  },
};
