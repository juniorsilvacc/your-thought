const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  login(req, res) {
    res.render("auth/login");
  },

  register(req, res) {
    res.render("auth/register");
  },

  async registerPost(req, res) {
    const { name, email, password, confirmePassword } = req.body;

    if (password != confirmePassword) {
      req.flash("message", "Senhas diferentes, tente novamente.");
      res.render("auth/register");
      return;
    }

    const checkIfUserExists = await User.findOne({ email });

    if (checkIfUserExists) {
      req.flash("message", "E-mail já cadastrado, tente novamente.");
      res.render("auth/register");
      return;
    }

    const salt = bcrypt.genSaltSync(10);

    const PasswordHash = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: PasswordHash,
    };

    try {
      const createdUserId = await User.create(user);

      req.session.userid = createdUserId.id;

      req.flash("message-success", "Cadastro realizado com sucesso.");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }

    return;
  },
};
