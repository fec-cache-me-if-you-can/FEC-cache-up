const axios = require('axios');
require('dotenv').config();
const bodyToParams = require('../lib/bodyToParams.js');

module.exports = {

  fetchAll: (body) => {
    params = bodyToParams(body);
    return axios.get(`${process.env.API_URL}products?${params}`, {
      headers: {
        'Authorization': process.env.GITHUB_TOKEN
      }
    })
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