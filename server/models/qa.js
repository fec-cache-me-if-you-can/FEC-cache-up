const axios = require('axios');
require('dotenv').config();
const objectToParams = require('../lib/objectToParams.js');

module.exports = {
  fetchQuestions: (query) => {
    let params = objectToParams(query);
    return axios.get(`${process.env.API_URL}qa/questions?${params}`, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN,
      },
    });
  },
  fetchAnswers: (id) => {
    return axios.get(`${process.env.API_URL}qa/questions/${id}/answers`, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN,
      },
    });
  },

  createQuestion: (body) => {
    return axios.post(`${process.env.API_URL}qa/questions`, body, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN,
      },
    });
  },
  createAnswer: (body) => {
    let id = body.question_id;
    return axios.post(
      `${process.env.API_URL}qa/questions/${id}/answers`,
      body,
      {
        headers: {
          Authorization: process.env.GITHUB_TOKEN,
        },
      },
    );
  },

  questionHelpful: (id) => {
    return axios.put(
      `${process.env.API_URL}qa/questions/${id}/helpful`,
      {},
      {
        headers: {
          Authorization: process.env.GITHUB_TOKEN,
        },
      },
    );
  },
  answerHelpful: (id) => {
    return axios.put(
      `${process.env.API_URL}qa/answers/${id}/helpful`,
      {},
      {
        headers: {
          Authorization: process.env.GITHUB_TOKEN,
        },
      },
    );
  },

  questionReport: (id) => {
    return axios.put(
      `${process.env.API_URL}qa/questions/${id}/report`,
      {},
      {
        headers: {
          Authorization: process.env.GITHUB_TOKEN,
        },
      },
    );
  },
  answerReport: (id) => {
    return axios.put(
      `${process.env.API_URL}qa/answers/${id}/report`,
      {},
      {
        headers: {
          Authorization: process.env.GITHUB_TOKEN,
        },
      },
    );
  },
};
