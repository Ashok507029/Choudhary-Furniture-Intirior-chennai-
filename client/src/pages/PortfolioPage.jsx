import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Search, Filter, Eye, MapPin, Layers, Calendar, ExternalLink } from 'lucide-react';
import ProjectLightbox from '../components/ProjectLightbox';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  const categories = [
    'All',
    'Residential',
    'Modular Kitchens',
    'Custom Furniture',
    'Commercial & Retail',
  ];

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let url = '/api/projects';
      if (selectedCategory !== 'All') {
        url += `?category=${encodeURIComponent(selectedCategory)}`;
      }
      const res = await axios.get(url);
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.location?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });

  return (
    <main className="main-content" style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <section style={{
        padding: '7rem 0 3.5rem',
        background: 'linear-gradient(180deg, rgba(12, 11, 10, 0.85) 0%, rgba(12, 11, 10, 1) 100%), url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <span className="section-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} color="#d4af37" /> Real-time Portfolio Database
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', margin: '0.75rem 0 1.25rem' }}>
            Curated Architectural <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Gallery</span>
          </h1>
          <p style={{ color: '#bbb', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Explore our finished turnkey residences, luxury penthouse kitchens, and bespoke contract commissions across South India.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section style={{ padding: '2rem 0', background: '#0e0d0c', borderBottom: '1px solid rgba(212, 175, 55, 0.15)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
          }}>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    background: selectedCategory === cat ? 'linear-gradient(135deg, #d4af37 0%, #aa820a 100%)' : 'rgba(255, 255, 255, 0.04)',
                    color: selectedCategory === cat ? '#0d0c0b' : '#aaa',
                    border: selectedCategory === cat ? '1px solid #d4af37' : '1px solid rgba(255, 255, 255, 0.1)',
                    fontWeight: selectedCategory === cat ? '600' : 'normal',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '30px',
              padding: '6px 14px',
              minWidth: '260px',
            }}>
              <Search size={16} color="#d4af37" style={{ marginRight: '8px' }} />
              <input
                type="text"
                placeholder="Search projects, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.85rem',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#888' }}>
              <Sparkles size={32} color="#d4af37" style={{ animation: 'spin 2s linear infinite', margin: '0 auto 1rem' }} />
              <p>Fetching architectural projects from MongoDB...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '5rem 0',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p style={{ color: '#888', fontSize: '1.1rem' }}>No projects match your selected filter criteria.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="btn-primary"
                style={{ marginTop: '1rem', padding: '0.65rem 1.5rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2.5rem',
            }}>
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => setActiveProject(project)}
                  style={{
                    background: '#151413',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  className="portfolio-card-hover"
                >
                  <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'rgba(12,11,10,0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      color: '#d4af37',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}>
                      {project.category}
                    </div>
                  </div>

                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#fff', marginBottom: '0.4rem' }}>
                        {project.title}
                      </h3>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>
                        <MapPin size={14} color="#d4af37" /> {project.location || 'Chennai, India'}
                      </p>
                      <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.description}
                      </p>
                    </div>

                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#d4af37',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Eye size={15} /> View Gallery &amp; Specs
                      </span>
                      <ExternalLink size={15} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeProject && (
        <ProjectLightbox project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </main>
  );
};

export default PortfolioPage;
