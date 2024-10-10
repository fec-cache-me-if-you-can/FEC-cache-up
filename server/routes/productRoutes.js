const controllers = require('../controllers');
const router = require('express').Router();

// example
// router.get('/messages', controller.messages.get);

router.get('/', controllers.products.getAll);
router.get('/information', controllers.products.getProductInformation);
router.get('/styles', controllers.products.getProductStyles);
router.get('/related', controllers.products.getRelatedProducts);

module.exports = router;
