const models = require('../models');

module.exports = {
  getAll: (req, res) => {
    models.products.fetchAll()
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
