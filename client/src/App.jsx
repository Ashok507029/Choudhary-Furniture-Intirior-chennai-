import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import WhatsAppPill from './components/WhatsAppPill';
import ConsultationModal from './components/ConsultationModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const navigate = useNavigate();

  // Secret Admin Access via Ctrl + Shift + A or Alt + A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
          (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="app-container">
      {/* Ambient Luxury Glow Orbs */}
      <div className="luxury-glow-orb glow-orb-1"></div>
      <div className="luxury-glow-orb glow-orb-2"></div>

      {/* Navigation Header */}
      <Navbar onOpenConsultation={() => setConsultationModalOpen(true)} />

      {/* Route Views */}
      <Routes>
        <Route path="/" element={<HomePage onOpenConsultation={() => setConsultationModalOpen(true)} />} />
        <Route path="/about" element={<AboutPage onOpenConsultation={() => setConsultationModalOpen(true)} />} />
        <Route path="/services" element={<ServicesPage onOpenConsultation={() => setConsultationModalOpen(true)} />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Interactive AI Concierge Chatbot */}
      <Chatbot />

      {/* Floating WhatsApp Contact Pill */}
      <WhatsAppPill />

      {/* VIP Consultation Booking Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </div>
  );
}

export default App;
