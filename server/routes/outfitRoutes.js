const {
  addProductToSessionOutfit,
  removeProductFromSessionOutfit,
  getSessionOutfit,
} = require('../controllers/outfits.js');
const { Router } = require('express');

const router = Router();

router.post('/', addProductToSessionOutfit);
router.delete('/', removeProductFromSessionOutfit);
router.get('/', getSessionOutfit);

module.exports = router;
