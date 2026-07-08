import React from 'react';

export default function Services() {
  const treatments = [
    {
      id: 'laser-hair',
      category: 'Hair Reduction',
      title: 'Diode Laser Hair Removal',
      description: 'Get silky smooth skin with our high-speed diode laser. Specifically calibrated for melanin-rich and darker skin tones with advanced contact cooling for near-painless, permanent results.',
      image: '/images/treatment_laser.png',
      benefits: ['Safe for all skin tones incl. darker skin', 'Permanent hair reduction in 6–8 sessions', 'Comfortable cooling tip technology'],
      price: 'From R850 / session'
    },
    {
      id: 'facial',
      category: 'Skin Rejuvenation',
      title: 'IPL Photo Facial & Glow Treatment',
      description: 'Reverse sun damage, target hyperpigmentation, and banish uneven skin tone. Our photorejuvenation facial stimulates collagen and evens out pigmentation concerns common in African skin.',
      image: '/images/treatment_facial.png',
      benefits: ['Targets dark spots & hyperpigmentation', 'Reduces redness and uneven skin tone', 'Boosts natural collagen production'],
      price: 'From R1,400 / session'
    },
    {
      id: 'hair-restoration',
      category: 'Ethnic Hair Restoration',
      title: 'Hair Transplant & Restoration',
      description: 'Pioneers in African ethnic hair transplantation. Our specialists understand curly, coily, and textured hair follicle structures, delivering natural-looking, permanent restoration results.',
      image: '/images/treatment_tightening.png',
      benefits: ['Specialist in ethnic & textured hair types', 'FUE & FUT techniques available', 'Scalp health & wellness programmes'],
      price: 'Consultation required'
    },
    {
      id: 'tightening',
      category: 'Anti-Aging',
      title: 'Skin Tightening & Body Contouring',
      description: 'Stimulate deep thermal layers to tighten loose skin on the face, neck, and body. Non-invasive neocollagenesis to combat sagging and restore youthful firmness.',
      placeholderClass: 'gradient-peel',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="placeholder-svg">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
      ),
      benefits: ['Instant firming, long-term tightening', 'Zero surgery or downtime', 'Face, neck, jaw & body areas'],
      price: 'From R1,800 / session'
    },
    {
      id: 'peels',
      category: 'Advanced Skincare',
      title: 'Medical Chemical Peels',
      description: 'Exfoliate dull outer layers to reveal fresh, luminous skin. Exceptional for targeting acne scarring, PIH (post-inflammatory hyperpigmentation), large pores, and texture concerns.',
      placeholderClass: 'gradient-filler',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="placeholder-svg">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      benefits: ['Treats PIH & acne scarring', 'Brightens & evens skin tone', 'Stimulates rapid cellular renewal'],
      price: 'From R950 / session'
    },
    {
      id: 'fillers',
      category: 'Aesthetic Injectables',
      title: 'Dermal Fillers & Volume Restoration',
      description: 'Restore youthful volume, contour cheekbones, and plump lips using premium Hyaluronic Acid fillers. Naturally enhancing facial harmony and structure for soft, beautiful results.',
      placeholderClass: 'gradient-peel',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="placeholder-svg">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      benefits: ['Enhances facial contours & lips', 'Premium HA formula, natural results', 'Safe, immediate & reversible'],
      price: 'From R3,800 / syringe'
    }
  ];

  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Our Treatments</span>
          <h2 className="section-title">Signature MASA Treatments</h2>
          <p className="section-desc">From ethnic hair restoration to advanced laser skin treatments, every MASA procedure is designed to honour and enhance the unique beauty of African skin and beyond.</p>
        </div>

        <div className="services-grid">
          {treatments.map((t, idx) => (
            <div key={t.id} className="service-card fade-in-up active" style={{ transitionDelay: `${idx * 0.05}s` }}>
              <div className="service-img-wrapper">
                {t.image ? (
                  <img src={t.image} alt={t.title} className="service-img" />
                ) : (
                  <div className={`service-placeholder-bg ${t.placeholderClass}`}>
                    {t.icon}
                  </div>
                )}
                <div className="service-img-overlay"></div>
              </div>
              <div className="service-content">
                <span className="service-category">{t.category}</span>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <ul className="service-benefits">
                  {t.benefits.map((b, i) => (
                    <li key={i}>
                      <span>✓</span> {b}
                    </li>
                  ))}
                </ul>
                <div className="service-footer">
                  <span className="service-price">{t.price}</span>
                  <a href="#booking" className="btn-text">Book Now →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
