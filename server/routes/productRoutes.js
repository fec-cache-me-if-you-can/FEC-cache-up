const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.products.getAll);
router.get(
  '/:product_id/information',
  controllers.products.getProductInformation,
);
router.get('/:product_id/styles', controllers.products.getProductStyles);
router.get('/:product_id/related', controllers.products.getRelatedProducts);

module.exports = router;
