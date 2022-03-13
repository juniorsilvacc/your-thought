const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login(req, res) {
    res.render("auth/login");
  },

  async loginPost(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("message", "E-mail e/ou senha incorreto.");
      res.render("auth/login");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "E-mail e/ou senha incorreto.");
      res.render("auth/login");
      return;
    }

    try {
      req.session.userid = user.id;

      const token = jwt.sign(
        { id: user.id },
        "cT8pk904ZjwbrMzb7Z0Fm1ol4xVOHFj3",
        {
          expiresIn: 3000,
        }
      );

      req.flash("message-success", "Autenticação realizado com sucesso.");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }

    return;
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

    const checkIfUserExists = await User.findOne({ where: { email } });

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

  logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  },
};
