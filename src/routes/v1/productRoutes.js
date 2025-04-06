const express = require('express');
const router = express.Router();
const productController = require('../../controllers/v1/productController');

router.get('/products', productController.getProduct);
router.get('/product/:id', productController.getProductById);
router.post('/product', productController.postProduct);
router.put('/product/:id', productController.putAndPatchProductById);
router.patch('/product/:id', productController.putAndPatchProductById);
router.delete('/product/:id', productController.deleteProductById);
module.exports = router;