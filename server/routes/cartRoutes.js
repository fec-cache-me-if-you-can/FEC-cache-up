const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.cart.get);
router.post('/', controllers.cart.post);

module.exports = router;
