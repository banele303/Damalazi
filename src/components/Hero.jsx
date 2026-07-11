import React, { useState, useEffect } from 'react';

const HERO_TABS = [
  {
    id: 'decking',
    label: 'Composite Decking',
    headline: 'Maintenance-Free Luxury Composite Decking',
    image: '/images/project_pool_deck.png',
    price: 'From R1,650 / m²',
    specs: '25-Year Warranty · UV Resistant · Barefoot Safe'
  },
  {
    id: 'pools',
    label: 'Swimming Pools',
    headline: 'Custom Engineered Marbelite & Fibreglass Pools',
    image: '/images/timber_decking.png',
    price: 'From R85,000 Complete',
    specs: 'SANS Compliant · Concrete Shells · Full Filtration'
  },
  {
    id: 'pergolas',
    label: 'Timber Pergolas',
    headline: 'Architectural Timber Pergolas & Shading',
    image: '/images/project_patio_gazebo.png',
    price: 'From R12,000 Installed',
    specs: 'Garapa & Balau Hardwoods · UV Oiled · Solid Anchoring'
  },
  {
    id: 'building',
    label: 'Structural Building',
    headline: 'NHBRC Registered General Construction',
    image: '/images/project_modern_house.png',
    price: 'On Design Specification',
    specs: 'Extensions · Boundary Walls · Turnkey Renovations'
  }
];

export default function Hero({ setView }) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [promptInput, setPromptInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const currentTab = HERO_TABS[activeTabIdx];

  // Auto rotate tabs every 8 seconds, unless user clicks
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % HERO_TABS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    // Save to localStorage so Visualizer.jsx can pick it up on mount
    localStorage.setItem('magalela_hero_prompt', promptInput);
    setView('visualizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '160px 0 80px' }}>
      
      {/* Immersive Background Images (Crossfading) */}
      {HERO_TABS.map((tab, idx) => (
        <div
          key={tab.id}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${tab.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: idx === activeTabIdx ? 0.82 : 0,
            filter: 'brightness(1.05)',
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1
          }}
        />
      ))}

      {/* Dark Radial Vignette for Typography Readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(5, 5, 5, 0.1) 0%, rgba(5, 5, 5, 0.65) 75%, rgba(5, 5, 5, 0.85) 100%), linear-gradient(to bottom, rgba(5, 5, 5, 0.25) 0%, rgba(5, 5, 5, 0.8) 100%)',
        zIndex: 2
      }}></div>

      {/* Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Interactive Navigation Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '30px'
          }}>
            {HERO_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`hero-tab-btn ${idx === activeTabIdx ? 'active' : ''}`}
              >
                {tab.label}
                {idx === activeTabIdx && <span key={idx} className="hero-tab-progress" />}
              </button>
            ))}
          </div>

          {/* Dynamic Headline */}
          <span 
            key={`specs-${activeTabIdx}`} 
            className="badge hero-badge-animate" 
            style={{ marginBottom: '20px', color: 'var(--accent-secondary)' }}
          >
            {currentTab.specs}
          </span>
          
          <h1 
            key={`title-${activeTabIdx}`}
            className="hero-title hero-headline-animate" 
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              margin: '0 auto 20px',
              background: 'linear-gradient(to bottom, #ffffff 60%, #a0a0a0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.85))'
            }}
          >
            {currentTab.headline}
          </h1>

          {/* Quick Price Badge */}
          <div 
            key={`price-${activeTabIdx}`}
            className="hero-price-badge hero-badge-animate"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              borderRadius: '100px',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--accent-primary)',
              marginBottom: '30px',
              filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></span>
            Estimate: {currentTab.price}
          </div>

          {/* AI Search Prompt Box */}
          <form onSubmit={handlePromptSubmit} className="hero-search-form" style={{
            maxWidth: '650px',
            margin: '0 auto 40px',
            position: 'relative',
            background: 'var(--bg-glass)',
            border: '1px solid',
            borderColor: isInputFocused ? 'var(--accent-primary)' : 'var(--border-glass)',
            borderRadius: '100px',
            padding: '8px',
            backdropFilter: 'var(--glass-blur)',
            boxShadow: isInputFocused 
              ? '0 0 30px rgba(255, 94, 0, 0.25), 0 20px 50px rgba(0,0,0,0.6)' 
              : '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            transition: 'var(--transition)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" style={{ marginLeft: '20px', flexShrink: 0 }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              placeholder="Describe what you want to build in your yard..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              style={{
                flexGrow: 1,
                background: 'none',
                border: 'none',
                color: '#fff',
                padding: '12px 16px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{
              padding: '12px 28px',
              fontSize: '0.9rem',
              borderRadius: '100px',
              whiteSpace: 'nowrap'
            }}>
              Design with AI
            </button>
          </form>

          {/* Action Buttons */}
          <div className="hero-ctas" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button onClick={() => setView('calculator')} className="btn btn-primary" style={{ padding: '16px 36px', minWidth: '200px' }}>
              🛠️ Cost Estimator
            </button>
            <button onClick={() => setView('projects')} className="btn btn-secondary" style={{ padding: '16px 36px', minWidth: '200px' }}>
              📐 View Portfolio
            </button>
          </div>

        </div>
      </div>
      
    </section>
  );
}
