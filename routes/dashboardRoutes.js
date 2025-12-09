const express = require('express');
const router = express.Router();
const { getStats, getShopInfo } = require('../controllers/dashboardController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/stats', verifyToken, getStats);
router.get('/shop/info', verifyToken, getShopInfo);

module.exports = router;