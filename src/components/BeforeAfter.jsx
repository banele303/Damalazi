import React from 'react';

export default function BeforeAfter() {
  return (
    <section className="slider-section section-padding" id="before-after">
      <div className="container">
        
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Transformations</span>
          <h2 className="section-title">Decking & Pool Renewals</h2>
          <p className="section-desc">We take worn-out, weathered outdoor decks and renovate them into stunning, low-maintenance entertainment spaces built to last.</p>
        </div>

        <div className="transformation-showcase fade-in-up active" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', alignItems: 'center' }}>
          
          {/* Side-by-side Split Image Showcase */}
          <div style={{ position: 'relative', background: 'var(--color-bg-card)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '12px', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src="/images/before_after_deck.png" 
                alt="Before and After Deck Renovation" 
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '550px', objectFit: 'cover' }} 
              />
              {/* Custom Label Overlays */}
              <div style={{ position: 'absolute', top: '20px', left: '20px', padding: '6px 14px', background: 'rgba(239, 68, 68, 0.85)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Before: Weathered Timber
              </div>
              <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '6px 14px', background: 'rgba(34, 197, 94, 0.85)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                After: Premium Installation
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(10,13,18,0.9), transparent)', padding: '24px 20px 20px 20px' }}>
                <p style={{ margin: 0, color: 'var(--color-text-pri)', fontSize: '1rem', fontWeight: 600 }}>Kyalami Deck Restoration Project</p>
                <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-sec)', fontSize: '0.85rem' }}>Renovated Rusted Subframe + Installed Premium Eco-Friendly Composite Boards</p>
              </div>
            </div>
          </div>

          {/* Transformation highlights */}
          <div className="transformation-details" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '16px' }}>
            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-gold-base)', fontSize: '1.15rem', marginBottom: '8px' }}>1. Subframe Reinforcement</h4>
              <p style={{ color: 'var(--color-text-sec)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>We inspect and replace rotting wooden joists, installing structural steel beams or double-treated structural pine framework to guarantee stability.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-gold-base)', fontSize: '1.15rem', marginBottom: '8px' }}>2. Hidden Fastening Clips</h4>
              <p style={{ color: 'var(--color-text-sec)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>No exposed nails or screws to snag feet. We use durable stainless steel hidden clips that sit between the boards, ensuring a seamless luxury finish.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-gold-base)', fontSize: '1.15rem', marginBottom: '8px' }}>3. Zero Maintenance Boarding</h4>
              <p style={{ color: 'var(--color-text-sec)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>With premium composite boards, there is no need to scrub, sand, seal, or oil. Just an occasional wash with soapy water keeps your deck looking brand new.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
