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

    if (password > 6) {
      req.flash("message", "A senha precisa ter no mínimo 6 caractere.");
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
      await User.create(user);
      req.flash("message-success", "Cadastro realizado com sucesso.");
      res.render("auth/login");
    } catch (err) {
      console.log(err);
    }

    return;
  },
};
