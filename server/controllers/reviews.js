const models = require('../models');
const { fetchAll } = require('../models/products');
const { postReview } = require('../models/reviews');

module.exports = {

  getReviews: (req, res) => {
    if (!req.body.product_id) {
      return res.sendStatus(400);
    }
    models.reviews.fetchAll(req.body)
      .then(result => {
        res.send(result.data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  },
  getMeta: (req, res) => {
    if (!req.body.product_id) {
      return res.sendStatus(400);
    }
    models.reviews.fetchMeta(req.body)
      .then(result => {
        res.send(result.data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  },
  postReview: (req, res) => {
    if (!req.body.product_id) {
      return res.sendStatus(400);
    }
    models.reviews.createReview(req.body)
      .then(result => {
        res.status(201).send('CREATED');
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  },
  putHelpful: (req, res) => {

  },
  putReport: (req, res) => {

  }
}