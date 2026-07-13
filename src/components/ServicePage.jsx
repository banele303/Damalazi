import React, { useState, useEffect } from 'react';

const serviceDetails = {
  'swimming-pool': {
    title: 'Swimming Pool Construction',
    subtitle: 'Custom Engineered Marbelite & Fibreglass Pools',
    heroImage: '/images/project_pool_deck.png',
    gallery: [
      { src: '/images/project_pool_deck.png', caption: 'Rim-flow concrete pool with composite deck surround' },
      { src: '/images/timber_decking.png', caption: 'Classic rectangular pool with timber copings' },
      { src: '/images/before_after_deck.png', caption: 'Full backyard renovation with pool integration' }
    ],
    description: 'At Magalela Trading & Projects, we build swimming pools that are structural masterpieces. From custom-shaped marbelite pools to quick-install premium fibreglass shells, we handle excavation, structural steel reinforcement, concrete pouring, marbelite plastering, filtration installation, and final tiling.',
    specsTitle: 'Pool Options Comparison',
    specsHeaders: ['Features', 'Marbelite Concrete', 'Fibreglass Shell'],
    specsRows: [
      ['Design Flexibility', '100% Custom Shapes & Depths', 'Pre-formed Shapes Only'],
      ['Installation Time', '4 - 6 Weeks (Excavation to water)', '1 - 2 Weeks (Rapid drop-in)'],
      ['Lifespan / Durability', '25+ Years (Structural Concrete)', '15 - 20 Years (Gelcoat surface)'],
      ['Maintenance Cost', 'Medium (Acid wash/re-marbelite at 10-15 yrs)', 'Low (Smooth non-porous gelcoat)'],
      ['Ideal For', 'Premium custom luxury homes & uneven terrain', 'Flat backyards looking for quick turnaround']
    ],
    sansTitle: 'SANS 10400-D Swimming Pool Safety & Compliance',
    sansRules: [
      { rule: 'Fencing Regulations', desc: 'All private swimming pools must be protected by an NHBRC/SANS approved fence or wall at least 1.2m high, with a self-closing, self-latching gate.' },
      { rule: 'Safety Nets & Covers', desc: 'If no fence is built, an approved safety net or solid pool cover must be fitted and secured. It must support the weight of a toddler.' },
      { rule: 'Drain Safety', desc: 'Main drains must have anti-vortex covers to prevent suction entrapment hazards.' }
    ],
    process: [
      { step: '01', title: 'Site Inspection & Engineering Plans', desc: 'We assess soil stability (clay vs sand), check sewer lines, and draft structural engineering diagrams for council approval.' },
      { step: '02', title: 'Excavation & Shuttering', desc: 'Heavy excavator earthworks followed by structural timber shuttering and structural steel grid reinforcement (REBAR).' },
      { step: '03', title: 'Shotcrete & Marbelite Plaster', desc: 'Pneumatically spraying high-strength concrete to form the shell, followed by a hand-plastered white or charcoal marbelite coating.' },
      { step: '04', title: 'Filtration, Copings & Handover', desc: 'Installing pump boxes, premium sand filters, LED lights, coping stones, and balancing chemical levels for immediate swimming.' }
    ],
    caseStudy: {
      title: 'The Midrand Infinity Pool Project',
      location: 'Carlswald Estate, Midrand',
      scope: '6x4m Concrete Rim-Flow Pool with Charcoal Marbelite Finish and 40m² Balau Hardwood Deck Surround',
      timeline: '5 Weeks',
      budget: 'R145,000',
      description: 'The client requested an infinity-edge pool built on a sloping clay embankment. We engineered reinforced concrete columns to support the deck and pool shell, securing SANS certification and providing a spectacular view over the estate.',
      clientQuote: '"Magalela turned our sloping backyard into a high-end resort. Extremely professional and fully compliant with estate rules." - Sarah K.'
    },
    faqs: [
      { q: 'How long does a concrete pool take to build?', a: 'Typically 4 to 6 weeks depending on weather, soil conditions, and excavation accessibility.' },
      { q: 'Do you provide plans and engineer sign-offs?', a: 'Yes. Every concrete pool we build is signed off by a certified structural engineer, complying with municipal regulations.' },
      { q: 'What is the difference between marbelite and fibreglass?', a: 'Marbelite is applied to concrete, allowing custom shapes, shapes that fit pools perfectly. Fibreglass is a pre-formed shell. Fibreglass installs faster but offers limited sizing.' }
    ],
    pricing: 'Starting from R85,000',
    calcLabel: 'Pool Volume Estimator (m³)',
    calcRate: 3500 // R3500 per cubic meter average construction cost
  },
  'composite-decking': {
    title: 'Premium Composite Decking',
    subtitle: 'Ultra-Durable & Maintenance-Free Outdoor Decking',
    heroImage: '/images/project_pool_deck.png',
    gallery: [
      { src: '/images/project_pool_deck.png', caption: 'Charcoal grey composite deck around swimming pool' },
      { src: '/images/composite_boards.png', caption: 'Eco-friendly cap-stock composite board textures' },
      { src: '/images/before_after_deck.png', caption: 'Before and After transformation of a weathered wood deck' }
    ],
    description: 'Enjoy outdoor living without the hassle of sanding and oiling. Our composite decking solutions use top-tier, eco-friendly composite boards (from leading brands like Eva-Last, MoistureShield, and Innofibe) installed on heavy-duty, rust-proof subframes.',
    specsTitle: 'Decking Materials Comparison',
    specsHeaders: ['Property', 'Premium Composite', 'Balau Hardwood', 'Treated Pine'],
    specsRows: [
      ['Maintenance Required', 'None (Soap & water wash)', 'High (Oil twice a year)', 'High (Seal/paint yearly)'],
      ['Lifespan', '25+ Years', '15 - 20 Years', '7 - 10 Years'],
      ['Warranty', '15 - 25 Years', 'None (Natural timber)', 'None (Subject to decay)'],
      ['Resistance', 'Termite, Rot & Fade proof', 'Rot resistant, susceptible to fade', 'Susceptible to termites & moisture'],
      ['Installation Cost', 'High upfront, R0 maintenance', 'Medium upfront, high upkeep', 'Low upfront, high maintenance']
    ],
    sansTitle: 'SANS 10400-M Timber & Composite Decking Compliance',
    sansRules: [
      { rule: 'Balustrades & Handrails', desc: 'Any deck with a drop height greater than 600mm must have handrails at least 1.0m high, with vertical balusters spaced no more than 100mm apart.' },
      { rule: 'Subframe Load Bearing', desc: 'Structural post spacing must conform to design loads (typically 1.5m to 2.0m spans depending on joist sizes). Posts must be embedded in concrete footings.' },
      { rule: 'Timber Treatment', desc: 'All structural timber subframes must be pre-treated to H3 (exterior above ground) or H4 (in-ground contact) specifications to prevent rot.' }
    ],
    process: [
      { step: '01', title: 'Laser Alignment & Site Prep', desc: 'We take precise digital level measurements and set concrete footings for structural columns.' },
      { step: '02', title: 'Framing & Joist Grid', desc: 'Assembling the structural subframe using H3 treated structural pine or galvanized steel profiles, spaced at 350mm centres.' },
      { step: '03', title: 'Hidden Fastener Clip Layout', desc: 'Securing the composite decking boards using hidden plastic or metal clips, allowing natural thermal expansion without showing screws.' },
      { step: '04', title: 'Fascia Board Trim & LEDs', desc: 'Finishing the perimeter with color-matched fascia boards, steps, and soft recessed step lighting.' }
    ],
    caseStudy: {
      title: 'The Waterfall Estate Pool Deck',
      location: 'Waterfall Country Estate, Midrand',
      scope: '55m² Eva-Last Apex Charcoal Deck built over an existing swimming pool coping and sloped lawn',
      timeline: '6 Days',
      budget: 'R92,000',
      description: 'We built a elevated composite deck surrounding an offset pool. The subframe was built from galvanized steel due to high soil moisture levels. The finished deck features step-downs, custom hatches for pool pumps, and integrated strip LEDs.',
      clientQuote: '"The craftsmanship is impeccable. No screws visible, looks clean, and absolute peace of mind knowing we never have to oil it." - David M.'
    },
    faqs: [
      { q: 'Does composite decking get hot in the sun?', a: 'Yes, composite boards absorb heat. However, modern cap-stock boards (like Eva-Last Apex) feature cellular cores that dissipate heat 30% faster than standard composites.' },
      { q: 'Can you build over an existing tiled patio?', a: 'Yes. We use low-profile subframe joists to raise the deck slightly above the tiles, ensuring proper water drainage.' },
      { q: 'Is a structural engineer required for elevated decks?', a: 'Under SANS 10400, any deck elevated more than 1.5m above ground requires a structural engineer to sign off on the design and post load calculations.' }
    ],
    pricing: 'Starting from R1,650 per m²',
    calcLabel: 'Decking Area Size (m²)',
    calcRate: 1650
  },
  'outdoor-development': {
    title: 'Outdoor Development',
    subtitle: 'Integrated Living Spaces, Landscaping & Paving',
    heroImage: '/images/project_patio_gazebo.png',
    gallery: [
      { src: '/images/project_patio_gazebo.png', caption: 'Patio area with fire pit and concrete slab paving' },
      { src: '/images/timber_decking.png', caption: 'Wooden decks integrated with paved walkways' },
      { src: '/images/before_after_deck.png', caption: 'Backyard landscape and boma construction' }
    ],
    description: 'We specialize in transforming ordinary backyards into luxury living environments. Our outdoor development services integrate decking, landscaping, retaining walls, fire pits, custom seating, and lighting into a single, cohesive design.',
    specsTitle: 'Outdoor Hardscaping Options',
    specsHeaders: ['Option', 'Exposed Aggregate Concrete', 'Clay Paving Tiles', 'Composite Turf'],
    specsRows: [
      ['Durability', 'High', 'Medium-High', 'Medium'],
      ['Water Permeability', 'Low', 'Medium (Sanded joints)', 'High'],
      ['Maintenance', 'Seal every 3 years', 'Occasional weed control', 'None'],
      ['Aesthetics', 'Modern minimalist, industrial', 'Rustic, warm tones', 'Green look all year']
    ],
    sansTitle: 'SANS 10400-K Retaining Walls & Site Drainage Compliance',
    sansRules: [
      { rule: 'Retaining Wall Height', desc: 'Any retaining wall higher than 1.2m requires design and sign-off by a registered structural engineer under SANS regulations.' },
      { rule: 'Subsoil Drainage', desc: 'We install agricultural drainpipes behind all retaining walls to prevent water pressure buildup and wall failure.' },
      { rule: 'Stormwater Runoff', desc: 'Site drainage must guide rainwater away from the main building foundations into municipal channels.' }
    ],
    process: [
      { step: '01', title: 'Topographical Analysis', desc: 'Analyzing the slope, soil compression, and stormwater channels.' },
      { step: '02', title: 'Terracing & Soil Retention', desc: 'Excavation and building LOP block or reinforced brick retaining walls.' },
      { step: '03', title: 'Hardscape Installation', desc: 'Pouring walkways, building structural fire bomas, and paving layouts.' },
      { step: '04', title: 'Softscaping & Landscape Lighting', desc: 'Planting indigenous trees, laying grass, and setting up automated 12V garden spotlights.' }
    ],
    caseStudy: {
      title: 'The Steyn City Sunken Boma',
      location: 'Steyn City, Johannesburg',
      scope: '30m² Sunken Fire pit with built-in stone benches, integrated concrete paving, and water feature',
      timeline: '3 Weeks',
      budget: 'R120,000',
      description: 'The customer requested a modern outdoor entertainment area. We excavated a 1.2m deep circular pit, waterproofed the retaining brickwork, laid custom aggregate stone paving, and installed a central gas-fire pit with surround LED glows.',
      clientQuote: '"It has completely changed our weekend gatherings. An amazing space to entertain guests." - Peter J.'
    },
    faqs: [
      { q: 'Do you manage both civil work and plants?', a: 'Yes. We are turnkey contractors, meaning we handle the heavy concrete foundations, paving, fire pits, as well as the soil, lawn, and landscaping.' }
    ],
    pricing: 'Custom Quotations',
    calcLabel: 'Hardscape Area Size (m²)',
    calcRate: 1200
  },
  'pergolas': {
    title: 'Custom Pergolas & Gazebos',
    subtitle: 'Architectural Timber Shading Structures',
    heroImage: '/images/project_patio_gazebo.png',
    gallery: [
      { src: '/images/project_patio_gazebo.png', caption: 'Custom slatted timber pergola over patio area' },
      { src: '/images/timber_decking.png', caption: 'Garapa timber pergola integrated with pool deck' }
    ],
    description: 'Add depth and shade to your outdoor deck with our premium custom pergolas. Built from treated pine, structural timber, or high-end hardwood, our pergolas are engineered to withstand the harsh South African sun while offering a sophisticated architectural outline.',
    specsTitle: 'Pergola Timber Selection',
    specsHeaders: ['Material', 'Garapa Hardwood', 'Balau Hardwood', 'Structural Pine'],
    specsRows: [
      ['Color Tone', 'Golden Yellow/Light Brown', 'Deep Reddish Brown', 'Light Blonde (Paintable)'],
      ['Density', 'Very High (Scratch resistant)', 'High', 'Medium (Softwood)'],
      ['Sun Bleaching', 'Slowly silvers', 'Silvers without sealing', 'Fades and cracks without seal'],
      ['Warranty/Lifespan', '20+ Years', '15 - 20 Years', '10 Years (Treated)']
    ],
    sansTitle: 'SANS 10400-L Structural Timbers & Gazebos Compliance',
    sansRules: [
      { rule: 'Wind Load Engineering', desc: 'Pergolas must be anchored securely to concrete footings (minimum 400x400x400mm) to prevent wind lift.' },
      { rule: 'Waterproof Roof Sheets', desc: 'If adding polycarbonate sheeting, it must have a minimum slope of 5 degrees to prevent water pooling and leaf buildup.' }
    ],
    process: [
      { step: '01', title: 'Structural Briefing', desc: 'Determining the wind loads, sun orientation for slat spacing, and size.' },
      { step: '02', title: 'Timber Oiling & Pre-cut', desc: 'We sand and treat the hardwood timbers in our workshop before site assembly to ensure coverage on joints.' },
      { step: '03', title: 'Anchor Assembly', desc: 'Securing heavy-duty galvanized U-brackets into concrete foundations.' },
      { step: '04', title: 'Beam Tying & Polycarb', desc: 'Tying primary rafters with structural coach screws and installing roofing.' }
    ],
    caseStudy: {
      title: 'The Sandton Patio Shade Project',
      location: 'Morningside, Sandton',
      scope: '5x3m Wall-Mounted Garapa Timber Pergola with tinted polycarbonate waterproofing',
      timeline: '3 Days',
      budget: 'R38,000',
      description: 'The client wanted a weather-proof extension of their lounge patio. We anchored a heavy Garapa ledger beam to the house brickwork, raised 3 structural timber posts, and fitted slatted rafters overlayed with UV-resistant roofing sheets.',
      clientQuote: '"Now we can eat outside even during heavy summer afternoon storms. Outstanding timber finish." - Linda N.'
    },
    faqs: [
      { q: 'Can you add roller blinds to the sides?', a: 'Yes, we can build custom timber channels into the columns to house canvas or solar blinds.' }
    ],
    pricing: 'Starting from R12,000',
    calcLabel: 'Pergola Footprint Size (m²)',
    calcRate: 2200
  },
  'building-construction': {
    title: 'Building Construction & Renovations',
    subtitle: 'NHBRC Registered General Builders',
    heroImage: '/images/project_modern_house.png',
    gallery: [
      { src: '/images/project_modern_house.png', caption: 'Modern double-story residential home construction' },
      { src: '/images/navigation_layout.png', caption: 'Concrete slab footing and foundation works' }
    ],
    description: 'Magalela Trading & Projects is a NHBRC-registered building contractor. We construct new residential developments, complete home extensions, add double-story alterations, and perform commercial office updates with a focus on structural perfection and timely delivery.',
    specsTitle: 'Residential Building Options',
    specsHeaders: ['Component', 'Double Brick Cavity', 'Lightweight Steel Frame'],
    specsRows: [
      ['Thermal Insulation', 'Excellent (High thermal mass)', 'Good (Insulation blankets needed)'],
      ['Construction Speed', 'Standard (Brick drying times)', 'Fast (Drywall panel systems)'],
      ['Council Approval Ease', 'Very high (Traditional standards)', 'Medium (Special engineer reports needed)']
    ],
    sansTitle: 'NHBRC & SANS 10400 Building Foundation Compliance',
    sansRules: [
      { rule: 'Foundation Footings', desc: 'All foundations must be dug to load-bearing soil, reinforced with structural steel meshes, and signed off by a structural engineer prior to concrete pouring.' },
      { rule: 'Damp Proofing (DPC)', desc: 'Installing high-thickness plastic damp-proof membranes below the concrete slab and brick courses to prevent rising damp.' }
    ],
    process: [
      { step: '01', title: 'Plan Assessment & BOQ', desc: 'Detailed cost breakdown based on approved architectural drawings.' },
      { step: '02', title: 'Substructure Slabs', desc: 'Excavating foundation trenches, pouring 25MPa concrete, and setting floor slabs.' },
      { step: '03', title: 'Brickwork & Ring Beams', desc: 'Laying brick masonry, installing lintels, and pouring concrete ring beams for multi-story load distribution.' },
      { step: '04', title: 'Roofing, Plaster & Handover', desc: 'Erecting roof trusses, waterproofing, skimming walls, and obtaining occupancy certificates.' }
    ],
    caseStudy: {
      title: 'The Kyalami House Extension',
      location: 'Kyalami Estates, Midrand',
      scope: '120m² double-story bedroom and lounge extension to an existing residential house',
      timeline: '8 Weeks',
      budget: 'R380,000',
      description: 'We managed the entire build: matching the existing architectural style of the estate, laying new foundations, breaking through the existing double-brick walls safely with structural RSJ steel beams, and tiling/skimming walls to match the house perfectly.',
      clientQuote: '"Their workers were clean, reliable, and finished the project within the budget. Highly recommended NHBRC builder." - Robert S.'
    },
    faqs: [
      { q: 'Are you registered with the NHBRC?', a: 'Yes. All our building work is fully covered by NHBRC structural warranties.' }
    ],
    pricing: 'Based on construction BOQ',
    calcLabel: 'Building Area Size (m²)',
    calcRate: 7500
  },
  'architectural-design': {
    title: 'Architectural Design & Planning',
    subtitle: 'SANS-Compliant Construction Plans & Drawings',
    heroImage: '/images/navigation_layout.png',
    gallery: [
      { src: '/images/navigation_layout.png', caption: 'Technical floor plan layout' },
      { src: '/images/project_modern_house.png', caption: '3D architectural render of modern residence' }
    ],
    description: 'Every great build starts with a compliant, beautiful design. We provide architectural drafting services to produce detailed construction plans, 3D renderings, and municipal submission drawings. Our designs comply fully with SANS 10400 building regulations.',
    specsTitle: 'Design Deliverables comparison',
    specsHeaders: ['Deliverable', 'Conceptual 3D', 'Municipal Submission Package'],
    specsRows: [
      ['Visual Model', 'Yes (3D photorealistic images)', 'Yes (Includes technical 2D elevations)'],
      ['Council Approval Ready', 'No (Lacks site/drainage layouts)', 'Yes (Includes all drainage and boundary specs)'],
      ['Engineer Sign-off Include', 'No', 'Yes (Includes structural framing details)']
    ],
    sansTitle: 'SANS 10400 Architectural Compliance Regulations',
    sansRules: [
      { rule: 'Energy Efficiency (XA)', desc: 'All new plans must include fenestration (window) calculations ensuring compliance with SANS 10400-XA energy standards.' },
      { rule: 'Boundary Lines & Building Lines', desc: 'Structures must respect municipal building lines. If encroaching, we must file relaxation approvals with the local council.' }
    ],
    process: [
      { step: '01', title: 'Conceptual Briefing', desc: 'Understanding zoning restrictions, property layout, and client budget.' },
      { step: '02', title: '3D Design Rendering', desc: 'Creating photorealistic exterior concepts so the client can visualize before municipal submissions.' },
      { step: '03', title: 'Technical Drafting', desc: 'Drafting site plans, elevations, section details, and water drainage layouts.' },
      { step: '04', title: 'Council Submission', desc: 'Submitting plans via the local municipal portal (like e-Joburg) and tracking progress.' }
    ],
    caseStudy: {
      title: 'The Glen Austin Rezoning & Plan Approval',
      location: 'Glen Austin AH, Midrand',
      scope: 'Complete architectural package and council approval for a new 350m² dwelling and composite deck',
      timeline: '6 Weeks Drafting, 8 Weeks Municipal Approval',
      budget: 'R28,000',
      description: 'The property had historical zoning issues. We drafted compliant site layouts, resolved agricultural relaxation lines, secured engineering sign-offs for structural concrete slabs, and obtained council approvals.',
      clientQuote: '"Very knowledgeable about Joburg council processes. Saved us months of delays." - Thabo M.'
    },
    faqs: [
      { q: 'How long does council approval take?', a: 'Generally between 4 to 12 weeks, depending on the municipality and complexity of relaxation permissions.' }
    ],
    pricing: 'Drawing packages starting from R8,000',
    calcLabel: 'Planned Property Area (m²)',
    calcRate: 150
  }
};

export default function ServicePage({ serviceId, setView }) {
  const detail = serviceDetails[serviceId] || serviceDetails['composite-decking'];
  const [openFaq, setOpenFaq] = useState(null);
  
  // Interactive mini-calculator states
  const [calcInput, setCalcInput] = useState(25);
  const [calcSubframe, setCalcSubframe] = useState('standard');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Scroll to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
    setCalcInput(25); // reset calculator
    setCalcSubframe('standard');
    setActiveImageIdx(0);
  }, [serviceId]);

  // Pricing math for mini-calculator
  const baseCost = calcInput * detail.calcRate;
  const subframeUpgradeCost = calcSubframe === 'premium' ? calcInput * 350 : 0;
  const totalCalcEstimate = baseCost + subframeUpgradeCost;

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* 1. Service Hero Banner (Full Screen Cinematic Background) */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img src={detail.heroImage} alt={detail.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-deep) 0%, transparent 100%), linear-gradient(to right, rgba(5,5,5,0.8) 0%, transparent 100%)' }}></div>
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'left', width: '100%' }}>
          <span className="badge fade-in-up active" style={{ color: 'var(--accent-secondary)' }}>{detail.subtitle}</span>
          <h1 className="hero-title fade-in-up active" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', textAlign: 'left', margin: '10px 0 30px', background: 'linear-gradient(to bottom, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.04em' }}>{detail.title}</h1>
          <button 
            onClick={() => setView('landing')} 
            style={{ color: '#fff', fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-glass)', padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--border-glass)' }}
            className="fade-in-up active"
          >
            ← Back to All Services
          </button>
        </div>
      </section>

      {/* 2. Main Description Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginBottom: '24px' }}>Overview & Scope</h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
                {detail.description}
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                All of our outdoor building structures are completely custom-made. By managing everything from site surveys to engineering compliance, our building crews ensure SANS 10400 regulations are followed to the letter, adding long-lasting value to your residential or commercial property.
              </p>
            </div>
            
            {/* Quick Summary Card */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '32px', backdropFilter: 'var(--glass-blur)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Investment Guide</span>
              <h3 style={{ fontSize: '2rem', color: '#fff', margin: '8px 0 16px', fontWeight: 800 }}>{detail.pricing}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>*Approximate build pricing for South African standard residential specifications. Excludes custom structural engineers report if needed.</p>
              <button onClick={() => setView('quote')} className="btn btn-primary" style={{ width: '100%' }}>Book Site Survey</button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Multi-Image Gallery Showcase */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
        <div className="container">
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Project Visual Gallery</h2>
          <p className="section-desc text-center" style={{ marginBottom: '50px' }}>Explore some of our recently completed builds for this service across Gauteng.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '30px' }}>
            
            {/* Large Active Image View */}
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '480px', border: '1px solid var(--border-glass)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <img src={detail.gallery[activeImageIdx]?.src} alt="Active Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '24px', color: '#fff' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{detail.gallery[activeImageIdx]?.caption}</p>
              </div>
            </div>
            
            {/* Thumbnail Selectors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {detail.gallery.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  style={{
                    height: '148px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: idx === activeImageIdx ? '3px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                    transition: 'var(--transition)',
                    opacity: idx === activeImageIdx ? 1 : 0.6
                  }}
                  onMouseEnter={(e) => { if(idx !== activeImageIdx) e.currentTarget.style.opacity = '0.9' }}
                  onMouseLeave={(e) => { if(idx !== activeImageIdx) e.currentTarget.style.opacity = '0.6' }}
                >
                  <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Specifications Comparison Table */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{detail.specsTitle}</h2>
          <p className="section-desc text-center" style={{ marginBottom: '50px' }}>Make informed decisions by comparing different building and material grades.</p>
          
          <div style={{ overflowX: 'auto', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '24px', backdropFilter: 'var(--glass-blur)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                  {detail.specsHeaders.map((header, idx) => (
                    <th key={idx} style={{ padding: '16px', fontWeight: 700, color: idx === 0 ? 'var(--text-primary)' : 'var(--accent-secondary)' }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detail.specsRows.map((row, rowIdx) => (
                  <tr key={rowIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} style={{ padding: '18px 16px', color: cellIdx === 0 ? '#fff' : 'var(--text-secondary)', fontSize: '0.95rem' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Live Material Cost Estimator Slider (Interactive) */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge" style={{ color: 'var(--accent-primary)' }}>Live Estimate Widget</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Quick Estimator</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>Drag the sliders below to get a rough cost assessment based on size specs.</p>
          </div>

          <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', backdropFilter: 'var(--glass-blur)' }}>
            
            {/* Input Slider */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontSize: '1rem', fontWeight: 600 }}>{detail.calcLabel}</label>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{calcInput} units</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="250" 
                step="5"
                value={calcInput} 
                onChange={(e) => setCalcInput(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Selector Options */}
            <div style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '1rem', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Subframe / Foundation Spec</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <button 
                  onClick={() => setCalcSubframe('standard')}
                  style={{
                    padding: '16px',
                    background: calcSubframe === 'standard' ? 'rgba(255, 94, 0, 0.1)' : 'rgba(0,0,0,0.3)',
                    border: calcSubframe === 'standard' ? '2px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: '#fff',
                    textAlign: 'left',
                    transition: 'var(--transition)'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>Standard</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>H3 Treated Structural Pine base framework</span>
                </button>
                <button 
                  onClick={() => setCalcSubframe('premium')}
                  style={{
                    padding: '16px',
                    background: calcSubframe === 'premium' ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0,0,0,0.3)',
                    border: calcSubframe === 'premium' ? '2px solid var(--accent-secondary)' : '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: '#fff',
                    textAlign: 'left',
                    transition: 'var(--transition)'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px', color: 'var(--accent-secondary)' }}>Galvanised Steel (+R350/unit)</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Heavy-duty structural rustproof steel framing</span>
                </button>
              </div>
            </div>

            {/* Result Panel */}
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Budgetary Cost Projection:</span>
                <h3 style={{ fontSize: '2.2rem', color: 'var(--accent-primary)', fontWeight: 800, marginTop: '4px' }}>R {totalCalcEstimate.toLocaleString()}*</h3>
              </div>
              <button 
                onClick={() => {
                  localStorage.setItem('magalela_hero_prompt', `Build a ${calcInput} size ${detail.title} with a ${calcSubframe} structural base`);
                  setView('calculator');
                }} 
                className="btn btn-primary"
              >
                Refine Estimate →
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px', textAlign: 'right' }}>*Estimate excludes VAT & site earthmoving variables. Valid for Gauteng region.</p>

          </div>
        </div>
      </section>

      {/* 6. SANS 10400 Building Compliance Section */}
      <section className="section-padding" style={{ background: 'rgba(255, 94, 0, 0.02)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '50px', alignItems: 'center' }}>
            <div>
              <span className="badge" style={{ color: 'var(--accent-secondary)' }}>National Building Regulations</span>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>SANS Compliance</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                All decking and pool engineering in South Africa must strictly adhere to the National Building Regulations. Constructing non-compliant outdoor structures can result in council fines, estate removal notices, and severe safety liabilities.
              </p>
              <div style={{ padding: '16px', background: 'rgba(0, 229, 255, 0.05)', borderLeft: '4px solid var(--accent-secondary)', borderRadius: '0 8px 8px 0', fontSize: '0.9rem', color: '#fff' }}>
                🛡️ <strong>NHBRC Registered Builder:</strong> Our registration guarantees structural elements are built to SANS specifications.
              </div>
            </div>
            
            {/* Rules Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {detail.sansRules.map((rule, idx) => (
                <div key={idx} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '16px', padding: '24px', backdropFilter: 'var(--glass-blur)' }}>
                  <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', marginBottom: '8px', fontWeight: 600 }}>{rule.rule}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Case Study Section */}
      <section className="section-padding" style={{ background: 'rgba(5, 5, 5, 0.8)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Case Study Feature</h2>
          <p className="section-desc text-center" style={{ marginBottom: '50px' }}>Real projects constructed and signed off in South Africa.</p>
          
          <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '40px', backdropFilter: 'var(--glass-blur)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Featured Project</span>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginTop: '4px' }}>{detail.caseStudy.title}</h3>
              </div>
              <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <div>📍 <strong>Location:</strong> {detail.caseStudy.location}</div>
                <div>⏱️ <strong>Duration:</strong> {detail.caseStudy.timeline}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', marginBottom: '32px' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '12px' }}>Project Scope:</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>{detail.caseStudy.scope}</p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{detail.caseStudy.description}</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  {detail.caseStudy.clientQuote}
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 700 }}>Verified Customer Review</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-glass)', fontSize: '0.9rem' }}>
              <div>💰 <strong>Project Budget:</strong> {detail.caseStudy.budget}</div>
              <div>🏗️ <strong>Contractor:</strong> Magalela Trading (Turnkey)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Our Construction Process Timeline */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
        <div className="container">
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Our Construction Process</h2>
          <p className="section-desc text-center" style={{ marginBottom: '60px' }}>Step-by-step layout of how we execute from blueprint to handover.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
            {detail.process.map((p, i) => (
              <div key={i} style={{ position: 'relative', padding: '32px 24px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', backdropFilter: 'var(--glass-blur)' }}>
                <span style={{ position: 'absolute', top: '-20px', left: '24px', fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.7 }}>{p.step}</span>
                <h4 style={{ fontSize: '1.2rem', marginTop: '16px', marginBottom: '12px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', color: '#fff' }}>{p.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQs Accordion */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Service Specifications FAQs</h2>
          <p className="section-desc text-center" style={{ marginBottom: '50px' }}>Get immediate answers regarding building regulations, costs, and durability.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {detail.faqs.map((faq, i) => (
              <div key={i} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backdropFilter: 'var(--glass-blur)' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}
                >
                  {faq.q}
                  <span style={{ color: 'var(--accent-primary)', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'var(--transition)', fontSize: '1.5rem', fontWeight: 300 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 24px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action Section */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--border-glass)' }}>
        <div className="container text-center">
          <div style={{ background: 'linear-gradient(135deg, var(--bg-glass), rgba(0,102,255,0.15))', border: '1px solid var(--accent-primary)', padding: '80px 20px', borderRadius: 'var(--radius-lg)', boxShadow: '0 30px 60px rgba(0,102,255,0.2)', backdropFilter: 'var(--glass-blur)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Ready to Build Your Outdoor Oasis?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.1rem', lineHeight: 1.7 }}>Contact our Midrand estimation office today. We will set up a site inspection and provide a fully engineered architectural proposal.</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => {
                  if (serviceId === 'composite-decking') setView('calculator');
                  else setView('quote');
                }} 
                className="btn btn-primary"
                style={{ padding: '18px 40px', fontSize: '1.1rem' }}
              >
                {detail.ctaText}
              </button>
              <button onClick={() => setView('contact')} className="btn btn-secondary" style={{ padding: '18px 40px', fontSize: '1.1rem' }}>Contact Sales Team</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
