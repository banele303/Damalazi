import React, { useState } from 'react';

const articles = [
  {
    id: 1,
    title: 'Composite vs. Timber Decking: Choosing for the South African Climate',
    excerpt: 'Explore how harsh South African weather affects decking materials. Learn why composite is overtaking traditional hardwoods like Balau and Garapa in modern construction.',
    image: '/images/composite_boards.png',
    date: 'July 8, 2026',
    author: 'Magalela Construction Team',
    readTime: '6 min read',
    content: (
      <>
        <p>Deciding between composite and timber decking is one of the most critical decisions when planning your outdoor space. In South Africa, our weather conditions are unique: high UV exposure in Gauteng, severe winter rainfall and coastal humidity in Cape Town, and intense heat in Durban. These climates place extreme stress on outdoor timber structures.</p>
        
        <div className="blog-callout">
          <h5>UV & Moisture Performance</h5>
          <p>Traditional timbers like Balau and Garapa require sealing at least twice a year in high-UV areas. Without maintenance, they fade to a dull grey and split. Premium composite decking (like Eva-Last) is engineered to resist fading and moisture completely.</p>
        </div>

        <h4>Evaluating Natural Timber Decks</h4>
        <p>Hardwoods like Garapa and Balau are stunning. They offer an organic feel and deep color that composite cannot fully replicate. However, timber absorbs moisture, leading to expanding, warping, and cracking if not oiled regularly. Treated Pine is budget-friendly but is a softwood, making it susceptible to denting, wood rot, and termite infestation if not pressure-treated correctly.</p>
        
        <p>Composite decking, made from recycled wood fibers and plastic polymers, is wrapped in a protective cap. It never requires sanding, oiling, or painting. It is highly resistant to rot, mold, scratching, and fading, backed by warranties up to 25 years.</p>

        <h4>Comparison Summary</h4>
        <ul>
          <li><strong>Initial Cost:</strong> Pine is cheapest, followed by Garapa and Balau. Composite has the highest initial cost.</li>
          <li><strong>Maintenance Cost:</strong> Composite is virtually R0. Wood decks require sanding, oil and sealants, costing thousands every year.</li>
          <li><strong>Lifespan:</strong> Composite decks outlast softwoods by double, maintaining their color and structural integrity for decades.</li>
        </ul>
      </>
    )
  },
  {
    id: 2,
    title: 'SANS 10082 Compliance: Building Regulations for Raised Decks in South Africa',
    excerpt: 'Before building an elevated deck, understand South Africa\'s safety codes. A guide to foundations, handrails, and engineers sign-offs.',
    image: '/images/navigation_layout.png',
    date: 'June 29, 2026',
    author: 'Structural Engineering Board',
    readTime: '5 min read',
    content: (
      <>
        <p>Any deck elevated more than 300mm above ground level is classified as a raised structure. In South Africa, raised decks must comply with <strong>SANS 10400 (Part M and Part T)</strong> building standards to ensure structural safety. Failure to comply can result in local council fines or structure collapse.</p>
        
        <div className="blog-callout">
          <h5>Structural Safety Limits</h5>
          <p>Any deck higher than 1.5 meters from ground level requires structural engineering plans and an engineer\'s sign-off. Safety handrails must be at least 1 meter high, and balustrade gaps cannot exceed 100mm.</p>
        </div>

        <h4>Core SANS Guidelines for Decking Subframes</h4>
        <p>Proper deck construction starts from the ground up. Foundations must consist of concrete footings (typically 300x300mm and 600mm deep) to anchor structural posts. Timber posts must be treated to H4 or H5 classification for in-ground contact, preventing subterranean rot and wood-boring insects.</p>
        
        <p>Structural timber used for joists and bearers must be S5 graded structural pine or hardwood, sized and spaced according to load-bearing spans. For pool environments, joists should have a joist-tape seal to prevent water pooling between the deck boards and joists.</p>

        <h4>Why Compliance Matters</h4>
        <ul>
          <li><strong>Council Approval:</strong> Submitting municipal plans prevents delays when selling your home.</li>
          <li><strong>Safety:</strong> Structural collapse of elevated decks can cause severe injuries.</li>
          <li><strong>Insurance:</strong> Homeowners insurance policies will reject claims if a deck was built without SANS compliance.</li>
        </ul>
      </>
    )
  },
  {
    id: 3,
    title: 'The Timber Deck Maintenance Guide: Protecting Balau & Garapa Wood',
    excerpt: 'Keep your natural hardwood deck looking rich and premium. Learn the correct sanding, oiling, and cleaning techniques.',
    image: '/images/timber_decking.png',
    date: 'June 14, 2026',
    author: 'Magalela Carpentry Workshop',
    readTime: '4 min read',
    content: (
      <>
        <p>Natural hardwood decking is a premium investment. Wood types like Garapa, Balau, and Teak have natural oils that repel insects, but they are still vulnerable to UV graying and surface cracking. By following a consistent maintenance schedule, you can extend your hardwood deck\'s lifespan to 30+ years.</p>
        
        <div className="blog-callout">
          <h5>Oiling vs. Varnishing</h5>
          <p>Never apply standard varnish or polyurethane sealers to an outdoor deck. They crack, peel, and trap moisture. Always use penetrating timber oils (like Woodoc or Cutek) which soak into the grain and allow the timber to breathe.</p>
        </div>

        <h4>Three Steps to Deck Restoration</h4>
        <p><strong>1. Deep Cleaning:</strong> Use a specialized wood cleaner (containing oxalic acid) to wash away dirt, algae, and grey wood fibers. Apply with a stiff-bristled brush, let it sit for 15 minutes, then pressure-wash gently (do not damage the wood fibers).</p>
        
        <p><strong>2. Sanding:</strong> Once the deck is completely dry, sand the surface with 80-grit sandpaper. This opens up the wood pores to absorb oil and smooths out any splinters.</p>
        
        <p><strong>3. Sealing:</strong> Apply two coats of a high-quality penetrating timber oil with UV blockers. Let the first coat absorb fully before applying the second coat. Maintain this routine once or twice a year depending on sun exposure.</p>
      </>
    )
  }
];

export default function Blog() {
  const [activeArticle, setActiveArticle] = useState(null);

  const openArticle = (art) => {
    setActiveArticle(art);
    document.body.style.overflow = 'hidden';
  };

  const closeArticle = () => {
    setActiveArticle(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="blog-section section-padding" id="blog" style={{ background: 'var(--color-bg-deep)' }}>
      <div className="container">
        
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Expert Guides</span>
          <h2 className="section-title">Outdoor Construction Journal</h2>
          <p className="section-desc">Get professional advice, material comparisons, and regulatory guidelines from our expert decking and pool building teams in South Africa.</p>
        </div>

        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {articles.map((art, idx) => (
            <article 
              key={art.id} 
              className="blog-card fade-in-up active"
              style={{ 
                transitionDelay: `${idx * 0.05}s`, 
                background: 'var(--color-bg-card)', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ padding: '12px 12px 0 12px', height: '232px', overflow: 'hidden' }}>
                <img 
                  src={art.image} 
                  alt={art.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                />
              </div>
              <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '12px', lineHeight: 1.4 }}>{art.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-sec)', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>{art.excerpt}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-base)' }}>By {art.author}</span>
                  <button 
                    onClick={() => openArticle(art)} 
                    className="btn-text" 
                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                  >
                    Read Guide →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div 
            style={{ 
              position: 'fixed', 
              inset: 0, 
              background: 'rgba(5, 7, 10, 0.9)', 
              backdropFilter: 'blur(10px)', 
              zIndex: 9999, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '20px' 
            }}
            onClick={closeArticle}
          >
            <div 
              style={{ 
                background: 'var(--color-bg-deep)', 
                maxWidth: '750px', 
                width: '100%', 
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '16px', 
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '12px 12px 0 12px', position: 'relative' }}>
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.title} 
                  style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block', borderRadius: '10px' }} 
                />
                <button 
                  onClick={closeArticle}
                  style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    right: '20px', 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: 'rgba(10,13,18,0.7)', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '32px' }} className="blog-modal-content">
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                  <span>Published {activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '24px', lineHeight: 1.3 }}>{activeArticle.title}</h2>
                <div style={{ color: 'var(--color-text-sec)', lineHeight: 1.7, fontSize: '1rem' }} className="article-body">
                  {activeArticle.content}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
