const express = require("express");
const routes = express.Router();

const checkAuth = require("../helpers/auth").checkAuth;

const ToughtController = require("../controllers/ToughtController");

routes.get("/dashboard", checkAuth, ToughtController.dashboard);

routes.get("/add", checkAuth, ToughtController.createTought);
routes.post("/add", checkAuth, ToughtController.createToughtSave);

routes.post("/remove", checkAuth, ToughtController.removeTought);

routes.get("/", ToughtController.showToughts);

module.exports = routes;
