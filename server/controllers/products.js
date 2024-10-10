const models = require('../models');

module.exports = {
  getAll: (req, res) => {
    let reqpage = 1;
    let reqCount = 5;

    if (req.body.page) {
      reqpage = req.body.page;
    }
    if (req.body.count) {
      reqCount = req.body.count;
    }

    models.products.fetchAll(reqpage, reqCount)
      .then(result => {
        res.send(result.data);
      })
      .catch(err => res.status(404).send(err));
  },
  getProductInformation: (req, res) => {

  },
  getProductStyles: (req, res) => {

  },
  getRelatedProducts: (req, res) => {

  },
}
