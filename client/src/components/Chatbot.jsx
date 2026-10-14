import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send, Sparkles, User, Bot, Phone } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! Welcome to Aashapura Interior & Furniture. I am your Architectural Concierge. How may I assist your space design today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [contactLead, setContactLead] = useState({ name: '', phone: '' });
  const [leadSaved, setLeadSaved] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickActions = [
    { label: 'Turnkey Pricing', text: 'What is your turnkey interior cost range?' },
    { label: 'Site Assessment', text: 'How do you conduct on-site architectural assessments?' },
  ];

  const handleSend = (textToSend) => {
    const messageText = textToSend || input.trim();
    if (!messageText) return;

    const userMsg = { id: Date.now(), sender: 'user', text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent responses
    setTimeout(() => {
      let botReply = '';
      const lower = messageText.toLowerCase();

      if (lower.includes('cost') || lower.includes('pric') || lower.includes('budget') || lower.includes('turnkey')) {
        botReply = 'Our turnkey luxury execution typically starts from ₹1,800 to ₹2,800 per sq. ft., depending on the selected marble, PU lacquer finishes, and Blum hardware. Would you like a detailed quotation?';
      } else if (lower.includes('kitchen') || lower.includes('wardrobe') || lower.includes('material')) {
        botReply = 'We craft using certified Century/Greenply marine-grade BWR plywood, German Blum/Hettich soft-close systems, anti-fingerprint acrylics, and PU lacquer with 10-year warranty.';
      } else if (lower.includes('visit') || lower.includes('consult') || lower.includes('meet') || lower.includes('schedule') || lower.includes('assess')) {
        botReply = 'Our Lead Architect personally conducts on-site architectural assessments at your residence in Chennai and South India. Leave your phone number below and we will coordinate a site visit.';
      } else if (lower.includes('showroom') || lower.includes('atelier') || lower.includes('location') || lower.includes('where') || lower.includes('map')) {
        botReply = 'All bespoke craftsmanship is executed 100% on-site directly at your property. Our Lead Architect visits your site across Chennai & Tamil Nadu for blueprint evaluation and laser measurements.';
      } else {
        botReply = 'Thank you for reaching out! You can connect with our Lead Architect directly on WhatsApp (+91 6375507029) or leave your contact details below.';
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply }]);
    }, 600);
  };

  const handleSaveLead = async (e) => {
    e.preventDefault();
    if (!contactLead.phone) return;

    try {
      await axios.post('/api/inquiries', {
        name: contactLead.name || 'Chatbot Client',
        phone: contactLead.phone,
        email: 'chatbot-lead@cfinteriors.com',
        service: 'Chatbot Consultation Request',
        message: 'Lead captured through interactive AI Concierge',
        source: 'AI Concierge Chatbot',
      });
      setLeadSaved(true);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `Thank you! We have registered ${contactLead.phone} in our Lead Desk. Our principal architect will reach out shortly.`,
        },
      ]);
    } catch (error) {
      console.error('Lead error:', error);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9998 }}>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #d4af37 0%, #aa820a 100%)',
            color: '#0d0c0b',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            boxShadow: '0 8px 30px rgba(212, 175, 55, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'transform 0.3s ease',
          }}
          aria-label="Open AI Concierge Chatbot"
        >
          <Sparkles size={18} />
          <span>Aashapura Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '360px',
          height: '520px',
          background: 'linear-gradient(180deg, #181715 0%, #0d0c0b 100%)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(212, 175, 55, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: 'rgba(212, 175, 55, 0.1)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#d4af37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
              }}>
                <Sparkles size={16} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#f5f5f5', fontFamily: 'Playfair Display, serif' }}>Aashapura Concierge</h4>
                <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>● Online | Direct Lead Desk</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: '4px' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? '#d4af37' : 'rgba(255,255,255,0.06)',
                  color: m.sender === 'user' ? '#000' : '#e0e0e0',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'user' ? '14px 14px 0 14px' : '14px 14px 14px 0',
                  fontSize: '0.85rem',
                  lineHeight: '1.45',
                  border: m.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div style={{
            padding: '8px 12px',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            {quickActions.map((qa, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qa.text)}
                style={{
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  color: '#d4af37',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* Quick Phone Lead Capture (if not yet saved) */}
          {!leadSaved && (
            <form onSubmit={handleSaveLead} style={{
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              <input
                type="tel"
                placeholder="Leave phone for quick callback..."
                value={contactLead.phone}
                onChange={(e) => setContactLead({ ...contactLead, phone: e.target.value })}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  color: '#fff',
                  fontSize: '0.78rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#d4af37',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  color: '#000',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Request Call
              </button>
            </form>
          )}

          {/* Input Footer */}
          <div style={{
            padding: '10px 12px',
            background: '#121110',
            borderTop: '1px solid rgba(212, 175, 55, 0.15)',
            display: 'flex',
            gap: '8px',
          }}>
            <input
              type="text"
              placeholder="Ask about design, materials, pricing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                background: '#d4af37',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
