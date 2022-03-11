const express = require("express");
const routes = express.Router();

const AuthController = require("../controllers/AuthController");

routes.get("/login", AuthController.login);
routes.get("/register", AuthController.register);
routes.post("/register", AuthController.registerPost);

module.exports = routes;
