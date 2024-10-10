const controllers = require('../controllers');
const router = require('express').Router();

// example
// router.get('/messages', controller.messages.get);

router.get('/', controllers.products.get);
router.get('/:product_id', controllers.products.get);
router.get('/:product_id/styles', controllers.products.get)

module.exports = router;
