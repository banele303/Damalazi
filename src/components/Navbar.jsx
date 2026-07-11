import React, { useState, useEffect } from 'react';

export default function Navbar({ setView, currentView, setServiceId }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (viewName, serviceName = null) => {
    setView(viewName);
    if (serviceName) setServiceId(serviceName);
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        
        {/* Logo */}
        <button className="logo" onClick={() => handleLinkClick('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src="/images/magalela_logo.png" alt="Magalela" style={{ height: '54px', background: '#fff', borderRadius: '6px', padding: '2px' }} />
        </button>
        
        {/* Nav Menu */}
        <nav className={`nav-menu ${isMobileOpen ? 'open' : ''}`}>
          
          {/* Mobile Menu Header */}
          <div className="mobile-menu-header" style={{ display: 'none' }}>
            <img src="/images/magalela_logo.png" alt="Magalela" style={{ height: '44px', background: '#fff', borderRadius: '4px', padding: '2px' }} />
            <button className="mobile-menu-close" onClick={() => setIsMobileOpen(false)} aria-label="Close menu">✕</button>
          </div>

          <button onClick={() => handleLinkClick('landing')} className={`nav-link ${currentView === 'landing' ? 'active' : ''}`}>Home</button>
          <button onClick={() => handleLinkClick('about')} className={`nav-link ${currentView === 'about' ? 'active' : ''}`}>About</button>
          <button onClick={() => handleLinkClick('projects')} className={`nav-link ${currentView === 'projects' ? 'active' : ''}`}>Projects</button>

          {/* Services Dropdown */}
          <div className={`nav-item dropdown ${isServicesOpen ? 'mobile-expanded' : ''}`}>
            <button 
              onClick={(e) => {
                if (window.innerWidth <= 992) {
                  e.preventDefault();
                  setIsServicesOpen(!isServicesOpen);
                }
              }}
              className={`nav-link ${currentView === 'service-detail' ? 'active' : ''}`} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', justifyContent: 'space-between' }}
            >
              <span>Services</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ 
                  transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  marginLeft: 'auto'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <ul className={`dropdown-menu ${isServicesOpen ? 'mobile-show' : ''}`}>
              <li><button onClick={() => handleLinkClick('service-detail', 'swimming-pool')}>Swimming Pools</button></li>
              <li><button onClick={() => handleLinkClick('service-detail', 'outdoor-development')}>Outdoor Development</button></li>
              <li><button onClick={() => handleLinkClick('service-detail', 'pergolas')}>Timber Pergolas</button></li>
              <li><button onClick={() => handleLinkClick('service-detail', 'building-construction')}>Building Construction</button></li>
              <li><button onClick={() => handleLinkClick('service-detail', 'architectural-design')}>Architectural Plans</button></li>
              <li><button onClick={() => handleLinkClick('service-detail', 'composite-decking')}>Composite Decking</button></li>
            </ul>
          </div>

          <button onClick={() => handleLinkClick('visualizer')} className={`nav-link ${currentView === 'visualizer' ? 'active' : ''}`} style={{ color: 'var(--accent-secondary)' }}>Quote & Invoice Creator</button>
          <button onClick={() => handleLinkClick('calculator')} className={`nav-link ${currentView === 'calculator' ? 'active' : ''}`} style={{ color: 'var(--accent-primary)' }}>Cost Estimator</button>
          <button onClick={() => handleLinkClick('contact')} className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}>Contact</button>
          
          <button onClick={() => handleLinkClick('quote')} className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem', width: window.innerWidth <= 992 ? '100%' : 'auto', marginTop: window.innerWidth <= 992 ? '20px' : '0' }}>Get Quote</button>
        </nav>
        
        {/* Mobile Toggle */}
        {!isMobileOpen && (
          <button className="mobile-nav-toggle" onClick={() => setIsMobileOpen(true)}>
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </button>
        )}
      </div>
    </header>
  );
}
