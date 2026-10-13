import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Hammer,
  Compass,
  Award,
  ChevronDown,
  Quote,
  CheckCircle,
  Eye,
  Sliders,
} from 'lucide-react';
import CostEstimator from '../components/CostEstimator';
import ProjectLightbox from '../components/ProjectLightbox';

const HomePage = ({ onOpenConsultation }) => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeFaq, setActiveFaq] = useState(null);

  // Fetch featured projects from Express/MongoDB API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects?featured=true');
        if (res.data.success && res.data.data.length > 0) {
          setFeaturedProjects(res.data.data);
        } else {
          // Fetch any projects
          const allRes = await axios.get('/api/projects');
          setFeaturedProjects(allRes.data.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const faqs = [
    {
      q: 'How is interior woodwork and fabrication executed on-site?',
      a: '100% of our custom furniture, cabinetry, wall paneling, and interior woodwork is handcrafted directly on-site by our hereditary Rajasthani master artisans under daily architectural supervision. We do not outsource to random third parties.',
    },
    {
      q: 'What is the typical completion timeframe for a turnkey 3BHK/Villa?',
      a: 'A standard luxury residence turnkey execution is completed within 45 to 60 working days from architectural layout sign-off, thanks to organized parallel on-site craft teams.',
    },
    {
      q: 'How does your material and workmanship warranty work?',
      a: 'We provide a comprehensive 10-Year structural warranty on all Marine-Grade BWR carcass woodwork and lifetime manufacturer guarantees on German Blum and Hettich fittings.',
    },
    {
      q: 'Can we visit your running site projects and materials workshop?',
      a: 'Yes! We encourage clients to inspect our live construction sites across Boat Club, Poes Garden, and OMR, as well as our Sowcarpet workshop before contract finalization.',
    },
  ];

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero-section" style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(12, 11, 10, 0.7) 0%, rgba(12, 11, 10, 0.95) 100%), url("/images/hero-interior.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '7rem 0 5rem',
      }}>
        <div className="container">
          <div style={{ maxWidth: '850px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.3)', marginBottom: '1.5rem' }}>
              <Sparkles size={15} color="#d4af37" />
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f3e5ab' }}>
                100% On-Site Master Joinery &amp; Turnkey Interiors
              </span>
            </div>

            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', lineHeight: 1.15, color: '#f5f5f5', marginBottom: '1.5rem', fontWeight: 600 }}>
              Turnkey Luxury Residences &amp; <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Bespoke Furniture</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#c0c0c0', lineHeight: 1.7, maxWidth: '680px', marginBottom: '2.5rem' }}>
              Delivering architectural turnkey interior design and custom handcrafted furniture for discerning residences, corporate headquarters, and luxury retail with German precision and 25+ years of master craftsmanship.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
              <button
                onClick={onOpenConsultation}
                className="btn-primary"
                style={{ padding: '0.95rem 2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                Book Private Consultation <ArrowRight size={18} />
              </button>
              <Link
                to="/portfolio"
                className="btn-secondary"
                style={{
                  padding: '0.95rem 2rem',
                  fontSize: '1rem',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                Explore Portfolio
              </Link>
            </div>

            {/* Metrics Ribbon */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginTop: '4.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            }}>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#d4af37', margin: 0 }}>25+</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                  Years Master Joinery Heritage
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#d4af37', margin: 0 }}>450+</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                  Estates &amp; Suites Delivered
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#d4af37', margin: 0 }}>100%</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                  On-Site Master Craftsmanship
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#d4af37', margin: 0 }}>10 Yrs</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                  Comprehensive Warranty
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Transformation Slider */}
      <section style={{ padding: '6rem 0', background: '#0e0d0c' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={14} color="#d4af37" /> Architectural Transformation
            </span>
            <h2 className="section-title">Raw Concrete to Haute Living</h2>
            <p style={{ color: '#888', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Drag the interactive slider to reveal how our turnkey engineering transforms bare structure into Italian luxury.
            </p>
          </div>

          <div style={{
            position: 'relative',
            maxWidth: '900px',
            height: '480px',
            margin: '0 auto',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            userSelect: 'none',
          }}>
            {/* After Image (Full Background) */}
            <img
              src="/images/room-after.jpg"
              alt="Luxury Finished Interior"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            />
            <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.7)', border: '1px solid #d4af37', color: '#d4af37', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
              CFI Completed Interior
            </span>

            {/* Before Image (Clipped) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPosition}%`,
              height: '100%',
              overflow: 'hidden',
            }}>
              <img
                src="/images/room-before.jpg"
                alt="Raw Site Before"
                style={{ width: '900px', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                Raw Site Handover
              </span>
            </div>

            {/* Slider Divider Line */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: '3px',
              background: '#d4af37',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
              pointerEvents: 'none',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '36px',
                height: '36px',
                background: '#d4af37',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '12px',
                boxShadow: '0 0 15px rgba(0,0,0,0.8)',
              }}>
                ◀ ▶
              </div>
            </div>

            {/* Invisible Range Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'ew-resize',
                zIndex: 20,
              }}
              aria-label="Drag to compare before and after"
            />
          </div>
        </div>
      </section>

      {/* Core Atelier Pillars */}
      <section style={{ padding: '6rem 0', background: '#121110' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Award size={14} color="#d4af37" /> Architectural Excellence
            </span>
            <h2 className="section-title">The CFI On-Site Advantage</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div className="feature-card" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '12px',
              padding: '2.25rem',
              transition: 'transform 0.3s ease',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Hammer size={24} color="#d4af37" />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem' }}>
                Dedicated On-Site Master Joiners
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Every wardrobe, credenza, and bespoke architectural element is handcrafted directly on location by our generational karigars, ensuring millimeter-perfect alignment with your site's physical contours.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '12px',
              padding: '2.25rem',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Compass size={24} color="#d4af37" />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem' }}>
                Architectural 3D &amp; BOQ
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Experience photo-realistic 3D walkthroughs, lighting simulations, and crystal-clear itemized bills of quantity before execution starts.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '12px',
              padding: '2.25rem',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={24} color="#d4af37" />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem' }}>
                10-Year Ironclad Warranty
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                We stand firmly behind our carpentry with guaranteed 10-year termite-proof structural warranties and lifetime hinge replacements.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '12px',
              padding: '2.25rem',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={24} color="#d4af37" />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem' }}>
                German Hardware Only
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Partnered exclusively with Blum (Austria), Hettich (Germany), and Hafele to deliver effortless whisper-quiet motion for decades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects from MongoDB */}
      <section style={{ padding: '6rem 0', background: '#0e0d0c' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={14} color="#d4af37" /> Dynamic Portfolio
              </span>
              <h2 className="section-title">Signature Executions</h2>
            </div>
            <Link to="/portfolio" style={{ color: '#d4af37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              View All Works <ArrowRight size={16} />
            </Link>
          </div>

          {loadingProjects ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
              Loading portfolio from database...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {featuredProjects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => setSelectedProject(project)}
                  style={{
                    background: '#151413',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                  className="portfolio-hover-card"
                >
                  <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: '20px', color: '#d4af37', fontSize: '0.75rem', fontWeight: 600 }}>
                      {project.category}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '0.4rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {project.location}
                    </p>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {project.description}
                    </p>
                    <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px', color: '#d4af37', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Eye size={15} /> Inspect Architectural Details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Embedded Live Cost Estimator */}
      <CostEstimator />

      {/* Client Testimonials */}
      <section style={{ padding: '6rem 0', background: '#121110' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-subtitle">Patron Testimonials</span>
            <h2 className="section-title">Words from Our Esteemed Clients</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', padding: '2rem' }}>
              <Quote size={28} color="#d4af37" style={{ marginBottom: '1rem', opacity: 0.6 }} />
              <p style={{ color: '#ccc', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                "CFI turned our 5,200 sq.ft villa in Boat Club into a masterpiece. Their dedicated on-site bespoke woodwork and Italian marble craftsmanship are second to none in South India."
              </p>
              <div>
                <h4 style={{ color: '#f3e5ab', margin: 0 }}>Dr. V. Sundaram</h4>
                <span style={{ color: '#777', fontSize: '0.8rem' }}>Villa Residence, Boat Club Road</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', padding: '2rem' }}>
              <Quote size={28} color="#d4af37" style={{ marginBottom: '1rem', opacity: 0.6 }} />
              <p style={{ color: '#ccc', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                "The precision of their German modular kitchen was jaw-dropping. Delivered in exactly 42 days without a single hinge adjustment needed. Absolute professionals."
              </p>
              <div>
                <h4 style={{ color: '#f3e5ab', margin: 0 }}>Ananya &amp; Rohan Singhania</h4>
                <span style={{ color: '#777', fontSize: '0.8rem' }}>Penthouse, Poes Garden</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', padding: '2rem' }}>
              <Quote size={28} color="#d4af37" style={{ marginBottom: '1rem', opacity: 0.6 }} />
              <p style={{ color: '#ccc', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                "We commissioned CFI for our 12,000 sq.ft tech headquarters boardroom and executive suites. The custom acoustic panels and 24-seater oak table are magnificent."
              </p>
              <div>
                <h4 style={{ color: '#f3e5ab', margin: 0 }}>Karthik Narayanan</h4>
                <span style={{ color: '#777', fontSize: '0.8rem' }}>Managing Director, Synergy Tech</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ padding: '6rem 0', background: '#0e0d0c' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle">Clarifications</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.1rem',
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    color="#d4af37"
                    style={{
                      transform: activeFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {activeFaq === i && (
                  <div style={{ padding: '0 1.5rem 1.25rem', color: '#aaa', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(12,11,10,0.95) 100%)',
        borderTop: '1px solid rgba(212,175,55,0.3)',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <span className="section-subtitle">Commence Your Journey</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#f5f5f5', margin: '0.5rem 0 1rem' }}>
            Ready to Commission Your Estate?
          </h2>
          <p style={{ color: '#bbb', lineHeight: 1.7, marginBottom: '2rem' }}>
            Book a private one-on-one session with our Principal Architect to review floor plans, material libraries, and turnkey timelines.
          </p>
          <button
            onClick={onOpenConsultation}
            className="btn-primary"
            style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
          >
            Schedule VIP Consultation
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <ProjectLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </main>
  );
};

export default HomePage;
