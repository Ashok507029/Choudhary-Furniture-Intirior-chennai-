import React, { useState } from 'react';
import axios from 'axios';
import { Calculator, CheckCircle2, Send, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';

const CostEstimator = () => {
  const [propertyType, setPropertyType] = useState('3BHK Luxury Residence');
  const [carpetArea, setCarpetArea] = useState(1800);
  const [scope, setScope] = useState('Full Turnkey Architectural Execution');
  const [finishLevel, setFinishLevel] = useState('Ultra-Luxury Italian Bespoke');

  // Contact capture form
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteError, setQuoteError] = useState('');

  // Multipliers
  const propertyMultipliers = {
    '2BHK Apartment': 1.0,
    '3BHK Luxury Residence': 1.15,
    '4BHK / Penthouse': 1.3,
    'Independent Villa / Bungalow': 1.45,
    'Commercial / Retail Boutique': 1.25,
  };

  const scopeBaseRate = {
    'Full Turnkey Architectural Execution': { min: 1800, max: 2600 },
    'Modular Kitchen & Custom Wardrobes': { min: 1100, max: 1700 },
    'Custom Loose Furniture & Woodwork': { min: 800, max: 1400 },
    'Ceilings, Lighting & Paneling': { min: 550, max: 950 },
  };

  const finishMultipliers = {
    'Signature Contemporary': 1.0,
    'Ultra-Luxury Italian Bespoke': 1.35,
    'Royal Heritage Solid Wood & Marquetry': 1.65,
  };

  const currentPropMult = propertyMultipliers[propertyType] || 1.15;
  const currentScope = scopeBaseRate[scope] || scopeBaseRate['Full Turnkey Architectural Execution'];
  const currentFinishMult = finishMultipliers[finishLevel] || 1.35;

  const estimatedMin = Math.round(carpetArea * currentScope.min * currentPropMult * currentFinishMult);
  const estimatedMax = Math.round(carpetArea * currentScope.max * currentPropMult * currentFinishMult);

  const formatINR = (val) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setQuoteError('');

    try {
      const res = await axios.post('/api/quotes', {
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

      if (res.data.success) {
        setQuoteSuccess(true);
      }
    } catch (err) {
      setQuoteError(err.response?.data?.message || 'Error saving quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="cost-calculator-section" id="calculator" style={{ padding: '6rem 0', background: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, rgba(12, 11, 10, 1) 75%)' }}>
      <div className="container">
        <div className="section-header text-center" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={15} color="#d4af37" /> Real-time Architectural Estimator
          </span>
          <h2 className="section-title">Investment Calculator</h2>
          <p className="section-description" style={{ maxWidth: '680px', margin: '0 auto', color: '#9e9e9e' }}>
            Calculate an accurate, itemized turnkey budget projection for your estate based on our 2026 material catalog and on-site master craftsmanship rates.
          </p>
        </div>

        <div className="calculator-card" style={{
          background: 'rgba(20, 19, 18, 0.85)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(12px)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {/* Input Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Property Configuration
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: '#141312',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#fff',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  <option value="2BHK Apartment">2BHK Luxury Apartment</option>
                  <option value="3BHK Luxury Residence">3BHK Luxury Residence</option>
                  <option value="4BHK / Penthouse">4BHK / Penthouse</option>
                  <option value="Independent Villa / Bungalow">Independent Villa / Bungalow</option>
                  <option value="Commercial / Retail Boutique">Commercial / Retail Boutique</option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Carpet Area (Sq. Ft.)
                  </label>
                  <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', fontFamily: 'Playfair Display, serif' }}>
                    {carpetArea.toLocaleString()} sq.ft
                  </span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="8000"
                  step="50"
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#d4af37', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#777', marginTop: '0.25rem' }}>
                  <span>600 sq.ft</span>
                  <span>4,000 sq.ft</span>
                  <span>8,000 sq.ft</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Scope of Work
                </label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: '#141312',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#fff',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  <option value="Full Turnkey Architectural Execution">Full Turnkey (Design + Build + Furnish)</option>
                  <option value="Modular Kitchen & Custom Wardrobes">Modular Kitchen &amp; Custom Wardrobes</option>
                  <option value="Custom Loose Furniture & Woodwork">Bespoke On-Site Loose Furniture</option>
                  <option value="Ceilings, Lighting & Paneling">False Ceilings, Lighting &amp; Wall Finishes</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Finish & Material Standard
                </label>
                <select
                  value={finishLevel}
                  onChange={(e) => setFinishLevel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: '#141312',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#fff',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  <option value="Signature Contemporary">Signature Contemporary (Soft Acrylic, Marine Ply, Hettich)</option>
                  <option value="Ultra-Luxury Italian Bespoke">Ultra-Luxury Bespoke (PU Lacquer, Blum Servo, Italian Marble)</option>
                  <option value="Royal Heritage Solid Wood & Marquetry">Royal Heritage (Solid Teak/Rosewood, Brass Inlays, Marquetry)</option>
                </select>
              </div>
            </div>

            {/* Price Output Display & Action */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 23, 0.7) 0%, rgba(18, 16, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '16px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Projected Turnkey Estimate Range
                </span>
                <div style={{ margin: '1rem 0' }}>
                  <div style={{ fontSize: '2.2rem', color: '#f3e5ab', fontFamily: 'Playfair Display, serif', fontWeight: 700, lineHeight: 1.2 }}>
                    {formatINR(estimatedMin)}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#888', margin: '0.2rem 0' }}>to</div>
                  <div style={{ fontSize: '2.2rem', color: '#d4af37', fontFamily: 'Playfair Display, serif', fontWeight: 700, lineHeight: 1.2 }}>
                    {formatINR(estimatedMax)}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#aaa' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d4af37" /> German precision hardware with 10-Year Warranty
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d4af37" /> 100% Dedicated on-site master artisans &amp; live supervision
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d4af37" /> Guaranteed turnkey handover within agreed schedule
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem' }}>
                {!showLeadForm ? (
                  <button
                    onClick={() => setShowLeadForm(true)}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Lock Estimate &amp; Request Dossier <ArrowRight size={16} />
                  </button>
                ) : quoteSuccess ? (
                  <div style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid #d4af37', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                    <CheckCircle2 size={32} color="#d4af37" style={{ margin: '0 auto 0.5rem' }} />
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>Estimate Dossier Registered!</p>
                    <p style={{ color: '#aaa', fontSize: '0.85rem' }}>Our team will share the itemized BOQ to {clientPhone}.</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {quoteError && <p style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>{quoteError}</p>}
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '6px', color: '#fff' }}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '6px', color: '#fff' }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '6px', color: '#fff' }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {isSubmitting ? 'Submitting to Database...' : 'Save Estimate to Lead Desk'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
