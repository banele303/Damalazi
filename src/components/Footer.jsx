import React, { useState } from 'react';

export default function Footer({ setView, setServiceId }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const handleLinkClick = (viewName, serviceName = null) => {
    setView(viewName);
    if (serviceName) {
      setServiceId(serviceName);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '80px', background: 'var(--color-bg-sec)' }}>
      <div className="container footer-grid">
        
        {/* Brand Information */}
        <div className="footer-brand">
          <button 
            onClick={() => handleLinkClick('landing')}
            style={{ cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: 0, marginBottom: '20px' }}
          >
            <img 
              src="/images/magalela_logo.png" 
              alt="Magalela Logo" 
              style={{ height: '52px', width: 'auto', background: '#fff', borderRadius: '6px', padding: '2px' }} 
            />
            <div style={{ textAlign: 'left' }}>
              <span className="logo-accent" style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff', display: 'block', lineHeight: 1 }}>MAGALELA</span>
              <span style={{ fontSize: '0.58em', display: 'block', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--color-gold-base)', marginTop: '2px' }}>TRADING & PROJECTS</span>
            </div>
          </button>
          
          <p className="footer-desc">
            Design-led construction and outdoor development firm in South Africa. Specializing in custom pools, composite and timber decking, structural pergolas, and NHBRC building projects.
          </p>
          
          <div className="footer-address">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontSize: '0.85rem' }}>Block G, 3rd Floor, Hertford Office Park, Midrand</span>
          </div>
          
          <div className="social-links" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/></svg>
            </a>
          </div>
        </div>
        
        {/* Services Links */}
        <div className="footer-links">
          <h4>Services</h4>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            <li><button onClick={() => handleLinkClick('service-detail', 'swimming-pool')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Pool Construction</button></li>
            <li><button onClick={() => handleLinkClick('service-detail', 'outdoor-development')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Outdoor Development</button></li>
            <li><button onClick={() => handleLinkClick('service-detail', 'pergolas')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Timber Pergolas</button></li>
            <li><button onClick={() => handleLinkClick('service-detail', 'building-construction')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Building Construction</button></li>
            <li><button onClick={() => handleLinkClick('service-detail', 'architectural-design')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Architectural Design</button></li>
            <li><button onClick={() => handleLinkClick('service-detail', 'composite-decking')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Composite Decking</button></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            <li><button onClick={() => handleLinkClick('about')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>About Us</button></li>
            <li><button onClick={() => handleLinkClick('projects')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Our Projects</button></li>
            <li><button onClick={() => handleLinkClick('visualizer')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Quote & Invoice Creator</button></li>
            <li><button onClick={() => handleLinkClick('calculator')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Cost Calculator</button></li>
            <li><button onClick={() => handleLinkClick('contact')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Contact Us</button></li>
            <li><button onClick={() => handleLinkClick('quote')} style={{ background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>Request a Quote</button></li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe for our seasonal project journals and decking advice in South Africa.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              aria-label="Email address" 
            />
            <button type="submit" aria-label="Subscribe">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <div className={`newsletter-success ${isSubscribed ? 'active' : ''}`}>
            Thank you for subscribing to Magalela news!
          </div>
          <div className="footer-contact" style={{ marginTop: '20px' }}>
            <p>📞 <a href="tel:+27875101772" style={{ color: 'var(--color-text-sec)' }}>+27 87 510 1772</a></p>
            <p>✉️ <a href="mailto:info@magalelatrading.co.za" style={{ color: 'var(--color-text-sec)' }}>info@magalelatrading.co.za</a></p>
          </div>
        </div>
      </div>

      <div className="container footer-bottom" style={{ borderTop: '1px solid var(--color-border)', marginTop: '48px', paddingTop: '24px', paddingBottom: '24px' }}>
        <p>© 2026 Magalela Trading & Projects. All rights reserved. NHBRC Registered Builder.</p>
        <div className="bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
