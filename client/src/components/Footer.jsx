import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="luxury-editorial-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="logo" id="footer-logo">
              <img src="/images/logo.png" alt="Aashapura Interior & Furniture Crest" className="footer-logo-img" />
              <div className="logo-text-group">
                <span className="logo-main"><span className="logo-accent">A</span>ashapura</span>
                <span className="logo-subtext">Interior &amp; Furniture • Est. 2001</span>
              </div>
            </Link>
            <p className="footer-desc">
              Contract-based turnkey interior design and 100% on-site handcrafted bespoke furniture. Transforming residential
              estates, luxury villas, and corporate environments with German precision fittings and master craftsmanship.
            </p>
            <div className="social-links" id="footer-socials" style={{ marginTop: '16px' }}>
              <a href="https://wa.me/919840555538?text=Hello%20Aashapura%20Interior%20%26%20Furniture,%20I%20would%20like%20to%20consult%20for%20my%20interior%20project" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp" title="WhatsApp Direct">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook" title="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Pages */}
          <div className="footer-col" id="footer-links-quick">
            <h4>Pages</h4>
            <ul>
              <li><Link to="/">Home Sanctuary</Link></li>
              <li><Link to="/about">Legacy &amp; Craft</Link></li>
              <li><Link to="/services">Services &amp; Craft</Link></li>
              <li><Link to="/portfolio">Portfolio Gallery</Link></li>
              <li><Link to="/contact">Private Inquiry</Link></li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="footer-col" id="footer-links-services">
            <h4>Specialties</h4>
            <ul>
              <li><Link to="/services">Villa &amp; Duplex Interiors</Link></li>
              <li><Link to="/services">German Modular Kitchens</Link></li>
              <li><Link to="/services">Handcrafted Hardwood Furniture</Link></li>
              <li><Link to="/services">Walk-in Wardrobe Systems</Link></li>
              <li><Link to="/services">Executive Boardroom Fitouts</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col" id="footer-links-contact">
            <h4>Direct Contact</h4>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={15} color="#d4af37" /> +91 9840555538
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={15} color="#d4af37" /> +91 6375507029
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={15} color="#d4af37" /> dularamjat5538@gmail.com
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={15} color="#d4af37" /> Amman Coil St, Sowcarpet, Chennai
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Aashapura Interior &amp; Furniture. All rights reserved. Bespoke Architectural Atelier.</p>
          <div className="footer-legal">
            <span style={{ color: '#666', fontSize: '0.8rem' }}>On-Site Master Craftsmanship &bull; Chennai &bull; Rajasthan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
