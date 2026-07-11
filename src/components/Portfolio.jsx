import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Modern Composite Pool Deck',
    location: 'Waterfall Estate, Midrand',
    category: 'composite',
    image: '/images/project_pool_deck.png',
    desc: 'Installation of low-maintenance charcoal composite decking boards around a clean geometric swimming pool, creating a seamless transition from the indoor lounge to the poolside.'
  },
  {
    id: 2,
    title: 'Luxury Covered Patio & Gazebo',
    location: 'Steyn City, Johannesburg',
    category: 'pergolas',
    image: '/images/project_patio_gazebo.png',
    desc: 'A complete outdoor entertainment area featuring a structural gazebo frame, grey composite floor decking, and cozy integrated sofa seating.'
  },
  {
    id: 3,
    title: 'Contemporary Villa Slatted Screen & Balcony',
    location: 'Sandhurst, Sandton',
    category: 'construction',
    image: '/images/project_modern_house.png',
    desc: 'Custom wooden slatted privacy screen panels and matching balcony decking installed on a newly completed double-story modern architectural home.'
  },
  {
    id: 4,
    title: 'Premium Garapa Wood Pool Surround',
    location: 'Constantia, Cape Town',
    category: 'timber',
    image: '/images/timber_decking.png',
    desc: 'Rich, golden Garapa hardwood timber decking laid with hidden under-deck fasteners around a luxury infinity pool with sparkling blue water.'
  },
  {
    id: 5,
    title: 'Sleek Charcoal Composite Decking Boards',
    location: 'Umhlanga Ridge, Durban',
    category: 'composite',
    image: '/images/composite_boards.png',
    desc: 'High-density composite boards showing the deep wood-grain texture and neat invisible clips installed on a heavy-duty subframe.'
  },
  {
    id: 6,
    title: 'Before & After Deck Restoration',
    location: 'Kyalami, Midrand',
    category: 'timber',
    image: '/images/before_after_deck.png',
    desc: 'Full restoration showing a side-by-side comparison of weathered, grayed timber boards and our newly installed premium decking boards.'
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="portfolio-section section-padding" id="projects" style={{ background: 'var(--color-bg-sec)' }}>
      <div className="container">
        
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Our Portfolio</span>
          <h2 className="section-title">Completed Build Projects</h2>
          <p className="section-desc">Explore our recently completed outdoor installations across South Africa, from custom residential pool surrounds to large estate decking projects.</p>
        </div>

        {/* Filter Buttons */}
        <div className="portfolio-filters" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {['all', 'composite', 'timber', 'pergolas', 'construction'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 20px', borderRadius: '30px', fontSize: '0.88rem', textTransform: 'capitalize', cursor: 'pointer' }}
            >
              {cat === 'all' ? 'Show All' : cat === 'composite' ? 'Composite Decking' : cat === 'timber' ? 'Timber Decking' : cat === 'pergolas' ? 'Pergolas & Gazebos' : 'Building Construction'}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className="portfolio-card fade-in-up active"
              style={{ 
                transitionDelay: `${idx * 0.05}s`, 
                cursor: 'pointer', 
                background: 'var(--color-bg-card)', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid var(--color-border)',
                transition: 'var(--transition-smooth)'
              }}
              onClick={() => setActiveProject(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--color-border-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <div style={{ padding: '12px 12px 0 12px', height: '252px', overflow: 'relative', position: 'relative' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', borderRadius: '8px' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 12px', background: 'rgba(10,13,18,0.7)', borderRadius: '20px', border: '1px solid var(--color-border)', fontSize: '0.78rem', textTransform: 'capitalize', color: 'var(--color-gold-light)', fontWeight: 600 }}>
                    {project.category}
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ color: 'var(--color-gold-base)', fontSize: '0.85rem', fontWeight: 600, margin: '0 0 4px 0' }}>{project.location}</p>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-pri)', marginBottom: '10px' }}>{project.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-sec)', lineHeight: 1.5, margin: 0 }}>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Project Lightbox Modal */}
        {activeProject && (
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
              padding: '24px' 
            }}
            onClick={() => setActiveProject(null)}
          >
            <div 
              style={{ 
                background: 'var(--color-bg-deep)', 
                maxWidth: '850px', 
                width: '100%', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '12px 12px 0 12px', position: 'relative' }}>
                <div style={{ position: 'relative', maxHeight: '480px', overflow: 'hidden', borderRadius: '10px' }}>
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '480px', objectFit: 'cover', borderRadius: '10px' }} 
                  />
                  <button 
                    onClick={() => setActiveProject(null)}
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
              </div>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ color: 'var(--color-gold-base)', fontSize: '0.9rem', fontWeight: 600 }}>{activeProject.location}</span>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text-pri)', margin: '4px 0 0 0' }}>{activeProject.title}</h2>
                  </div>
                  <span style={{ padding: '6px 16px', background: 'rgba(29,83,160,0.15)', border: '1px solid rgba(29,83,160,0.3)', borderRadius: '30px', color: 'var(--color-accent)', fontSize: '0.85rem', textTransform: 'capitalize', fontWeight: 600 }}>
                    {activeProject.category}
                  </span>
                </div>
                <p style={{ color: 'var(--color-text-sec)', lineHeight: 1.6, fontSize: '1rem', margin: 0 }}>
                  {activeProject.desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
