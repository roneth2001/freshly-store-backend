const express = require('express');
const router = express.Router();
const { getOrders, getOrderById } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getOrders);
router.get('/:id', verifyToken, getOrderById);

module.exports = router;