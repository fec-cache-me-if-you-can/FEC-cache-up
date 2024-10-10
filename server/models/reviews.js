const axios = require('axios');
const { fetchAll } = require('./products');
const { postHelpful, postReport } = require('../controllers/reviews');
require('dotenv').config();

module.exports = {

  fetchAll: (page, count, sort, product_id) => {

  },
  fetchMeta: (product_id) => {

  },
  createReview: () => {

  },
  markHelpful: (id) => {

  },
  Report: (id) => {

  }
}