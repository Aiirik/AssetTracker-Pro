const express = require('express');
const {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  generateQRCode,
  disposeAsset
} = require('../controllers/assetController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/')
  .get(getAssets);

router.route('/:id')
  .get(getAsset);

router.route('/:id/qrcode')
  .get(generateQRCode);

// Private routes (require authentication)
router.route('/')
  .post(protect, authorize('admin', 'manager'), createAsset);

router.route('/:id')
  .put(protect, authorize('admin', 'manager'), updateAsset)
  .delete(protect, authorize('admin'), deleteAsset);

router.route('/:id/dispose')
  .put(protect, authorize('admin', 'manager'), disposeAsset);

module.exports = router;