import React from 'react';

export default function About({ setView }) {
  return (
    <section className="section-padding" id="about">
      <div className="container">
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Who We Are</span>
          <h2 className="section-title">Design-Led Outdoor Development</h2>
          <p className="section-desc">
            Magalela Trading & Projects is a premier construction firm based in Midrand. We design and construct premium outdoor environments that seamlessly integrate swimming pools, timber framing, composite decking, and compliant layouts.
          </p>
        </div>
        
        <div className="bento-grid">
          <div className="bento-card col-span-4 fade-in-up active">
            <div className="bento-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
            </div>
            <h3 className="bento-title">Swimming Pools</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We craft high-performance marbelite and fibreglass swimming pools, handling excavation, reinforced concrete shells, plumbing, coping stone surrounds, and advanced filtration setups.</p>
          </div>
          
          <div className="bento-card col-span-4 fade-in-up active" style={{ transitionDelay: '0.1s' }}>
            <div className="bento-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>
            </div>
            <h3 className="bento-title">Composite Decking</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Our carpenters are specialists in building custom outdoor timber decking (Balau, Garapa) and eco-friendly maintenance-free composite decking with hidden clip fasteners.</p>
          </div>
          
          <div className="bento-card col-span-4 fade-in-up active" style={{ transitionDelay: '0.2s' }}>
            <div className="bento-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            </div>
            <h3 className="bento-title">Structural Construction</h3>
            <p style={{ color: 'var(--text-secondary)' }}>As an NHBRC-registered general builder, we handle home additions, structural brickwork, luxury pergolas, and roof extensions, supported by compliant architectural designs.</p>
          </div>

          <div className="bento-card col-span-12 fade-in-up active" style={{ transitionDelay: '0.3s', display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ flexGrow: 1 }}>
              <p style={{ color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Our Head Office</p>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '8px' }}>Block G, 3rd Floor, Hertford Office Park, 90 Bekker Rd, Vorna Valley, Midrand, 1686</p>
            </div>
            <button onClick={() => setView('contact')} className="btn btn-secondary">Get in Touch</button>
          </div>
        </div>
      </div>
    </section>
  );
}
