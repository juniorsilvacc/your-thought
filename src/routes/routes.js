const express = require("express");
const ToughtController = require("../controllers/ToughtController");

const routes = express.Router();

routes.post("/toughts", ToughtController.handle);

module.exports = routes;
