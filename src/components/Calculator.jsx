import React, { useState } from 'react';

const MATERIAL_PRICES = {
  'premium-composite': { name: 'Premium Composite (Eva-Last/MoistureShield)', rate: 2200, desc: 'Ultra-durable, heavy-duty cap stock composite, 25-year warranty.' },
  'standard-composite': { name: 'Standard Composite', rate: 1700, desc: 'Excellent low-maintenance value with 15-year warranty.' },
  'balau-hardwood': { name: 'Balau Wood (Hardwood)', rate: 1900, desc: 'Classic, highly dense natural timber with deep reddish-brown tones.' },
  'garapa-hardwood': { name: 'Garapa Wood (Hardwood)', rate: 1800, desc: 'Premium golden timber, extremely durable and rot-resistant.' },
  'treated-pine': { name: 'Treated Pine (Softwood)', rate: 1100, desc: 'Cost-effective natural timber, pressure-treated against termites.' }
};

const SUBFRAME_PRICES = {
  'pine': { name: 'Treated Structural Pine (Standard)', rate: 0 },
  'steel': { name: 'Galvanised Steel (Premium Rustproof)', rate: 350 }
};

const ELEVATION_PRICES = {
  'low': { name: 'Low Level (<0.5m elevation)', rate: 0 },
  'medium': { name: 'Elevated (0.5m - 1.5m)', rate: 200 },
  'high': { name: 'High Elevated (>1.5m, SANS compliant engineering)', rate: 450 }
};

export default function Calculator({ setView, setQuoteData }) {
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);
  const [material, setMaterial] = useState('premium-composite');
  const [subframe, setSubframe] = useState('pine');
  const [elevation, setElevation] = useState('low');
  const [hasBalustrades, setHasBalustrades] = useState(false);
  const [balustradeLength, setBalustradeLength] = useState(0);
  const [hasPergola, setHasPergola] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Client Details Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Johannesburg');

  // Math
  const area = length * width;
  const materialRate = MATERIAL_PRICES[material].rate;
  const subframeRate = SUBFRAME_PRICES[subframe].rate;
  const elevationRate = ELEVATION_PRICES[elevation].rate;

  const baseMaterialCost = area * materialRate;
  const subframeCost = area * subframeRate;
  const elevationCost = area * elevationRate;
  const balustradeCost = hasBalustrades ? balustradeLength * 1350 : 0;
  const pergolaCost = hasPergola ? 16500 : 0;
  
  // Labor is estimated at roughly 30% of structural & material totals
  const laborCost = Math.round((baseMaterialCost + subframeCost + elevationCost) * 0.3);
  const totalCost = baseMaterialCost + subframeCost + elevationCost + balustradeCost + pergolaCost + laborCost;

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      if (setQuoteData) {
        setQuoteData({
          name, email, phone, city,
          details: `${length}m x ${width}m (${area}m²) ${MATERIAL_PRICES[material].name} deck, ${SUBFRAME_PRICES[subframe].name} subframe, ${ELEVATION_PRICES[elevation].name}. Extras: Balustrades: ${hasBalustrades ? balustradeLength + 'm' : 'No'}, Pergola: ${hasPergola ? 'Yes' : 'No'}.`,
          estimatedCost: totalCost
        });
      }
      setSubmitted(true);
    }
  };

  return (
    <section className="calculator-section section-padding" id="calculator">
      <div className="container">
        
        <div className="section-header text-center fade-in-up active">
          <span className="badge">Cost Estimator</span>
          <h2 className="section-title">Interactive Deck Calculator</h2>
          <p className="section-desc">Estimate the cost of your pool surround or outdoor decking project in ZAR. Choose your dimensions, materials, and configurations below.</p>
        </div>

        <div className="tool-grid">
          
          {/* Calculator Inputs */}
          <div className="tool-panel">
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>Configure Your Deck</h3>
            
            {/* Dimensions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label>Length (meters)</label>
                <input type="number" min="1" max="50" value={length} onChange={(e) => setLength(parseFloat(e.target.value) || 0)} />
              </div>
              <div>
                <label>Width (meters)</label>
                <input type="number" min="1" max="50" value={width} onChange={(e) => setWidth(parseFloat(e.target.value) || 0)} />
              </div>
            </div>

            {/* Material */}
            <div style={{ marginBottom: '24px' }}>
              <label>Decking Material</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)}>
                {Object.keys(MATERIAL_PRICES).map(key => (
                  <option key={key} value={key}>{MATERIAL_PRICES[key].name} - R{MATERIAL_PRICES[key].rate}/m²</option>
                ))}
              </select>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '8px' }}>{MATERIAL_PRICES[material].desc}</p>
            </div>

            {/* Subframe */}
            <div style={{ marginBottom: '24px' }}>
              <label>Support Subframe</label>
              <div className="checkbox-grid">
                {Object.keys(SUBFRAME_PRICES).map(key => (
                  <label key={key} className="custom-checkbox">
                    <input type="radio" name="subframe" checked={subframe === key} onChange={() => setSubframe(key)} />
                    {SUBFRAME_PRICES[key].name}
                  </label>
                ))}
              </div>
            </div>

            {/* Elevation */}
            <div style={{ marginBottom: '24px' }}>
              <label>Deck Elevation Height</label>
              <select value={elevation} onChange={(e) => setElevation(e.target.value)}>
                {Object.keys(ELEVATION_PRICES).map(key => (
                  <option key={key} value={key}>{ELEVATION_PRICES[key].name} {ELEVATION_PRICES[key].rate > 0 && `(+R${ELEVATION_PRICES[key].rate}/m²)`}</option>
                ))}
              </select>
            </div>

            {/* Balustrades */}
            <div style={{ marginBottom: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
              <label className="custom-checkbox" style={{ marginBottom: '12px' }}>
                <input type="checkbox" checked={hasBalustrades} onChange={(e) => setHasBalustrades(e.target.checked)} />
                Include Safety Balustrades (+R1,350/m)
              </label>
              {hasBalustrades && (
                <div>
                  <label>Total Balustrade Length (meters)</label>
                  <input type="number" min="1" max="100" value={balustradeLength} onChange={(e) => setBalustradeLength(parseFloat(e.target.value) || 0)} />
                </div>
              )}
            </div>

            {/* Pergola */}
            <div style={{ marginBottom: '10px' }}>
              <label className="custom-checkbox">
                <input type="checkbox" checked={hasPergola} onChange={(e) => setHasPergola(e.target.checked)} />
                Include Shading Timber Pergola (+R16,500 flat)
              </label>
            </div>

          </div>

          {/* Calculator Results & Quote Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Cost Breakdown Card */}
            <div className="tool-panel" style={{ borderColor: 'var(--accent-primary)', boxShadow: '0 12px 30px rgba(255, 94, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-primary)', marginBottom: '20px' }}>Estimated Cost Breakdown</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <span>Decking Area:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{area} m²</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <span>Boards ({MATERIAL_PRICES[material].name}):</span>
                  <span style={{ color: '#fff' }}>R {baseMaterialCost.toLocaleString()}</span>
                </div>
                {subframeCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span>Subframe Upgrade (Galvanized):</span>
                    <span style={{ color: '#fff' }}>R {subframeCost.toLocaleString()}</span>
                  </div>
                )}
                {elevationCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span>Elevation Framework:</span>
                    <span style={{ color: '#fff' }}>R {elevationCost.toLocaleString()}</span>
                  </div>
                )}
                {balustradeCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span>Safety Balustrades ({balustradeLength}m):</span>
                    <span style={{ color: '#fff' }}>R {balustradeCost.toLocaleString()}</span>
                  </div>
                )}
                {pergolaCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span>Timber Pergola (3x3m):</span>
                    <span style={{ color: '#fff' }}>R {pergolaCost.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <span>Carpentry Labor & Installation:</span>
                  <span style={{ color: '#fff' }}>R {laborCost.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>Total Estimate:</span>
                <span style={{ fontSize: '2rem', color: 'var(--accent-secondary)', fontWeight: 800 }}>R {totalCost.toLocaleString()}*</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'right' }}>*Excludes VAT. Subject to site inspection.</p>
            </div>

            {/* Formal Quote Request Form */}
            <div className="tool-panel">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', margin: '0 auto 16px', justifyContent: 'center', color: '#22c55e', fontSize: '2rem' }}>✓</div>
                  <h4 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '10px' }}>Request Received!</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Thank you, {name}. Our Midrand estimation team will review your {area}m² {MATERIAL_PRICES[material].name} deck configurations and send a formal proposal within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote}>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '20px' }}>Request Site Visit & Formal Quote</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="tel" placeholder="Phone Number (e.g. 082 123 4567)" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                      <option value="Johannesburg">Johannesburg / Midrand</option>
                      <option value="Pretoria">Pretoria / Centurion</option>
                      <option value="Cape Town">Cape Town / Winelands</option>
                      <option value="Durban">Durban / Umhlanga</option>
                    </select>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                      Submit Configurations for Quote
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
