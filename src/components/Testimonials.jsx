import React, { useState, useEffect } from 'react';

const reviews = [
  {
    stars: '★★★★★',
    text: '"Magalela Trading & Projects built our composite deck and swimming pool in Waterfall Estate. The design-led integration was flawless, and the hidden fastening clips look incredibly neat. Highly recommend their professional team!"',
    name: 'Sipho Zulu',
    service: 'Residential Deck & Pool Client'
  },
  {
    stars: '★★★★★',
    text: '"Our hotel outdoor dining patio was completely transformed. They designed and constructed a stunning hardwood Balau deck under a slatted timber pergola. Exceptional craftsmanship, and fully compliant with all building safety standards."',
    name: 'Amanda van der Merwe',
    service: 'Commercial Patio Project, Sandton'
  },
  {
    stars: '★★★★★',
    text: '"We needed council-compliant architectural plans for our double-story home extension and a raised deck. Magalela drafted the plans, secured the engineer sign-offs, and executed the brickwork and decking construction ahead of schedule."',
    name: 'Kavir Naidoo',
    service: 'Home Addition & Decking, Centurion'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (idx) => {
    setActiveIndex(idx);
  };

  return (
    <section className="reviews-section section-padding" id="reviews" style={{ background: 'var(--color-bg-deep)' }}>
      <div className="container">
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Reviews</span>
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-desc">See what residential and commercial property owners in South Africa say about our custom pools, decks, and construction projects.</p>
        </div>

        <div className="reviews-carousel-wrapper fade-in-up active">
          <div className="reviews-track" style={{ position: 'relative', overflow: 'hidden', minHeight: '260px' }}>
            {reviews.map((r, idx) => (
              <div 
                key={idx} 
                className={`review-slide ${idx === activeIndex ? 'active' : ''}`}
                style={{
                  position: idx === activeIndex ? 'relative' : 'absolute',
                  opacity: idx === activeIndex ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                  width: '100%',
                  textAlign: 'center',
                  padding: '20px 0'
                }}
              >
                <div className="stars" style={{ color: 'var(--color-gold-base)', fontSize: '1.25rem', marginBottom: '16px' }}>{r.stars}</div>
                <p className="review-text" style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--color-text-pri)', maxWidth: '800px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>{r.text}</p>
                <div className="reviewer-meta" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span className="reviewer-name" style={{ fontWeight: 700, color: 'var(--color-gold-light)', fontSize: '1.05rem' }}>{r.name}</span>
                  <span className="reviewer-service" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.service}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="carousel-dots" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {reviews.map((_, idx) => (
              <span 
                key={idx}
                className={`dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: idx === activeIndex ? 'var(--color-gold-base)' : 'rgba(255,255,255,0.1)',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
