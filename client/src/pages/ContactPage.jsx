import React, { useState } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, Sparkles, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Full Turnkey Interior Execution',
    budget: '₹25L - ₹50L',
    propertyType: 'Luxury Villa / Apartment',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
        source: 'Contact Page Inquiry Form',
      });
      if (res.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content" style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <section style={{
        padding: '7rem 0 3.5rem',
        background: 'linear-gradient(180deg, rgba(12, 11, 10, 0.85) 0%, rgba(12, 11, 10, 1) 100%), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} color="#d4af37" /> Direct On-Site Consultation
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', margin: '0.75rem 0 1.25rem' }}>
            Initiate a Private <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Consultation</span>
          </h1>
          <p style={{ color: '#bbb', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Connect directly with our Lead Architectural Principal for on-site layout evaluation, blueprint assessments, and timeline schedules.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
          }}>
            {/* Contact Information & Direct Coordinates */}
            <div>
              <span className="section-subtitle">Direct Access</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#f5f5f5', margin: '0.5rem 0 1.5rem' }}>
                Direct Coordinates
              </h2>
              <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Whether you are commencing architectural blueprints for a new duplex villa, an executive office suite, or seeking 100% on-site custom joinery, we are at your service.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} color="#d4af37" />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', margin: '0 0 4px', fontSize: '1rem' }}>On-Site Coverage &amp; Service Regions</h4>
                    <p style={{ color: '#888', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                      Chennai (Boat Club, Poes Garden, ECR, OMR, Anna Nagar) &amp; Key South Indian Estates
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} color="#d4af37" />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', margin: '0 0 4px', fontSize: '1rem' }}>Direct Architecture Hotline</h4>
                    <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>+91 98405 55538 / +91 63755 07029</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} color="#d4af37" />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', margin: '0 0 4px', fontSize: '1rem' }}>Official Dossier Email</h4>
                    <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>dularamjat5538@gmail.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} color="#d4af37" />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', margin: '0 0 4px', fontSize: '1rem' }}>On-Site Architectural Assessment</h4>
                    <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>Mon – Sat: 10:00 AM – 8:30 PM (Direct Site Visits by Prior Appointment)</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div style={{
                marginTop: '3rem',
                padding: '1.75rem',
                background: 'rgba(37, 211, 102, 0.08)',
                border: '1px solid rgba(37, 211, 102, 0.25)',
                borderRadius: '12px',
              }}>
                <h4 style={{ color: '#25D366', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} /> Need an Instant Feasibility Check?
                </h4>
                <p style={{ color: '#ccc', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 1rem' }}>
                  Send floor plans or photos directly to our Principal Architect on WhatsApp for immediate feedback.
                </p>
                <a
                  href="https://wa.me/916375507029?text=Hello%20Aashapura%20Architects!%20I%20have%20an%20interior%20enquiry%20regarding%20my%20property."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#25D366',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  Chat with Principal on WhatsApp →
                </a>
              </div>
            </div>

            {/* Live Database Inquiry Form */}
            <div style={{
              background: '#151413',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <CheckCircle2 size={60} color="#d4af37" style={{ margin: '0 auto 1.5rem' }} />
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#f3e5ab', marginBottom: '0.75rem' }}>
                    Consultation Dossier Dispatched
                  </h3>
                  <p style={{ color: '#aaa', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Your project inquiry has been securely stored in our Database. Our Lead Architect will review the parameters and reach out within 1 business day.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'Full Turnkey Interior Execution',
                        budget: '₹25L - ₹50L',
                        propertyType: 'Luxury Villa / Apartment',
                        message: '',
                      });
                    }}
                    className="btn-primary"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
                    Commission a Consultation
                  </h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                    All requests are reviewed directly by senior partners.
                  </p>

                  {error && (
                    <div style={{ background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff6b6b', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Vikramaditya Rathore"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(212, 175, 55, 0.25)',
                          borderRadius: '8px',
                          color: '#fff',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="client@luxuryestate.com"
                          value={formData.email}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                          Primary Service
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            background: '#1a1918',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none',
                          }}
                        >
                          <option value="Full Turnkey Interior Execution">Full Turnkey Interior</option>
                          <option value="Modular Kitchens & Wardrobes">Modular Kitchens &amp; Wardrobes</option>
                          <option value="Custom Handcrafted Furniture">Bespoke Loose Furniture</option>
                          <option value="Commercial & Retail Fitouts">Commercial / Corporate Fitout</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                          Budget Scope
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            background: '#1a1918',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none',
                          }}
                        >
                          <option value="₹15L - ₹25L">₹15 Lakhs - ₹25 Lakhs</option>
                          <option value="₹25L - ₹50L">₹25 Lakhs - ₹50 Lakhs</option>
                          <option value="₹50L - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                          <option value="₹1 Crore+">₹1 Crore+ (Ultra Luxury)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                        Project Location &amp; Scope Details
                      </label>
                      <textarea
                        name="message"
                        rows="3"
                        placeholder="Tell us about the property type, square footage, possession status, and aesthetic goals..."
                        value={formData.message}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(212, 175, 55, 0.25)',
                          borderRadius: '8px',
                          color: '#fff',
                          outline: 'none',
                          resize: 'vertical',
                        }}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '1rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      {loading ? 'Registering with Lead Desk...' : <>Submit Architectural Inquiry <Send size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
