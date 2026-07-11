import React from 'react';

export default function Services({ setView, setServiceId }) {
  const services = [
    {
      id: 'swimming-pool',
      category: 'Swimming Pools',
      title: 'Pool Construction',
      description: 'Custom marbelite and fibreglass swimming pools built to engineering perfection. From earthmoving and steel structure reinforcement to filtration installation.',
      image: '/images/timber_decking.png',
      price: 'From R85,000'
    },
    {
      id: 'outdoor-development',
      category: 'Outdoor Spaces',
      title: 'Outdoor Development',
      description: 'Integrated backyard development combining decking, custom paving, structural fire pits, retaining walls, and planters for a premium outdoor lifestyle.',
      image: '/images/project_patio_gazebo.png',
      price: 'Custom Quotations'
    },
    {
      id: 'pergolas',
      category: 'Timber Frameworks',
      title: 'Custom Pergolas',
      description: 'Architectural pergolas and gazebos built from durable, oil-treated timbers. Designed to provide structural shading and architectural highlights.',
      image: '/images/project_patio_gazebo.png',
      price: 'From R12,000'
    },
    {
      id: 'building-construction',
      category: 'General Building',
      title: 'Building Construction',
      description: 'NHBRC-registered general building services. We manage complete residential home builds, structural extensions, room alterations, and boundary brickwork.',
      image: '/images/project_modern_house.png',
      price: 'On Specification'
    },
    {
      id: 'architectural-design',
      category: 'Planning & Drawings',
      title: 'Architectural Design',
      description: 'Compliance starts with professional drafting. We design SANS-compliant building plans, custom 3D renderings, and manage council submission procedures.',
      image: '/images/navigation_layout.png',
      price: 'From R8,000'
    },
    {
      id: 'composite-decking',
      category: 'Luxury Decking',
      title: 'Composite Decking',
      description: 'Modern, ultra-durable decking using high-density eco-composite boards. No sanding, no oiling, with 15-25 year manufacturer warranties.',
      image: '/images/project_pool_deck.png',
      price: 'From R1,650 / m²'
    }
  ];

  const handleCardClick = (id) => {
    setServiceId(id);
    setView('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section-padding" id="services">
      <div className="container">
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Our Services</span>
          <h2 className="section-title">Outdoor Building & Development</h2>
          <p className="section-desc">From custom pool builds to modern composite decking, our skilled team handles all aspects of design-led outdoor construction with NHBRC registration and SANS compliance.</p>
        </div>

        <div className="bento-grid">
          {services.map((s, idx) => (
            <div 
              key={s.id} 
              className="bento-card col-span-4 fade-in-up active" 
              style={{ transitionDelay: `${idx * 0.05}s`, cursor: 'pointer', minHeight: '380px' }}
              onClick={() => handleCardClick(s.id)}
            >
              <div className="bento-img-wrap">
                <img src={s.image} alt={s.title} />
              </div>
              
              <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  {s.category}
                </span>
                <h3 className="bento-title" style={{ marginBottom: '16px', fontSize: '1.6rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1 }}>{s.description}</p>
                
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{s.price}</span>
                  <span style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
