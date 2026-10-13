import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Home, UtensilsCrossed, Armchair, Briefcase, Eye, Layers } from 'lucide-react';

const ServicesPage = ({ onOpenConsultation }) => {
  const servicesList = [
    {
      id: 'turnkey',
      icon: <Home size={32} color="#d4af37" />,
      title: 'Turnkey Interior Architecture',
      subtitle: 'Complete Design, Civil, MEP & Execution',
      desc: 'From bare concrete handover to final turnkey housewarming. We handle false ceilings, architectural mood lighting, Italian marble flooring, electrical engineering, and bespoke cabinetry under one single contract with guaranteed handover dates.',
      highlights: [
        'Dedicated site architect & daily photo logs',
        '3D architectural visualizations & elevations',
        'MEP plumbing & acoustic ceiling engineering',
        'Fixed budget contract with zero hidden escalations'
      ],
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'kitchens',
      icon: <UtensilsCrossed size={32} color="#d4af37" />,
      title: 'German Precision Modular Kitchens',
      subtitle: 'Waterproof Carcasses & Whisper-Quiet Motion',
      desc: 'Engineered for intense Indian culinary traditions. We utilize calibrated boiling waterproof (BWR) marine plywood, anti-scratch acrylics, soft-close Blum/Hettich servo-drives, and stain-resistant quartz or sintered stone countertops.',
      highlights: [
        'Zero-Joint PUR edge sealed against steam & water',
        'Concealed pantry pull-outs & corner magic carousels',
        'Built-in hob, chimney, oven & dishwasher integration',
        '10-Year structural guarantee on internal carcasses'
      ],
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'furniture',
      icon: <Armchair size={32} color="#d4af37" />,
      title: 'Bespoke Handcrafted On-Site Furniture',
      subtitle: 'Solid Teak, Rosewood & Italian Bouclé',
      desc: 'Our ancestral wood masters create heirloom furniture tailored to your residence’s exact proportions. Custom curved sofas, brass-inlay dining tables, floating king bed suites, and acoustic media credenzas built from ethically sourced hardwood.',
      highlights: [
        'Kiln-seasoned Burma teak & Indian rosewood',
        'High-density HR latex foam & stain-treated fabrics',
        'Hand-applied multi-coat matte PU lacquer',
        'Custom PVD gold & brushed brass hardware detailing'
      ],
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wardrobes',
      icon: <Layers size={32} color="#d4af37" />,
      title: 'Haute Wardrobes & Walk-In Dressing Suites',
      subtitle: 'Tinted Fluted Glass & Integrated Sensor Illumination',
      desc: 'Turn dressing into an everyday luxury ritual. Open floor-to-ceiling walk-in wardrobes with slim aluminium profiles, acoustic velvet jewelry drawers, dehumidified timepiece winders, and warm 3000K sensor LED illumination.',
      highlights: [
        'Anodized champagne gold and black aluminium frames',
        'Acoustic velvet pull-out watch & accessory trays',
        'Integrated wardrobe illumination with proximity sensors',
        'Custom floor-to-ceiling floor tracks & pocket sliding doors'
      ],
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'commercial',
      icon: <Briefcase size={32} color="#d4af37" />,
      title: 'Corporate HQ, Boardrooms & Luxury Retail',
      subtitle: 'Ergonomic Prestige & High-Traffic Durability',
      desc: 'Turnkey interior execution for corporate headquarters, tech boardrooms, boutique jewelry showrooms, and high-end cafes. Designed to project executive prestige while ensuring acoustic privacy and commercial longevity.',
      highlights: [
        'Commercial acoustic NRC-rated wall paneling & ceilings',
        'Large-format solid timber boardroom conference tables',
        'PVD stainless steel retail display fixtures',
        'Fast-track delivery for commercial occupancy deadlines'
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <main className="main-content" style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <section style={{
        padding: '7rem 0 4rem',
        background: 'linear-gradient(180deg, rgba(12, 11, 10, 0.8) 0%, rgba(12, 11, 10, 1) 100%), url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} color="#d4af37" /> Architectural Scope
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', margin: '0.75rem 0 1.25rem' }}>
            Bespoke Services &amp; <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Turnkey Scope</span>
          </h1>
          <p style={{ color: '#bbb', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Every commission is an uncompromised blend of architectural design, 100% on-site master joinery, and meticulous white-glove execution.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {servicesList.map((service, index) => (
              <div
                key={service.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '3.5rem',
                  alignItems: 'center',
                  direction: index % 2 === 1 ? 'rtl' : 'ltr',
                }}
              >
                {/* Visual */}
                <div style={{
                  direction: 'ltr',
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(12, 11, 10, 0.75)',
                    backdropFilter: 'blur(8px)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    {service.icon}
                    <span style={{ color: '#d4af37', fontSize: '0.85rem', fontWeight: 600 }}>CFI Signature</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ direction: 'ltr' }}>
                  <span style={{ fontSize: '0.85rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                    {service.subtitle}
                  </span>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#f5f5f5', margin: '0.5rem 0 1.25rem' }}>
                    {service.title}
                  </h2>
                  <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    {service.desc}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {service.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ddd', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={18} color="#d4af37" style={{ flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={onOpenConsultation}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    Discuss This Service <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
