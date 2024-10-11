const controllers = require('../controllers');
const router = require('express').Router();

router.get(
  '/:product_id/information',
  controllers.products.getProductInformation,
);
router.get('/:product_id/styles', controllers.products.getProductStyles);
router.get('/:product_id/related', controllers.products.getRelatedProducts);
router.get('/', controllers.products.getAll);

module.exports = router;
