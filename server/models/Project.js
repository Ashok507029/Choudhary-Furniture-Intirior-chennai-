const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Residential', 'Modular Kitchens', 'Custom Furniture', 'Commercial & Retail', 'Living & Dining'],
    default: 'Residential',
  },
  location: {
    type: String,
    default: 'Chennai, India',
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Main image URL is required'],
  },
  gallery: [{
    type: String,
  }],
  area: {
    type: String,
    default: '3,500 sq.ft',
  },
  duration: {
    type: String,
    default: '6-8 Weeks',
  },
  materials: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);
