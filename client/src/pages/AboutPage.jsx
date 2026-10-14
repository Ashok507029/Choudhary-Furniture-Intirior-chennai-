import React from 'react';
import { Sparkles, Award, ShieldCheck, Hammer, Compass, CheckCircle2, ArrowRight, Ruler, Eye, HardHat } from 'lucide-react';

const AboutPage = ({ onOpenConsultation }) => {
  return (
    <main className="main-content" style={{ paddingBottom: '6rem' }}>
      {/* Page Header */}
      <section style={{
        padding: '7rem 0 4rem',
        background: 'linear-gradient(180deg, rgba(12, 11, 10, 0.8) 0%, rgba(12, 11, 10, 1) 100%), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} color="#d4af37" /> Est. 2001 • Master Craft Heritage
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', margin: '0.75rem 0 1.25rem' }}>
            Rooted in Tradition.<br />
            <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Crafted 100% On Site.</span>
          </h1>
          <p style={{ color: '#bbb', fontSize: '1.1rem', lineHeight: 1.7 }}>
            For over two decades, Aashapura Interior &amp; Furniture has delivered bespoke residential interiors, architectural woodwork, and luxury turnkey contracting executed directly on location with hereditary master karigars.
          </p>
        </div>
      </section>

      {/* Story & Legacy Section */}
      <section style={{ padding: '5rem 0', background: '#0e0d0c' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">The Founders' Vision</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#f5f5f5', margin: '0.5rem 0 1.5rem' }}>
                Where Rajasthani Artistry Meets Architectural Precision
              </h2>
              <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Originating from a lineage of heritage wood artisans and established in Sowcarpet, Chennai, Aashapura was founded on an unyielding principle: true architectural luxury cannot be mass-produced in remote factories. Every luxury home has its own unique geometry, wall undulations, lighting angles, and spirit.
              </p>
              <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '2rem' }}>
                That is why our entire execution model is <strong>100% On-Site Turnkey Craftsmanship</strong>. Our dedicated teams of master karigars, architects, and joinery supervisors camp on location. Every wardrobe, kitchen carcass, fluted wall panel, and bespoke furniture piece is measured, tailored, and fitted directly against the physical surfaces of your estate.
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#d4af37', margin: 0 }}>450+</h4>
                  <p style={{ color: '#777', fontSize: '0.85rem' }}>Estates Handed Over</p>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#d4af37', margin: 0 }}>100%</h4>
                  <p style={{ color: '#777', fontSize: '0.85rem' }}>On-Site Custom Fitting</p>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#d4af37', margin: 0 }}>25+</h4>
                  <p style={{ color: '#777', fontSize: '0.85rem' }}>Years Heritage</p>
                </div>
              </div>
            </div>

            <div>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                  alt="On-Site Joinery and Supervision"
                  style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                }}>
                  <p style={{ color: '#d4af37', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>Aashapura On-Site Turnkey Execution, Chennai</p>
                  <p style={{ color: '#ccc', fontSize: '0.8rem', margin: '4px 0 0' }}>Bespoke tailoring, framing, and architectural fitting directly on location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Power of 100% On-Site Execution */}
      <section style={{ padding: '6rem 0', background: '#121110' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-subtitle">The Aashapura Method</span>
            <h2 className="section-title">Why 100% On-Site Craftsmanship Wins</h2>
            <p style={{ color: '#888', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Ready-made catalog boxes often leave awkward gaps and fillers. Our on-site artisans craft every piece flush to the wall with zero compromise.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '2rem', borderRadius: '12px' }}>
              <Ruler size={32} color="#d4af37" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                Zero-Gap Tailored Fit
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Every wardrobe and cabinet is scribed and joined directly along your site’s real plaster lines, ceiling beams, and columns for a completely seamless architectural fit.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '2rem', borderRadius: '12px' }}>
              <Eye size={32} color="#d4af37" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                Daily Architectural Supervision
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Our Lead Project Architect visits your site daily, inspecting material cuts, MEP wiring alignment, hardware tolerances, and finish consistency with zero communication gap.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '2rem', borderRadius: '12px' }}>
              <Hammer size={32} color="#d4af37" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                Generational Heritage Karigars
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Our woodwork is executed by hereditary artisans trained in Rajasthan’s finest joinery traditions, capable of intricate solid wood inlays, fluting, and fine lacquer finishes.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '2rem', borderRadius: '12px' }}>
              <ShieldCheck size={32} color="#d4af37" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                10-Year Structural Guarantee
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Built tough on site using calibrated BWR marine-grade plywood and premium German hardware from Blum &amp; Hettich, backstopped by our comprehensive 10-year warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Standards */}
      <section style={{ padding: '5rem 0', background: '#0e0d0c' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-subtitle">Provenance &amp; Quality</span>
            <h2 className="section-title">The Materials We Swear By</h2>
            <p style={{ color: '#888', marginBottom: '2.5rem' }}>
              We refuse to cut corners. Every fastener, sheet, and veneer that enters a Aashapura residence is verified for durability and environmental compliance.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid #d4af37' }}>
                <h4 style={{ color: '#fff', margin: '0 0 6px' }}>Century / Greenply</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>Calibrated Marine Grade BWR Plywood</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid #d4af37' }}>
                <h4 style={{ color: '#fff', margin: '0 0 6px' }}>Blum (Austria)</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>Servo-Drive &amp; Legrabox Motion Systems</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid #d4af37' }}>
                <h4 style={{ color: '#fff', margin: '0 0 6px' }}>Italian Marbles</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>Bookmatched Statuario &amp; Botticino</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid #d4af37' }}>
                <h4 style={{ color: '#fff', margin: '0 0 6px' }}>PVD Stainless Steel</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>Titanium Gold &amp; Rose Champagne Finishes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', marginBottom: '1rem' }}>
            Experience Our Craftsmanship in Person
          </h2>
          <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Invite our Lead Architect to your property for an on-site feasibility inspection and personal blueprint consultation.
          </p>
          <button onClick={onOpenConsultation} className="btn-primary" style={{ padding: '0.9rem 2.2rem' }}>
            Schedule Site Consultation
          </button>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
