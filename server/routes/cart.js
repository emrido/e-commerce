const express        = require('express');
const router         = express.Router();
const cartController = require('../controllers/cart');

router.get('/', cartController.getCart);
router.post('/', cartController.createCart);
router.put('/addItem/:id', cartController.addItem);
router.put('/removeItem/:id', cartController.removeItem);
router.delete('/:id', cartController.deleteCart);

module.exports = router;