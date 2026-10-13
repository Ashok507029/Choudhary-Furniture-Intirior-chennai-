const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'cfi_luxury_interiors_super_secret_jwt_key_2026', {
    expiresIn: '30d',
  });
};

// POST /api/auth/login - Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if any admin exists in DB; if none, auto-create the default one!
    let admin = await Admin.findOne({ email });

    if (!admin) {
      const count = await Admin.countDocuments();
      if (count === 0 && email === (process.env.ADMIN_EMAIL || 'admin@cfinteriors.com')) {
        admin = await Admin.create({
          username: 'Lead Administrator',
          email: process.env.ADMIN_EMAIL || 'admin@cfinteriors.com',
          password: process.env.ADMIN_PASSWORD || 'admin123',
        });
      }
    }

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me - Verify current admin
router.get('/me', protect, async (req, res) => {
  try {
    res.json({ success: true, admin: req.admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
