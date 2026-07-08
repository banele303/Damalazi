import React from 'react';

export default function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Our Philosophy</span>
          <h2 className="section-title">Where Wellness Meets Artistry</h2>
          <p className="section-desc">At MASA Medical Aesthetic Spa Africa, we believe beauty is deeply personal. Nestled in the lush suburb of Forest Town, Johannesburg, our luxury medical spa combines advanced clinical science with bespoke wellness care to enhance your natural beauty — on your terms.</p>
        </div>
        
        <div className="about-grid">
          <div className="about-card fade-in-up active">
            <div className="about-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m12 6-3 6h6l-3 6"/></svg>
            </div>
            <h3>Advanced Skincare Science</h3>
            <p>We harness medical-grade technology and evidence-based protocols to deliver transformative results across all skin tones, with a special expertise in melanin-rich African skin.</p>
          </div>
          
          <div className="about-card fade-in-up active" style={{ transitionDelay: '0.1s' }}>
            <div className="about-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>Ethnic Hair Restoration</h3>
            <p>Pioneers in ethnic hair restoration and transplantation in South Africa. Our specialists understand the unique growth patterns and structure of African, mixed-race, and textured hair types.</p>
          </div>
          
          <div className="about-card fade-in-up active" style={{ transitionDelay: '0.2s' }}>
            <div className="about-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <h3>Luxury Spa Wellness</h3>
            <p>Every visit to our Forest Town sanctuary is a holistic experience — from personalised treatment plans crafted by our practitioners to the serene ambiance designed to restore mind and body.</p>
          </div>
        </div>

        <div className="about-location-card fade-in-up active">
          <div className="about-location-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <p className="about-location-label">Visit Us</p>
            <p className="about-location-address">1 Torwood Road, Forest Town, Randburg 2193, Johannesburg</p>
          </div>
          <a href="#booking" className="btn btn-secondary" style={{ marginLeft: 'auto', flexShrink: 0 }}>Get Directions</a>
        </div>
      </div>
    </section>
  );
}
