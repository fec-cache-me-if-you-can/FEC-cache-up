const axios = require('axios');
require('dotenv').config();
const bodyToParams = require('../lib/bodyToParams.js');

module.exports = {

  fetchAll: (body) => {
    params = bodyToParams(body);
    return axios.get(`${process.env.API_URL}reviews?${params}`, {
      headers: {
        'Authorization': process.env.GITHUB_TOKEN
      }
    })
  },
  fetchMeta: (body) => {
    params = bodyToParams(body);
    return axios.get(`${process.env.API_URL}reviews/meta?${params}`, {
      headers: {
        'Authorization': process.env.GITHUB_TOKEN
      }
    })
  },
  createReview: (body) => {
    return axios.post(`${process.env.API_URL}reviews`, body, {
      headers: {
        'Authorization': process.env.GITHUB_TOKEN
      },
    })
  },
  markHelpful: (id) => {

  },
  Report: (id) => {

  }
}