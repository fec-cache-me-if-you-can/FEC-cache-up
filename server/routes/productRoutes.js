const controllers = require('../controllers');
const router = require('express').Router();

router.get('/information', controllers.products.getProductInformation);
router.get('/styles', controllers.products.getProductStyles);
router.get('/related', controllers.products.getRelatedProducts);
router.get('/', controllers.products.getAll);

module.exports = router;
