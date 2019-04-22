const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/product');
const img           = require('../helpers/image');

router.post('/', img.multer.single('image'), img.sendUploadToGCS, productController.addProduct);
router.get('/', productController.listProduct);
router.get('/:id', productController.detailProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;