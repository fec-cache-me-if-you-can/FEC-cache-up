const axios = require('axios');
require('dotenv').config();

module.exports = {
  fetch: () => {
    return axios.get(`${process.env.API_URL}cart`, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN,
      },
    });
  },
  create: (body) => {
    return axios.post(`${process.env.API_URL}cart`, body, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN,
      },
    });
  },
};
