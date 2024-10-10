const models = require('../models');

module.exports = {

  getReviews: (req, res) => {
    if (!req.body.review_id) {
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
    if (!req.body.review_id) {
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
    if (!req.body.review_id) {
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
    console.log(req.body.review_id);
    models.reviews.helpful(req.body.review_id)
      .then(result => res.status(204).send('NO CONTENT'))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  putReport: (req, res) => {
    console.log(req.body.review_id);
    models.reviews.report(req.body.review_id)
      .then(result => res.status(204).send('NO CONTENT'))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  }
}