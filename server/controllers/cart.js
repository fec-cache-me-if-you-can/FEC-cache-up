const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.cart
      .fetch()
      .then((result) => res.send(result.data))
      .catch(() => res.sendStatus(400));
  },
  post: (req, res) => {
    if (!req.body.sku_id) {
      return res.sendStatus(400);
    }
    models.cart
      .create(req.body)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(400));
  },
};
