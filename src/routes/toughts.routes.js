const express = require("express");
const routes = express.Router();

const checkAuth = require("../helpers/auth").checkAuth;

const ToughtController = require("../controllers/ToughtController");

routes.get("/dashboard", checkAuth, ToughtController.dashboard);
routes.get("/add", ToughtController.createToughts);
routes.get("/", ToughtController.showToughts);

module.exports = routes;
