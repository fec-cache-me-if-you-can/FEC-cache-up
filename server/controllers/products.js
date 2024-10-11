const models = require('../models');

module.exports = {
  getAll: (req, res) => {
    console.log('GET ALL');
    let reqpage = 1;
    let reqCount = 5;

    if (req.body.page) {
      reqpage = req.body.page;
    }
    if (req.body.count) {
      reqCount = req.body.count;
    }

    models.products
      .fetchAll(reqpage, reqCount)
      .then((result) => res.send(result.data))
      .catch((err) => res.status(404).send(err));
  },
  getProductInformation: (req, res) => {
    console.log('GET INFORMATION');
    models.products
      .fetchProductInformation(req.body.product_id)
      .then((result) => res.send(result.data))
      .catch((err) => res.status(404).send(err));
  },
  getProductStyles: (req, res) => {
    console.log('GET STYLES');
    models.products
      .fetchProductStyles(req.body.product_id)
      .then((result) => res.send(result.data))
      .catch((err) => res.status(404).send(err));
  },
  getRelatedProducts: (req, res) => {
    console.log('GET RELATED');
    models.products
      .fetchRelatedProducts(req.body.product_id)
      .then((result) => res.send(result.data))
      .catch((err) => res.status(404).send(err));
  },
};
