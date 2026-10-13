import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Layers, MessageCircle } from 'lucide-react';

const ProjectLightbox = ({ project, onClose }) => {
  if (!project) return null;

  const images = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : [project.image];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const whatsappMessage = encodeURIComponent(
    `Hello CFI Architects! I am fascinated by your project "${project.title}" (${project.category}). I would like to discuss a similar interior execution for my estate.`
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(5, 5, 5, 0.92)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '2rem',
    }}>
      <div style={{
        background: '#121110',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '16px',
        maxWidth: '1100px',
        width: '100%',
        maxHeight: '90vh',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#d4af37',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
          }}
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>

        {/* Image Preview & Navigation */}
        <div style={{ position: 'relative', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={images[currentIndex]}
            alt={project.title}
            style={{ width: '100%', height: '100%', maxHeight: '550px', objectFit: 'cover' }}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  color: '#fff',
                  borderRadius: '50%',
                  padding: '8px',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  color: '#fff',
                  borderRadius: '50%',
                  padding: '8px',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div style={{ position: 'absolute', bottom: '16px', display: 'flex', gap: '8px' }}>
              {images.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: idx === currentIndex ? '#d4af37' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Project Details Panel */}
        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
              {project.category}
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#f5f5f5', margin: '0.4rem 0 1rem' }}>
              {project.title}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: '#999', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={15} color="#d4af37" /> {project.location || 'Chennai, India'}
              </span>
              {project.area && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Layers size={15} color="#d4af37" /> {project.area}
                </span>
              )}
              {project.duration && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={15} color="#d4af37" /> {project.duration} Execution
                </span>
              )}
            </div>

            <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {project.description}
            </p>

            {project.materials && project.materials.length > 0 && (
              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Architectural Materials &amp; Hardware
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.materials.map((mat, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(212, 175, 55, 0.08)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        color: '#ddd',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                      }}
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <a
              href={`https://wa.me/916375507029?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                background: '#25D366',
                color: '#fff',
                borderColor: '#25D366',
              }}
            >
              <MessageCircle size={18} /> Discuss Design on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLightbox;
