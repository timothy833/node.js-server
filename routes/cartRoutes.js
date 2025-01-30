const express = require('express');
const CartController = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/cart', authMiddleware, CartController.getAllItems);
router.post('/cart', authMiddleware, CartController.addItem);
router.put('/cart/:id', authMiddleware, CartController.updateItem);
router.delete('/cart/:id', authMiddleware, CartController.deleteItem);

module.exports = router;