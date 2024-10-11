const controllers = require('../controllers');
const router = require('express').Router();

router.post('/', controllers.cart.post);

module.exports = router;
