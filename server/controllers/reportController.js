const Asset = require('../models/Asset');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Get asset statistics
// @route   GET /api/reports/stats
// @access  Public
exports.getStats = async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const activeAssets = await Asset.countDocuments({ status: 'active' });
    const disposedAssets = await Asset.countDocuments({ status: 'disposed' });
    const maintenanceAssets = await Asset.countDocuments({ status: 'maintenance' });
    const lostAssets = await Asset.countDocuments({ status: 'lost' });
    
    const categoryStats = await Asset.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: '$currentValue' }
        }
      }
    ]);
    
    const locationStats = await Asset.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 },
          totalValue: { $sum: '$currentValue' }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalAssets,
        activeAssets,
        disposedAssets,
        maintenanceAssets,
        lostAssets,
        categoryStats,
        locationStats
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Export assets to CSV
// @route   GET /api/reports/export/csv
// @access  Public
exports.exportCSV = async (req, res) => {
  try {
    const assets = await Asset.find();
    
    // Create CSV header
    let csv = 'Name,Description,Category,Barcode,Serial Number,Purchase Date,Purchase Price,Current Value,Location,Assigned To,Status,Condition\n';
    
    // Add asset data
    assets.forEach(asset => {
      csv += `"${asset.name}","${asset.description || ''}","${asset.category}","${asset.barcode}","${asset.serialNumber || ''}","${asset.purchaseDate.toISOString().split('T')[0]}","${asset.purchasePrice}","${asset.currentValue}","${asset.location || ''}","${asset.assignedTo || ''}","${asset.status}","${asset.condition}"\n`;
    });
    
    res.header('Content-Type', 'text/csv');
    res.attachment('assets.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Export assets to PDF
// @route   GET /api/reports/export/pdf
// @access  Public
exports.exportPDF = async (req, res) => {
  try {
    const assets = await Asset.find();
    
    // Create a document
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=assets.pdf');
    
    // Pipe the PDF to the response
    doc.pipe(res);
    
    // Add title
    doc.fontSize(20).text('Asset Management Report', { align: 'center' });
    doc.moveDown();
    
    // Add asset table
    doc.fontSize(12);
    
    // Table headers
    const headers = ['Name', 'Category', 'Barcode', 'Value', 'Status'];
    const headerX = [50, 150, 250, 350, 450];
    
    headers.forEach((header, i) => {
      doc.text(header, headerX[i], 100);
    });
    
    // Draw header line
    doc.moveTo(50, 120).lineTo(550, 120).stroke();
    
    // Add asset data
    let y = 140;
    assets.forEach(asset => {
      doc.text(asset.name, 50, y);
      doc.text(asset.category, 150, y);
      doc.text(asset.barcode, 250, y);
      doc.text(`$${asset.currentValue}`, 350, y);
      doc.text(asset.status, 450, y);
      y += 20;
      
      // Add page break if needed
      if (y > 700) {
        doc.addPage();
        y = 50;
      }
    });
    
    // Finalize PDF file
    doc.end();
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};