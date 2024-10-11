const models = require('../models');

module.exports = {
  getQuestions: (req, res) => {
    if (!req.body.product_id) {
      return res.sendStatus(400);
    }
    models.qa
      .fetchQuestions(req.body)
      .then((result) => res.send(result.data))
      .catch(() => res.sendStatus(400));
  },
  getAnswers: (req, res) => {
    if (!req.body.question_id) {
      return res.sendStatus(400);
    }
    models.qa
      .fetchAnswers(req.body.question_id)
      .then((result) => res.send(result.data))
      .catch(() => res.sendStatus(400));
  },

  postQuestions: (req, res) => {
    models.qa
      .createQuestion(req.body)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(400));
  },
  postAnswers: (req, res) => {
    models.qa
      .createAnswer(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  putQuestionsHelpful: (req, res) => {
    models.qa
      .questionHelpful(req.body.question_id)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  putAnswerHelpful: (req, res) => {
    models.qa
      .answerHelpful(req.body.answer_id)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(400));
  },

  putQuestionReport: (req, res) => {
    models.qa
      .questionReport(req.body.question_id)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(400));
  },
  putAnswerReport: (req, res) => {
    models.qa
      .answerReport(req.body.answer_id)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(400));
  },
};
