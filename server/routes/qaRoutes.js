const controllers = require('../controllers');
const router = require('express').Router();

router.get('/questions', controllers.qa.getQuestions);
router.get('/questions/:question_id/answers', controllers.qa.getAnswers);

router.post('/questions', controllers.qa.postQuestions);
router.post('/answers', controllers.qa.postAnswers);

router.put('/questions/helpful', controllers.qa.putQuestionsHelpful);
router.put('/answers/helpful', controllers.qa.putAnswerHelpful);

router.put('/questions/report', controllers.qa.putQuestionReport);
router.put('/answers/report', controllers.qa.putAnswerReport);

module.exports = router;
