const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  service: {
    type: String,
    default: 'Full Turnkey Interior Execution',
  },
  budget: {
    type: String,
    default: '₹25L - ₹50L',
  },
  propertyType: {
    type: String,
    default: 'Luxury Villa / Apartment',
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Discussion', 'Closed'],
    default: 'New',
  },
  source: {
    type: String,
    default: 'Website Contact Form',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Inquiry', inquirySchema);
