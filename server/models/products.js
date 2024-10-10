const axios = require('axios');
require('dotenv').config();


// To use this API, you must create a GitHub API Token
// and attach it in every request as an "Authorization" header.

module.exports = {
  fetchAll: (page, count) => {
    return axios.get(`${process.env.API_URL}products?page=${page}&count=${count}`, {
      headers: {
        'Authorization': process.env.GITHUB_TOKEN
      }
    })
  },
  fetchProductInformation: (id) => {
    return axios.get(`${process.env.API_URL}products/${id}`, {
      headers: {
        'Authorization': process.env.GITHUB_TOKEN
      }
    })
  },
  fetchProductStyles: (id) => {

  },
  fetchRelatedProducts: (id) => {

  }
}