import React from 'react';

const WhatsAppPill = () => {
  return (
    <a
      href="https://wa.me/916375507029?text=Hello%20CFI%20Architects!%20I%20am%20interested%20in%20a%20luxury%20interior%20/%20custom%20furniture%20consultation."
      className="whatsapp-float luxury-wa-pill"
      id="whatsapp-sticky-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct Consultation on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="currentColor">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.494 2.027 7.806L0 32l8.418-2.006A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.795-1.864l-.487-.29-5.002 1.193 1.218-4.872-.32-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667c7.364 0 13.333 5.969 13.333 13.333 0 7.364-5.969 13.333-13.333 13.333zm7.307-9.987c-.4-.2-2.367-1.167-2.733-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.69-.623-3.22-1.987-1.19-1.063-1.993-2.377-2.227-2.777-.233-.4-.025-.617.175-.817.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.817 4.3 6.827 6.033.954.413 1.698.66 2.278.845.957.306 1.828.263 2.517.16.768-.114 2.367-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z" />
      </svg>
      <span className="wa-text">Private Inquiry</span>
      <span className="whatsapp-tooltip">Chat with Lead Architect</span>
    </a>
  );
};

export default WhatsAppPill;
