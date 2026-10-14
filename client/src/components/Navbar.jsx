import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, Sparkles, ShieldCheck } from 'lucide-react';

const Navbar = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`luxury-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="Aashapura Interior & Furniture Home">
          <div className="brand-mark-wrapper">
            <img src="/images/logo.png" alt="Aashapura Crest" className="brand-logo-img" />
            <div className="brand-glow"></div>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">AASHAPURA</span>
            <span className="brand-subtitle">INTERIOR &amp; FURNITURE</span>
            <span className="brand-tagline">EST. 2001 • 100% ON-SITE JOINERY</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About Us
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Services
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Portfolio
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          <button
            onClick={onOpenConsultation}
            className="btn-primary header-cta"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={14} /> Private Consultation
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} color="#d4af37" /> : <Menu size={24} color="#d4af37" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          width: '100vw',
          background: 'rgba(12, 11, 10, 0.98)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          backdropFilter: 'blur(16px)',
          zIndex: 1000,
        }}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link to="/services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Architectural Services</Link>
          <Link to="/portfolio" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Project Portfolio</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact Concierge</Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="btn-primary"
            style={{ marginTop: '0.75rem', width: '100%', justifyContent: 'center' }}
          >
            <Sparkles size={16} /> Book Private Consultation
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
