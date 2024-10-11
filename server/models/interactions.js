const axios = require('axios');
require('dotenv').config();

module.exports = {
  create: (body) => {
    return axios.post(`${process.env.API_URL}interactions`, body, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN,
      },
    });
  },
};
