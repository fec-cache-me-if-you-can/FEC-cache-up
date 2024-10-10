const models = require('../models');
const { fetchAll } = require('../models/products');
const { postReview } = require('../models/reviews');

module.exports = {

  getReviews: (req, res) => {
    models.reviews.fetchAll()
  },
  getMeta: (req, res) => {

  },
  postReview: (req, res) => {

  },
  putHelpful: (req, res) => {

  },
  putReport: (req, res) => {

  }
}