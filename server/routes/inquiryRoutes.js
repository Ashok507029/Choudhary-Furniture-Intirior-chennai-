const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// POST /api/inquiries - Submit a new inquiry from Contact Form / Chatbot
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, budget, propertyType, message, source } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and phone' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      service,
      budget,
      propertyType,
      message,
      source: source || 'Website Form',
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request received successfully. Our Lead Architect will connect with you.',
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/inquiries - Get all inquiries (Admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/inquiries/:id - Update inquiry status
router.put('/:id', async (req, res) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/inquiries/:id - Delete inquiry
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
