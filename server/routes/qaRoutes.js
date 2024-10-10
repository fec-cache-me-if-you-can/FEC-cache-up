const controllers = require('../controllers');
const router = require('express').Router();

router.get('/qa/questions', controllers.qa.getQuestions);
router.get('/qa/answers', controllers.qa.getAnswers);

router.post('/qa/questions', controllers.qa.postQuestions);
router.post('/qa/answers', controllers.qa.postAnswers);

router.put('/qa/questions', controllers.qa.putQuestionsHelpful);
router.put('/qa/answers', controllers.qa.putAnswerHelpful);

router.put('/qa/questions', controllers.qa.putQuestionReport);
router.put('/qa/answers', controllers.qa.putAnswerReport);

module.exports = router;
