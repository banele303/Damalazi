import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Modern Composite Pool Deck',
    location: 'Waterfall Estate, Midrand',
    category: 'composite',
    image: '/images/project_pool_deck.png',
    desc: 'Installation of low-maintenance charcoal composite decking boards around a clean geometric swimming pool, creating a seamless transition from the indoor lounge to the poolside.',
    cost: 'R115,000 - R135,000',
    time: '5 Days Build',
    materials: ['Eva-Last Vorna Charcoal Composite', 'Galvanized Steel Subframe', 'Hidden Decking Clips'],
    compliance: 'SANS 10400 Part M Balustrade Safe'
  },
  {
    id: 2,
    title: 'Luxury Covered Patio & Gazebo',
    location: 'Steyn City, Johannesburg',
    category: 'pergolas',
    image: '/images/project_patio_gazebo.png',
    desc: 'A complete outdoor entertainment area featuring a structural gazebo frame, grey composite floor decking, and cozy integrated sofa seating.',
    cost: 'R180,000 - R210,000',
    time: '8 Days Build',
    materials: ['S5 Graded Structural Pine beams', 'Eva-Last Composite Boards', 'Vented Polycarbonate Roof'],
    compliance: 'Excavation & Post Foundations Certified'
  },
  {
    id: 3,
    title: 'Contemporary Villa Slatted Screen & Balcony',
    location: 'Sandhurst, Sandton',
    category: 'construction',
    image: '/images/project_modern_house.png',
    desc: 'Custom wooden slatted privacy screen panels and matching balcony decking installed on a newly completed double-story modern architectural home.',
    cost: 'R95,000 - R110,000',
    time: '4 Days Build',
    materials: ['Siberian Larch slats', 'Balau hardwood decking', 'Stainless Steel brackets'],
    compliance: 'SANS 10400 Height & Post Compliant'
  },
  {
    id: 4,
    title: 'Premium Garapa Wood Pool Surround',
    location: 'Constantia, Cape Town',
    category: 'timber',
    image: '/images/timber_decking.png',
    desc: 'Rich, golden Garapa hardwood timber decking laid with hidden under-deck fasteners around a luxury infinity pool with sparkling blue water.',
    cost: 'R145,000 - R165,000',
    time: '6 Days Build',
    materials: ['Imported Garapa Timber', 'Hardwood bearers', 'Spax Stainless steel screws'],
    compliance: 'SANS 10400 Joist Tape Sealed'
  },
  {
    id: 5,
    title: 'Sleek Charcoal Composite Decking Boards',
    location: 'Umhlanga Ridge, Durban',
    category: 'composite',
    image: '/images/composite_boards.png',
    desc: 'High-density composite boards showing the deep wood-grain texture and neat invisible clips installed on a heavy-duty subframe.',
    cost: 'R75,000 - R85,000',
    time: '3 Days Build',
    materials: ['Charcoal Composite Boards', 'Galvanized Post anchors', 'Hidden Clips'],
    compliance: 'Wind Load Load-span Certified'
  },
  {
    id: 6,
    title: 'Before & After Deck Restoration',
    location: 'Kyalami, Midrand',
    category: 'timber',
    image: '/images/before_after_deck.png',
    desc: 'Full restoration showing a side-by-side comparison of weathered, grayed timber boards and our newly installed premium decking boards.',
    cost: 'R45,000 - R55,000',
    time: '3 Days Build',
    materials: ['Acoustic rubber joist strip', 'S5 Treated structural Pine', 'Deck Oil sealant'],
    compliance: 'Restoration Structural Certified'
  }
];

export default function Portfolio({ setView, setQuoteData }) {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="portfolio-section section-padding" id="projects" style={{ background: 'var(--color-bg-sec)', minHeight: '100vh', paddingTop: '120px' }}>
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
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid var(--color-border)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              onClick={() => setActiveProject(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--color-accent-dim)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(134, 59, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ padding: '12px 12px 0 12px', height: '240px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', borderRadius: '12px' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 12px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(4px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent-secondary)', fontWeight: 700 }}>
                    {project.category}
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.location}</p>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: 700 }}>{project.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px 0', flexGrow: 1 }}>{project.desc}</p>
                
                {/* Metas inside card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '14px', marginTop: 'auto', gap: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Est. Cost</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{project.cost.split(' - ')[0]}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Duration</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{project.time}</span>
                  </div>
                </div>
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
              background: 'rgba(5, 7, 10, 0.92)', 
              backdropFilter: 'blur(12px)', 
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
                background: 'var(--bg-deep)', 
                maxWidth: '920px', 
                width: '100%', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '1px solid var(--color-border)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveProject(null)}
                style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  right: '20px', 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: 'rgba(15,23,42,0.85)', 
                  backdropFilter: 'blur(4px)',
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.1)',
                  zIndex: 10,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(15,23,42,0.85)'}
              >
                ✕
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1.1fr 0.9fr' }}>
                {/* Left side: Image and quick specs */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderRadius: '16px', overflow: 'hidden', height: '280px', border: '1px solid var(--color-border)' }}>
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  
                  {/* Quick specs box */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Scope Range</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{activeProject.cost}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Timeline</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>{activeProject.time}</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Detailed description & CTA */}
                <div style={{ padding: '32px 32px 32px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: 'var(--accent-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{activeProject.location}</span>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: '4px 0 16px 0', fontWeight: 800, lineHeight: 1.2 }}>{activeProject.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.92rem', marginBottom: '24px' }}>
                      {activeProject.desc}
                    </p>

                    {/* Materials Tag List */}
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ fontSize: '0.8rem', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Materials Implemented</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {activeProject.materials.map((mat, i) => (
                          <span key={i} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Safety compliance tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', padding: '10px 14px', borderRadius: '12px', width: 'fit-content' }}>
                      <span style={{ color: '#22c55e', fontSize: '1rem' }}>✓</span>
                      <span style={{ fontSize: '0.75rem', color: '#86efac', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{activeProject.compliance}</span>
                    </div>
                  </div>

                  {/* CTA redirect trigger */}
                  <button
                    onClick={() => {
                      setQuoteData({
                        projectTitle: activeProject.title,
                        projectLocation: activeProject.location,
                        notes: `I would like to request a quotation for a project similar to "${activeProject.title}" in ${activeProject.location}.\n\nSpecs: ${activeProject.materials.join(', ')}.`,
                      });
                      setView('quote');
                      setActiveProject(null);
                    }}
                    className="btn"
                    style={{
                      padding: '12px 20px',
                      borderRadius: '30px',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                      color: '#000',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(134, 59, 255, 0.3)',
                      marginTop: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  >
                    📋 Request Quote Like This
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
