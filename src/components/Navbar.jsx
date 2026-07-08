import React, { useState, useEffect } from 'react';

export default function Navbar({ setView, currentView }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <button 
          className="logo" 
          onClick={() => { setView('landing'); handleLinkClick(); }}
          style={{ cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left' }}
        >
          <span className="logo-accent">MASA</span>
          <span style={{ fontSize: '0.65em', display: 'block', letterSpacing: '0.15em', fontWeight: 400, opacity: 0.7, lineHeight: 1 }}>MEDICAL AESTHETIC SPA</span>
        </button>
        
        <nav className={`nav-menu ${isMobileOpen ? 'open' : ''}`}>
          {currentView === 'landing' ? (
            <>
              <a href="#about" className="nav-link" onClick={handleLinkClick}>Philosophy</a>
              <a href="#services" className="nav-link" onClick={handleLinkClick}>Treatments</a>
              <a href="#before-after" className="nav-link" onClick={handleLinkClick}>Results</a>
              <a href="#precare" className="nav-link" onClick={handleLinkClick}>Guidelines</a>
              <a href="#blog" className="nav-link" onClick={handleLinkClick}>Journal</a>
              <button 
                onClick={() => { setView('chat'); handleLinkClick(); }} 
                className="nav-link" 
                style={{ 
                  cursor: 'pointer', 
                  background: 'none', 
                  border: 'none', 
                  textTransform: 'uppercase', 
                  fontWeight: 700, 
                  letterSpacing: '0.05em', 
                  color: 'var(--color-laser)' 
                }}
              >
                AI Consult
              </button>
              <a href="#booking" className="btn btn-primary nav-cta" onClick={handleLinkClick}>Book Consultation</a>
            </>
          ) : (
            <>
              <button 
                onClick={() => { setView('landing'); handleLinkClick(); }} 
                className="nav-link" 
                style={{ 
                  cursor: 'pointer', 
                  background: 'none', 
                  border: 'none', 
                  textTransform: 'uppercase', 
                  fontWeight: 600, 
                  letterSpacing: '0.05em' 
                }}
              >
                Main Website
              </button>
              <button 
                className="btn btn-primary nav-cta" 
                onClick={() => { 
                  setView('landing'); 
                  handleLinkClick();
                  setTimeout(() => {
                    const el = document.getElementById('booking');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                style={{ cursor: 'pointer' }}
              >
                Book Consultation
              </button>
            </>
          )}
        </nav>
        
        <button 
          className={`mobile-nav-toggle ${isMobileOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
}
