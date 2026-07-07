import React, { useState } from 'react';

const careGuidelines = {
  laser: {
    title: 'Laser Hair Removal Guidelines',
    pre: [
      'Shave the target area 24 hours before treatment (do not wax, pluck, or thread).',
      'Avoid sun exposure, tanning beds, and self-tanners for 14 days prior.',
      'Ensure the treatment zone is free of lotion, makeup, oils, and deodorant.',
      'Discontinue chemical peels or active exfoliating acids on the zone for 7 days.'
    ],
    post: [
      'Apply pure aloe vera gel to soothe localized heat sensations.',
      'Avoid hot tubs, saunas, steam rooms, and hot showers for 24 hours.',
      'Wear broad-spectrum SPF 30+ daily and avoid direct sunlight on the treated area.',
      'Do not scratch, pick, or forcibly exfoliate shedding hairs.'
    ]
  },
  ipl: {
    title: 'IPL Photo Facial Guidelines',
    pre: [
      'Avoid direct UV exposure and tanning beds for 4 weeks prior.',
      'Discontinue topical retinols, retinoids, and glycolic acids 5 days before.',
      'Do not perform chemical peels or microdermabrasion for 14 days prior.',
      'Inform us of any new light-sensitizing medications.'
    ],
    post: [
      'Expect pigmented spots to darken (resembling coffee grounds) and flake off in 3-7 days.',
      'Do not pick, scrub, or use physical exfoliators on the darkening lesions.',
      'Wear SPF 50+ hourly and wear a wide-brimmed hat when outdoors.',
      'Avoid heavy workouts or excessive sweating for 24 hours.'
    ]
  },
  fillers: {
    title: 'Dermal Fillers Guidelines',
    pre: [
      'Avoid NSAIDs (like Ibuprofen, Aspirin) for 5 days to minimize bruising risk.',
      'Do not consume alcohol for 24 hours prior to injections.',
      'Ensure no active facial infections (like cold sores) exist; contact us if so.',
      'Take Arnica supplements 2 days before to reduce swelling (optional).'
    ],
    post: [
      'Apply a cool compress gently for 10-minute intervals to reduce swelling.',
      'Do not massage, rub, or apply pressure to the injected sites for 48 hours.',
      'Sleep on your back with head elevated for the first 2 nights.',
      'Avoid strenuous exercise and high-heat environments for 24 hours.'
    ]
  }
};

export default function PreCare() {
  const [activeTab, setActiveTab] = useState('laser');
  const [checkedPre, setCheckedPre] = useState({});
  const [checkedPost, setCheckedPost] = useState({});

  const currentCare = careGuidelines[activeTab];

  const handleTogglePre = (index) => {
    setCheckedPre({
      ...checkedPre,
      [`${activeTab}-${index}`]: !checkedPre[`${activeTab}-${index}`]
    });
  };

  const handleTogglePost = (index) => {
    setCheckedPost({
      ...checkedPost,
      [`${activeTab}-${index}`]: !checkedPost[`${activeTab}-${index}`]
    });
  };

  return (
    <section className="about-section section-padding" id="precare" style={{ backgroundColor: 'var(--color-bg-deep)' }}>
      <div className="container">
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Patient Education</span>
          <h2 className="section-title">Clinical Preparation & Recovery</h2>
          <p className="section-desc">Safety is our primary objective. Select a treatment below to view, check off, and verify your pre-appointment checklist and post-treatment recovery steps.</p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeTab === 'laser' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('laser')}
            style={{ padding: '10px 24px', fontSize: '0.85rem' }}
          >
            Laser Hair Removal
          </button>
          <button 
            className={`btn ${activeTab === 'ipl' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('ipl')}
            style={{ padding: '10px 24px', fontSize: '0.85rem' }}
          >
            IPL Photo Facial
          </button>
          <button 
            className={`btn ${activeTab === 'fillers' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('fillers')}
            style={{ padding: '10px 24px', fontSize: '0.85rem' }}
          >
            Dermal Fillers
          </button>
        </div>

        {/* Guidelines Box */}
        <div className="booking-form-box fade-in-up active" style={{ minHeight: 'auto', padding: '40px' }}>
          <h3 className="form-step-title" style={{ textAlign: 'center', marginBottom: '40px', fontFamily: 'var(--font-heading)' }}>
            {currentCare.title}
          </h3>

          <div className="precare-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Pre-Care checklist */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold-base)', marginBottom: '20px', fontSize: '1.25rem' }}>
                Pre-Care Checklist
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentCare.pre.map((item, idx) => {
                  const isChecked = !!checkedPre[`${activeTab}-${idx}`];
                  return (
                    <li 
                      key={idx} 
                      onClick={() => handleTogglePre(idx)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '12px', 
                        cursor: 'pointer',
                        color: isChecked ? 'var(--color-text-muted)' : 'var(--color-text-sec)',
                        textDecoration: isChecked ? 'line-through' : 'none',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        readOnly 
                        style={{ marginTop: '5px', accentColor: 'var(--color-gold-base)', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.9rem' }}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Post-Care checklist */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)', marginBottom: '20px', fontSize: '1.25rem' }}>
                Post-Care Recovery
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentCare.post.map((item, idx) => {
                  const isChecked = !!checkedPost[`${activeTab}-${idx}`];
                  return (
                    <li 
                      key={idx} 
                      onClick={() => handleTogglePost(idx)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '12px', 
                        cursor: 'pointer',
                        color: isChecked ? 'var(--color-text-muted)' : 'var(--color-text-sec)',
                        textDecoration: isChecked ? 'line-through' : 'none',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        readOnly 
                        style={{ marginTop: '5px', accentColor: 'var(--color-gold-base)', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.9rem' }}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
