const controllers = require('../controllers');
const router = require('express').Router();

router.post('/', controllers.interactions.post);

module.exports = router;
