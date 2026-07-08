import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="logo">
            <span className="logo-accent">MASA</span>
            <span style={{ fontSize: '0.6em', display: 'block', letterSpacing: '0.15em', fontWeight: 400, opacity: 0.7, lineHeight: 1, textDecoration: 'none' }}>MEDICAL AESTHETIC SPA</span>
          </a>
          <p className="footer-desc">Luxury medical spa in Forest Town, Johannesburg. Enhancing your natural beauty through advanced skincare, wellness, ethnic hair restoration and transplants.</p>
          <div className="footer-address">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>1 Torwood Road, Forest Town, Randburg 2193</span>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/masaaesthetics" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Treatments</h4>
          <ul>
            <li><a href="#services">Laser Hair Removal</a></li>
            <li><a href="#services">Ethnic Hair Restoration</a></li>
            <li><a href="#services">Hair Transplants</a></li>
            <li><a href="#services">IPL Photo Facials</a></li>
            <li><a href="#services">Skin Tightening</a></li>
            <li><a href="#services">Chemical Peels</a></li>
            <li><a href="#services">Dermal Fillers</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Spa</h4>
          <ul>
            <li><a href="#about">Our Philosophy</a></li>
            <li><a href="#before-after">Results Gallery</a></li>
            <li><a href="#quiz">Skin Analysis Quiz</a></li>
            <li><a href="#precare">Pre & Post Care</a></li>
            <li><a href="#blog">Wellness Journal</a></li>
            <li><a href="#booking">Book Appointment</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Connected</h4>
          <p>Subscribe for exclusive wellness tips, treatment news, and MASA spa offers.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              aria-label="Email address" 
            />
            <button type="submit" aria-label="Subscribe">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <div className={`newsletter-success ${isSubscribed ? 'active' : ''}`}>
            Thank you for subscribing to MASA!
          </div>
          <div className="footer-contact">
            <p>📞 <a href="tel:+27112341234">+27 11 234 1234</a></p>
            <p>✉️ <a href="mailto:hello@masaaesthetics.co.za">hello@masaaesthetics.co.za</a></p>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 MASA Medical Aesthetic Spa Africa. All rights reserved. Medical procedures require consultation.</p>
        <div className="bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
