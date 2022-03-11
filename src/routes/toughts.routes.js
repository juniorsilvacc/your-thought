const express = require("express");
const routes = express.Router();

const ToughtController = require("../controllers/ToughtController");

routes.get("/", ToughtController.showToughts);

module.exports = routes;
