import React, { useState, useEffect } from 'react';

const SERVICES_LIST = [
  { id: 'swimming-pool', name: 'Swimming Pool Construction' },
  { id: 'outdoor-development', name: 'Outdoor Development' },
  { id: 'pergolas', name: 'Pergolas & Gazebos' },
  { id: 'building-construction', name: 'Building Construction' },
  { id: 'architectural-design', name: 'Architectural Design' },
  { id: 'composite-decking', name: 'Composite Decking' }
];

export default function QuoteRequest({ quoteData, setQuoteData }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: 'composite-decking',
    dimensions: '',
    materialPreference: 'composite',
    siteAccess: 'easy',
    additionalDetails: '',
    fullname: '',
    email: '',
    phone: '',
    city: 'Johannesburg',
    siteVisitDate: '',
    agree: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync calculator data if passed
  useEffect(() => {
    if (quoteData) {
      setFormData(prev => ({
        ...prev,
        fullname: quoteData.name || prev.fullname,
        email: quoteData.email || prev.email,
        phone: quoteData.phone || prev.phone,
        city: quoteData.city || prev.city,
        dimensions: quoteData.details || prev.dimensions,
        additionalDetails: quoteData.estimatedCost 
          ? `Estimated Total from Calculator: R${quoteData.estimatedCost.toLocaleString()}. Configs: ${quoteData.details}` 
          : prev.additionalDetails
      }));
    }
  }, [quoteData]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.service) {
      alert('Please select a service.');
      return;
    }
    if (step === 2 && !formData.dimensions && formData.service !== 'architectural-design') {
      alert('Please specify your project size or details.');
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.phone || !formData.agree) {
      alert('Please fill in all contact details and agree to terms.');
      return;
    }
    console.log('Quote requested:', formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      service: 'composite-decking',
      dimensions: '',
      materialPreference: 'composite',
      siteAccess: 'easy',
      additionalDetails: '',
      fullname: '',
      email: '',
      phone: '',
      city: 'Johannesburg',
      siteVisitDate: '',
      agree: false
    });
    if (setQuoteData) setQuoteData(null);
    setIsSubmitted(false);
  };

  return (
    <section className="booking-section section-padding" id="booking">
      <div className="container booking-container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
        
        {/* Contact Info Sidebar */}
        <div className="booking-details fade-in-up active">
          <span className="badge">Get in Touch</span>
          <h2 className="section-title">Request a Consultation</h2>
          <p className="booking-intro">
            Submit your project specifications or request a site inspection. Our engineering and estimation team based in Midrand services the wider Gauteng region daily, with project managers in Cape Town and Durban.
          </p>
          
          <div className="contact-details" style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
            <div className="contact-item" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div className="contact-icon" style={{ color: 'var(--color-gold-base)', width: '40px', height: '40px', background: 'rgba(29,83,160,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.1-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div>
                <h5 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>Call Our Estimators</h5>
                <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-sec)', fontSize: '0.9rem' }}>+27 87 510 1772</p>
              </div>
            </div>
            
            <div className="contact-item" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div className="contact-icon" style={{ color: 'var(--color-gold-base)', width: '40px', height: '40px', background: 'rgba(29,83,160,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <div>
                <h5 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>Email Project Office</h5>
                <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-sec)', fontSize: '0.9rem' }}>info@magalelatrading.co.za</p>
              </div>
            </div>

            <div className="contact-item" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div className="contact-icon" style={{ color: 'var(--color-gold-base)', width: '40px', height: '40px', background: 'rgba(29,83,160,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <h5 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>Operating Hours</h5>
                <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-sec)', fontSize: '0.9rem' }}>Mon - Fri: 08:00 - 17:00 | Sat: 09:00 - 13:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Form Panel */}
        <div className="booking-card fade-in-up active">
          {isSubmitted ? (
            <div className="booking-success active" style={{ display: 'block', padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#22c55e', fontSize: '2rem', marginBottom: '24px' }}>✓</div>
              <h3>Consultation Request Submitted</h3>
              <p style={{ color: 'var(--color-text-sec)', margin: '16px 0 24px 0', lineHeight: 1.6 }}>
                Thank you for choosing Magalela Trading & Projects. Your request has been logged. A project manager will contact you at {formData.phone} or {formData.email} to confirm details and coordinate a site inspection.
              </p>
              <button onClick={handleReset} className="btn btn-primary" style={{ cursor: 'pointer' }}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="booking-form-wrapper" style={{ padding: '32px' }}>
              
              {/* Form Steps Header */}
              <div className="booking-steps" style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                <span className={`step-dot ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</span>
                <span className={`step-dot ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</span>
                <span className={`step-dot ${step === 3 ? 'active' : ''}`}>3</span>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Select Service */}
                {step === 1 && (
                  <div className="form-step active">
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '20px' }}>What service do you need?</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {SERVICES_LIST.map((srv) => (
                        <label 
                          key={srv.id} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            padding: '16px', 
                            background: formData.service === srv.id ? 'rgba(29,83,160,0.15)' : 'rgba(255,255,255,0.02)', 
                            border: formData.service === srv.id ? '1px solid var(--color-gold-base)' : '1px solid var(--color-border)', 
                            borderRadius: '8px', 
                            cursor: 'pointer',
                            transition: 'var(--transition-fast)'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="service" 
                            id="service"
                            value={srv.id} 
                            checked={formData.service === srv.id}
                            onChange={handleInputChange}
                            style={{ width: '18px', height: '18px', accentColor: 'var(--color-gold-base)' }}
                          />
                          <span style={{ color: '#fff', fontWeight: 600 }}>{srv.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Specifications */}
                {step === 2 && (
                  <div className="form-step active">
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '20px' }}>Project Specifications</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label htmlFor="dimensions" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-sec)', marginBottom: '8px' }}>
                          Approximate Dimensions (e.g., 6m x 4m or 24m² pool)
                        </label>
                        <input 
                          type="text" 
                          id="dimensions" 
                          placeholder="e.g. 8m long, 3m wide, low level" 
                          required={formData.service !== 'architectural-design'}
                          value={formData.dimensions}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                        />
                      </div>

                      <div>
                        <label htmlFor="materialPreference" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-sec)', marginBottom: '8px' }}>
                          Material Preference
                        </label>
                        <select 
                          id="materialPreference" 
                          value={formData.materialPreference}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '12px', background: 'var(--color-bg-sec)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                        >
                          <option value="composite">Eco Composite Boards (Low Maintenance)</option>
                          <option value="garapa">Garapa Hardwood (Premium Wood)</option>
                          <option value="balau">Balau Hardwood (Classic Timber)</option>
                          <option value="pine">Treated structural Pine (Budget option)</option>
                          <option value="concrete-marbelite">Concrete shell with Marbelite (Pools)</option>
                          <option value="fibreglass">Pre-formed Fibreglass Shell (Pools)</option>
                          <option value="other">Not Sure / Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="additionalDetails" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-sec)', marginBottom: '8px' }}>
                          Describe Your Project Goals
                        </label>
                        <textarea 
                          id="additionalDetails" 
                          rows="4" 
                          placeholder="Include details about slopes, access, pergolas needed, or existing structures to remove..." 
                          value={formData.additionalDetails}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff', fontFamily: 'inherit', resize: 'vertical' }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact & Visit Booking */}
                {step === 3 && (
                  <div className="form-step active">
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '20px' }}>Contact & Scheduling</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <input 
                        type="text" 
                        id="fullname" 
                        placeholder="Full Name" 
                        required 
                        value={formData.fullname}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                      />
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="Email Address" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                      />
                      <input 
                        type="tel" 
                        id="phone" 
                        placeholder="Phone Number" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                      />
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label htmlFor="city" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-sec)', marginBottom: '6px' }}>City / Region</label>
                          <select 
                            id="city" 
                            value={formData.city}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '12px', background: 'var(--color-bg-sec)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                          >
                            <option value="Johannesburg">Johannesburg / Midrand</option>
                            <option value="Pretoria">Pretoria / Centurion</option>
                            <option value="Cape Town">Cape Town</option>
                            <option value="Durban">Durban / Umhlanga</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="siteVisitDate" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-sec)', marginBottom: '6px' }}>Site Visit Target Date</label>
                          <input 
                            type="date" 
                            id="siteVisitDate" 
                            value={formData.siteVisitDate}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                          />
                        </div>
                      </div>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-text-sec)', cursor: 'pointer', marginTop: '8px' }}>
                        <input 
                          type="checkbox" 
                          id="agree" 
                          required 
                          checked={formData.agree}
                          onChange={handleInputChange}
                          style={{ width: '18px', height: '18px', accentColor: 'var(--color-gold-base)' }}
                        />
                        I agree to receive project consultations and site visit updates.
                      </label>
                    </div>
                  </div>
                )}

                {/* Form Navigation Controls */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                  {step > 1 && (
                    <button 
                      type="button" 
                      onClick={handlePrev} 
                      className="btn btn-secondary"
                      style={{ cursor: 'pointer', padding: '10px 20px', fontSize: '0.9rem' }}
                    >
                      ← Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button 
                      type="button" 
                      onClick={handleNext} 
                      className="btn btn-primary"
                      style={{ cursor: 'pointer', padding: '10px 24px', fontSize: '0.9rem' }}
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={{ cursor: 'pointer', padding: '10px 28px', fontSize: '0.9rem' }}
                    >
                      Submit Consultation Request
                    </button>
                  )}
                </div>

              </form>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
