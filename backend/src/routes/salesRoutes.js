const express = require('express');
const router = express.Router();
const { getSales, getFilters, getHealth } = require('../controllers/salesController');

router.get('/sales', getSales);
router.get('/sales/filters', getFilters);
router.get('/health', getHealth);

module.exports = router;
