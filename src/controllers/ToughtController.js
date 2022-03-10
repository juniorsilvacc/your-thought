const Tought = require("../models/Tought");

module.exports = {
  async handle(req, res) {
    const { title } = req.body;

    const tought = await Tought.create({ title });

    return res.json(tought);
  },
};
