const express            = require('express');
const router             = express.Router();
const productRoute       = require('./product');
const userRoute          = require('./user');
const cartRoute          = require('./cart');
const { authentication } = require('../middlewares/authentication');

router.use('/users', userRoute);
router.use('/products', productRoute);

router.use(authentication);

router.use('/carts', cartRoute);

module.exports = router;