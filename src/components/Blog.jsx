import React, { useState } from 'react';

const articles = [
  {
    id: 1,
    title: 'Selective Photothermolysis: Why 808nm is the Diode Laser Hair Removal Standard',
    excerpt: 'Explore the exact quantum mechanics behind modern hair removal. Learn how melanin absorption curves make 808nm the safest and most effective wavelength.',
    image: '/images/blog_diode.png',
    date: 'July 5, 2026',
    author: 'Dr. Fadi Hajjaj, MD',
    readTime: '6 min read',
    content: (
      <>
        <p>In the clinical domain of medical aesthetics, laser hair reduction has transitioned from an experimental process to a highly optimized science. At the center of this transition lies the principle of <strong>Selective Photothermolysis</strong>, defined by Anderson and Parrish in 1983. This principle states that a specific wavelength of light can selectively target a chromophore (in this case, melanin in the hair follicle) and destroy it thermally without damaging surrounding skin tissue.</p>
        
        <div className="blog-callout">
          <h5>Wavelength Precision</h5>
          <p>The 808nm diode wavelength is uniquely positioned. It balance high absorption in melanin with deep dermal penetration, ensuring thermal energy reaches the bulb and bulge of the follicle.</p>
        </div>

        <h4>Melanin Absorption vs. Skin Safety</h4>
        <p>The Fitzpatrick skin scale ranges from Type I (very fair) to Type VI (highly pigmented). Shorter wavelengths (like the 755nm Alexandrite) are highly absorbed by melanin. While excellent for fair skin, this absorption represents a burn risk for darker skin tones because the epidermal melanin absorbs too much energy. Conversely, longer wavelengths (like the 1064nm Nd:YAG) penetrate deeply but have low melanin absorption, requiring higher fluences which increases discomfort.</p>
        
        <p>The 808nm diode wavelength strikes the optimal therapeutic balance. It is deep enough to reach deep-seated follicles while maintaining a safety margin for epidermal heating, especially when paired with active sapphire contact cooling.</p>

        <h4>Pre-Treatment and Safety Standards</h4>
        <p>To ensure maximum clinical efficacy, patients must adhere to strict guidelines:</p>
        <ul>
          <li><strong>No Plucking or Waxing:</strong> The target follicle must remain intact. Only shaving is permitted.</li>
          <li><strong>Sun Avoidance:</strong> Active tans increase epidermal melanin concentrations, elevating risk. Avoid direct exposure for 14 days pre-treatment.</li>
        </ul>
      </>
    )
  },
  {
    id: 2,
    title: 'Deep Hydro-Volume: Inside Dermalax Hyaluronic Acid Fillers',
    excerpt: 'Understanding the biochemical cross-linking of South Korean Monophasic Dermalax. How BDDE cross-linking extends product longevity.',
    image: '/images/blog_fillers.png',
    date: 'June 28, 2026',
    author: 'Elena Rostova, Aesthetics Specialist',
    readTime: '5 min read',
    content: (
      <>
        <p>Dermal fillers have revolutionized non-surgical facial contouring, with Hyaluronic Acid (HA) being the global material of choice. Among premium brands, <strong>Dermalax</strong> stands out due to its monophasic gel structure and specialized chemical cross-linking. Unlike biphasic fillers, which contain a mixture of cross-linked particles suspended in non-cross-linked HA, Dermalax consists of a homogeneous monophasic gel, allowing for smooth extrusion and highly natural-looking volume restoration.</p>
        
        <div className="blog-callout">
          <h5>The Cross-Linking Process</h5>
          <p>Standard HA is degraded by the body\'s natural hyaluronidase enzymes within days. By using BDDE (1,4-butanediol diglycidyl ether) cross-linking, Dermalax forms a stable, three-dimensional matrix that resists enzymatic breakdown, providing results that endure for 6 to 12 months.</p>
        </div>

        <h4>Safety, Hydration, and Rheology</h4>
        <p>Hyaluronic acid is a naturally occurring glycosaminoglycan capable of binding up to 1,000 times its weight in water. When injected into the dermis or subcutaneous space, it immediately pulls in hydration, filling volume gaps. Dermalax is purified to remove residual BDDE, reducing allergic responses and inflammatory swelling post-procedure.</p>

        <p>Depending on facial anatomy, different Dermalax formulations are used:</p>
        <ul>
          <li><strong>Dermalax Plus:</strong> Low viscosity, ideal for superficial lines, tear troughs, and lip hydration.</li>
          <li><strong>Dermalax Deep Plus:</strong> Medium viscosity, optimized for nasolabial folds, cheekbones, and lip volume.</li>
          <li><strong>Dermalax Implant Plus:</strong> High viscosity, injected supra-periosteally for structural chin and jawline definition.</li>
        </ul>
      </>
    )
  },
  {
    id: 3,
    title: 'Reversing Photoaging: How IPL Photo Facials Target Melanin and Redness',
    excerpt: 'Uncover how broadband light energy selectively collapses hyperpigmented spots and micro-capillaries to correct rosacea and sun damage.',
    image: '/images/blog_ipl.png',
    date: 'June 15, 2026',
    author: 'Dr. Fadi Hajjaj, MD',
    readTime: '8 min read',
    content: (
      <>
        <p>Photoaging—manifested as sunspots, age spots, mottled pigmentation, and visible capillaries—is the direct result of chronic ultraviolet radiation. While traditional laser resurfacing peels away layers of skin to trigger healing, <strong>Intense Pulsed Light (IPL)</strong> targets pigment under the skin surface without damaging the epidermis, offering a zero-downtime rejuvenative alternative.</p>
        
        <div className="blog-callout">
          <h5>Dual Chromophore Targeting</h5>
          <p>IPL utilizes a broad spectrum of light (typically 500nm to 1200nm). Filter cut-offs selectively direct energy into both oxyhemoglobin (for red vascular lesions) and melanin (for brown pigmented spots).</p>
        </div>

        <h4>The Pigment Rejuvenation Process</h4>
        <p>When broadband light hits a pigmented lesion, the melanin absorbs the thermal energy rapidly. This heat collapses the pigment cells. Over the next 3 to 7 days, the darkened spots migrate to the skin surface, resembling "coffee grounds," before naturally flaking off. Concurrently, when IPL targets visible capillaries, the energy heats the blood inside the vessel, collapsing the vein walls. The body then naturally reabsorbs the micro-vessels, fading rosacea and redness.</p>

        <h4>Post-Treatment Care Guidelines</h4>
        <p>Because the skin is sensitive to UV rays post-IPL, compliance with post-treatment protocols is essential:</p>
        <ul>
          <li><strong>Broad Spectrum SPF:</strong> Apply SPF 50+ hourly. Melanin cells are highly reactive post-treatment and UV exposure can trigger hyperpigmentation.</li>
          <li><strong>Gentle Skincare:</strong> Avoid retinoids, chemical exfoliants, and active serums for 5 days. Stick to a simple ceramide moisturizer.</li>
        </ul>
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
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="blog-section section-padding" id="blog">
      <div className="container">
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Skincare Intelligence</span>
          <h2 className="section-title">The Dermalaz Journal</h2>
          <p className="section-desc">Delve into the science of medical aesthetics. Our clinical articles explain the physics and safety behind our laser and filler procedures.</p>
        </div>

        <div className="services-grid">
          {articles.map((art) => (
            <div key={art.id} className="service-card fade-in-up active">
              <div className="service-img-wrapper" style={{ height: '200px' }}>
                <img src={art.image} alt={art.title} className="service-img" />
                <div className="service-img-overlay"></div>
              </div>
              <div className="service-content" style={{ padding: '24px' }}>
                <span className="service-category">{art.readTime}</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: '1.4' }}>{art.title}</h3>
                <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>{art.excerpt}</p>
                <div className="service-footer" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>By {art.author}</span>
                  <button onClick={() => openArticle(art)} className="btn-text" style={{ cursor: 'pointer', fontSize: '0.85rem' }}>Read Article →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {activeArticle && (
        <div className="blog-modal-overlay" onClick={closeArticle}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeArticle} aria-label="Close modal">×</button>
            <div className="modal-banner" style={{ backgroundImage: `url(${activeArticle.image})` }}>
              <div className="modal-banner-overlay"></div>
              <div className="modal-banner-content">
                <span className="badge" style={{ marginBottom: '12px' }}>{activeArticle.readTime}</span>
                <h2>{activeArticle.title}</h2>
                <p>Published on {activeArticle.date} • Written by {activeArticle.author}</p>
              </div>
            </div>
            <div className="modal-body-content">
              {activeArticle.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
