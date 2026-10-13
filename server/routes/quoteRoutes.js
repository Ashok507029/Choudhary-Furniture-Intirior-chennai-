const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// POST /api/quotes - Save a luxury quote calculation
router.post('/', async (req, res) => {
  try {
    const {
      propertyType,
      carpetArea,
      scope,
      finishLevel,
      estimatedMin,
      estimatedMax,
      clientName,
      clientPhone,
      clientEmail,
    } = req.body;

    if (!clientName || !clientPhone || !carpetArea) {
      return res.status(400).json({ success: false, message: 'Please provide required contact and property details' });
    }

    const quote = await Quote.create({
      propertyType,
      carpetArea,
      scope,
      finishLevel,
      estimatedMin,
      estimatedMax,
      clientName,
      clientPhone,
      clientEmail,
    });

    res.status(201).json({
      success: true,
      message: 'Luxury estimate dossier registered. Our cost estimator team will contact you.',
      data: quote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/quotes - Fetch all quotes (Admin)
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/quotes/:id - Update quote status
router.put('/:id', async (req, res) => {
  try {
    const updated = await Quote.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Quote estimate not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/quotes/:id - Delete quote
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Quote.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }
    res.json({ success: true, message: 'Quote estimate deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
