const express = require('express');
const {
  getStats,
  exportCSV,
  exportPDF
} = require('../controllers/reportController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.get('/stats', getStats);
router.get('/export/csv', exportCSV);
router.get('/export/pdf', exportPDF);

module.exports = router;