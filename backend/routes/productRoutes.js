const express = require('express');

const { createProduct, getProductBySKU, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin} = require('../middleware/authMiddleware');
const upload = require('../utils/productUtils')
const router = express.Router();

router.route('/new').post(protect, admin, upload.array('images', 5), createProduct);
router.route('/update/:sku').put(protect, admin, upload.array('images', 5), updateProduct);
router.route('/delete/:sku').delete(protect, admin, deleteProduct);
router.route('/:sku').get(getProductBySKU);
router.route('/').get(getProducts);

module.exports = router;
