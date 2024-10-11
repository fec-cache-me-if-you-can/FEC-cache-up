const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.reviews.getReviews);
router.get('/meta', controllers.reviews.getMeta);

router.post('/', controllers.reviews.postReview);
router.put('/helpful', controllers.reviews.putHelpful);
router.put('/report', controllers.reviews.putReport);

module.exports = router;
