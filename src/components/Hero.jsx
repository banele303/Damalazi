import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg" style={{ backgroundImage: "url('/images/hero_bg.png')" }}></div>
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content fade-in-up active">
          <span className="badge">Luxury Medical Spa · Forest Town, Johannesburg</span>
          <h1 className="hero-title">Enhancing Your <span className="text-glow">Natural Beauty</span></h1>
          <p className="hero-subtitle">
            MASA Medical Aesthetic Spa Africa — Johannesburg's premier destination for advanced skincare, wellness, ethnic hair restoration & transplants, and medical-grade aesthetic treatments tailored to your unique skin.
          </p>
          <div className="hero-ctas">
            <a href="#booking" className="btn btn-primary">Book a Consultation</a>
            <a href="#services" className="btn btn-secondary">Explore Treatments</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">4,689</span>
              <span className="hero-stat-label">Followers</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">215+</span>
              <span className="hero-stat-label">Treatments Shared</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">5★</span>
              <span className="hero-stat-label">Client Rating</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="mouse">
          <span className="wheel"></span>
        </span>
        <span className="arrow-down"></span>
      </div>
    </section>
  );
}
