const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  propertyType: {
    type: String,
    required: true,
  },
  carpetArea: {
    type: Number,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  finishLevel: {
    type: String,
    required: true,
  },
  estimatedMin: {
    type: Number,
    required: true,
  },
  estimatedMax: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  clientPhone: {
    type: String,
    required: true,
    trim: true,
  },
  clientEmail: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Proposal Sent', 'Accepted', 'Declined'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quote', quoteSchema);
