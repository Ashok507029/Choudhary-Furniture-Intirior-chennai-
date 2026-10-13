import React, { useState } from 'react';
import { X, CheckCircle2, Send, Sparkles } from 'lucide-react';
import axios from 'axios';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Full Turnkey Interior Architecture',
    budget: '₹25 Lakhs - ₹50 Lakhs',
    propertyType: '4BHK Luxury Apartment / Villa',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/inquiries', {
        ...formData,
        source: 'VIP Consultation Modal',
      });
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Full Turnkey Interior Architecture',
      budget: '₹25 Lakhs - ₹50 Lakhs',
      propertyType: '4BHK Luxury Apartment / Villa',
      message: '',
    });
    onClose();
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(5, 5, 5, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem',
    }}>
      <div className="modal-content" style={{
        background: 'linear-gradient(145deg, #161514 0%, #0d0c0b 100%)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '16px',
        maxWidth: '560px',
        width: '100%',
        padding: '2.5rem',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(212, 175, 55, 0.15)',
        position: 'relative',
        color: '#f5f5f5',
      }}>
        <button
          onClick={handleReset}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: '#c5a059',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={56} color="#d4af37" style={{ margin: '0 auto 1.25rem' }} />
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#f3e5ab', marginBottom: '0.75rem' }}>
              Consultation Dossier Registered
            </h3>
            <p style={{ color: '#a0a0a0', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>. Our Lead Architectural Principal has received your project specifications and will contact you via phone or WhatsApp at <strong style={{ color: '#d4af37' }}>{formData.phone}</strong>.
            </p>
            <button
              onClick={handleReset}
              className="btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              Close Window
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#d4af37" /> 100% On-Site Interior Architecture
              </span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.85rem', color: '#f3e5ab', marginTop: '0.25rem' }}>
                Book Private Consultation
              </h3>
              <p style={{ color: '#8e8e8e', fontSize: '0.9rem', marginTop: '0.4rem' }}>
                Connect with our principal architects for turnkey luxury execution.
              </p>
            </div>

            {error && (
              <div style={{
                background: 'rgba(255, 77, 77, 0.12)',
                border: '1px solid rgba(255, 77, 77, 0.3)',
                color: '#ff6b6b',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '1rem',
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c5a059', marginBottom: '0.35rem' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Mr. Rajesh Singhania"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c5a059', marginBottom: '0.35rem' }}>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '8px',
                      color: '#fff',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c5a059', marginBottom: '0.35rem' }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="client@luxury.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '8px',
                      color: '#fff',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c5a059', marginBottom: '0.35rem' }}>Service Required</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#1a1918',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '8px',
                      color: '#fff',
                      outline: 'none',
                    }}
                  >
                    <option value="Full Turnkey Interior Architecture">Turnkey Luxury Interiors</option>
                    <option value="Modular Kitchen & Wardrobe Systems">Modular Kitchen & Wardrobes</option>
                    <option value="Bespoke Handcrafted Furniture">Bespoke Custom Furniture</option>
                    <option value="Commercial & Retail Fitouts">Commercial & Retail</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c5a059', marginBottom: '0.35rem' }}>Estimated Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#1a1918',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '8px',
                      color: '#fff',
                      outline: 'none',
                    }}
                  >
                    <option value="₹15 Lakhs - ₹25 Lakhs">₹15L - ₹25L</option>
                    <option value="₹25 Lakhs - ₹50 Lakhs">₹25L - ₹50L</option>
                    <option value="₹50 Lakhs - ₹1 Crore">₹50L - ₹1 Crore</option>
                    <option value="₹1 Crore+">₹1 Crore+ Ultra Luxury</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c5a059', marginBottom: '0.35rem' }}>Project Notes (Optional)</label>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="Tell us about the property, location, or expected timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                    resize: 'none',
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                }}
              >
                {loading ? 'Submitting...' : <>Confirm Private Consultation <Send size={16} /></>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
