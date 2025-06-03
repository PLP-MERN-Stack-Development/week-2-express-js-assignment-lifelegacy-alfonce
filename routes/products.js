const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getStats
} = require('../controllers/productsController');
const validateProduct = require('../middleware/validation');
const auth = require('../middleware/auth');

// Routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/stats', getStats);
router.get('/:id', getProductById);
router.post('/', auth, validateProduct, createProduct);
router.put('/:id', auth, validateProduct, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
