const models = require('../models');

module.exports = {
  post: (req, res) => {
    if (!req.body.element || !req.body.widget || !req.body.time) {
      return res.sendStatus(400);
    }
    models.interactions
      .create(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};
