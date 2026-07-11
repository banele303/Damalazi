import React, { useState, useRef, useEffect, useCallback } from 'react';

/* ─── Magalela AI Knowledge Base ─────────────────────────────────────────── */
const SYSTEM_PERSONA = `You are Magalela Assistent, the AI project consultant for Magalela Trading & Projects, a premium construction company based in Midrand, South Africa. You are professional, knowledgeable, and precise. You specialize in:
- Composite Decking (Eva-Last, MoistureShield, Innofibe, R1,650/m² average installed)
- Timber Decking (Garapa, Balau, and treated structural Pine)
- Swimming Pool Construction (custom concrete/marbelite and fibreglass pool shells)
- Custom Pergolas and Patio Gazebos (freestanding, wall-mounted, oiled timbers)
- General Building Construction & Renovations (NHBRC registered, double-story extensions)
- SANS 10400 Building Compliance (raised decks safety, handrail specs, structural posts)
Office Address: Block G, 3rd Floor, Hertford Office Park, 90 Bekker Rd, Vorna Valley, Midrand, 1686. Hours: Mon-Fri 8AM-5PM, Sat 9AM-1PM. Phone: +27 87 510 1772. Email: info@magalelatrading.co.za.
Always keep responses concise, bulleted, and localized to South Africa (ZAR).`;

/* ─── Local fallback matching engine ─────────────────────────────────────── */
const buildFallbackResponse = (userMessages) => {
  const lastMsg = userMessages[userMessages.length - 1]?.content?.toLowerCase() || '';

  if (lastMsg.match(/composite|eva-last|moistureshield|innofibe|plastic deck/)) {
    return `**Premium Composite Decking** is our most requested outdoor solution:\n\n• **Zero Maintenance:** No sanding, oiling, or sealing required. Simple soap-and-water cleaning.\n• **High Durability:** 15 to 25-year manufacturer warranties against warping, rotting, fading, and termites.\n• **Neat Installation:** Installed using a hidden clip system for a clean, screw-free finish.\n• **Top Brands:** We install Eva-Last, MoistureShield, and Innofibe composite ranges.\n• **Cost:** Starts from **R1,650 per m²** installed (includes structural subframe and labor).`;
  } else if (lastMsg.match(/timber|wood|balau|garapa|pine|hardwood|softwood/)) {
    return `**Natural Wood Decking Options at Magalela:**\n\n• **Garapa (Hardwood):** Highly durable, rot-resistant hardwood with a beautiful golden hue. Highly recommended. From R1,800/m².\n• **Balau (Hardwood):** Dense, classic reddish-brown hardwood. Excellent lifespan but requires oiling. From R1,900/m².\n• **Treated Pine (Softwood):** Cost-effective structural timber pressure-treated to H3/H4 standard to resist wood rot and termites. From R1,100/m².\n• **Maintenance:** Timber decks must be sanded and sealed with a penetrating timber oil (like Woodoc or Cutek) once or twice a year to preserve color and prevent splintering.`;
  } else if (lastMsg.match(/pool|swimming pool|marbelite|fibreglass|fiberglass/)) {
    return `**Swimming Pool Construction at Magalela:**\n\n• **Concrete Marbelite Pools:** Fully customized shapes, shotcrete concrete shells, hand-plastered white/blue marbelite finish, and granite coping surrounds. From R85,000.\n• **Fibreglass Shell Pools:** Fast installation, pre-formed shells from leading South African manufacturers, smooth non-porous surface. From R70,000.\n• **Filtration:** We supply premium sand filters, energy-efficient pumps, LED lighting, and automated salt chlorinators.\n• **Compliance:** Excavations are SANS compliant, with soil tests and engineering sign-offs for complex slopes.`;
  } else if (lastMsg.match(/pergola|gazebo|shading|roof/)) {
    return `**Custom Pergolas & Shading Structures:**\n\n• **Timber Framing:** Built from structural grade structural Pine, Balau, or Garapa wood.\n• **Designs:** Custom slatted rafters for architectural shading or solid-roof integrations with polycarbonate sheeting and gutters.\n• **Anchoring:** Posts are securely bolted to concrete structural footings or heavy deck frames.\n• **Pricing:** Custom designs start from **R12,000** depending on sizing, wood species, and wall-mounting options.`;
  } else if (lastMsg.match(/sans|regulation|code|law|safety|height|engineer|council|municipal/)) {
    return `**Raised Deck & Pool Regulations (SANS 10400 South Africa):**\n\n• **Elevation Limit:** Any deck raised more than 300mm above ground level requires council-approved architectural drawings.\n• **Structural Engineer:** Decks higher than 1.5 meters require structural engineer certification and signed structural details.\n• **Safety Handrails:** Must be at least 1.0 meter high, with vertical balustrade slats spaced no more than 100mm apart (so children cannot slide through).\n• **Pool Fencing:** Pools must be secured with safety fences at least 1.2m high with self-closing gates to comply with SANS regulations.`;
  } else if (lastMsg.match(/price|cost|how much|rate|estimate|rands|zar/)) {
    return `**Magalela Trading & Projects Price Guide (Estimated ZAR):**\n\n• **Composite Decking:** R1,650 – R2,400 / m² installed.\n• **Garapa Hardwood Deck:** R1,800 – R2,300 / m² installed.\n• **Treated Pine Deck:** R1,100 – R1,400 / m² installed.\n• **Swimming Pools:** R75,000 – R150,000 (standard sizes).\n• **Timber Pergolas:** R12,000 – R35,000.\n• **Architectural Plans:** R8,000 – R18,000 for standard submissions.\n\nUse our interactive **Cost Calculator** on the navbar for a detailed breakdown, or book a site visit!`;
  } else if (lastMsg.match(/building|construction|renovat|extension|brickwork|nhbrc/)) {
    return `**Building Construction & Alterations:**\n\n• **NHBRC Registered:** We are fully registered with the National Home Builders Registration Council, ensuring all brickwork and concrete structures are certified.\n• **Home Extensions:** We build ground-floor extensions, double-story additions, concrete slabs, boundary walls, and modern paving.\n• **Project Management:** All sites have dedicated, qualified project supervisors to ensure SANS code compliance.\n• **Consultations:** Request a consultation, and we will quote based on your architect\'s municipal drawings.`;
  } else if (lastMsg.match(/hour|open|close|time|when|schedule|location|address|where|midrand|johannesburg|gauteng/)) {
    return `**Magalela Trading & Projects - Office Details:**\n\n• 📍 **Head Office:** Block G, 3rd Floor, Hertford Office Park, 90 Bekker Rd, Vorna Valley, Midrand, 1686\n• 🕐 **Hours:** Monday – Friday: 08:00 AM – 05:00 PM | Saturday: 09:00 AM – 01:00 PM\n• 📞 **Phone:** +27 87 510 1772 / +27 71 854 6609\n• 📧 **Email:** info@magalelatrading.co.za\n\nWe service the entire Gauteng province (Midrand, Sandton, Pretoria, East Rand, West Rand) and have satellite teams in Cape Town and Durban.`;
  } else if (lastMsg.match(/hello|hi|hey|good|start|help/)) {
    return `Welcome to **Magalela AI Construction Consult** 👋\n\nI'm Magalela Assistent, your virtual construction assistant. How can I help you build today?\n\n• 🪵 **Composite vs Timber** - material specs & pricing\n• 🏊 **Swimming Pools** - marbelite vs fibreglass installs\n• 🏡 **Pergolas & Extensions** - shade structures & NHBRC building\n• 📏 **SANS 10400 Regulations** - safety guidelines for raised decks\n• 📍 **Office details, location, and site consultations**`;
  }
  return `Thank you for your question. As Magalela\'s AI project consultant, I can help you with:\n\n• **Decking Options:** Composite board brands, Balau or Garapa hardwood installations.\n• **Pool Builds:** Marbelite plastering, fibreglass shells, pool decking wraps.\n• **Structures:** Timber pergolas, home extensions, brick paving.\n• **SANS Compliance:** Safety codes for raised structures.\n• **Pricing (ZAR) & Location:** Midrand office details and site visits.\n\nCould you please rephrase your question around these construction services?`;
};

/* ─── Diagnostic Gauge Component ─────────────────────────────────────────── */
const Gauge = ({ label, value, color, unit }) => (
  <div className="diag-gauge">
    <div className="diag-gauge-header">
      <span className="diag-gauge-label" style={{ color: 'var(--color-text-sec)', fontSize: '0.85rem' }}>{label}</span>
      <span className="diag-gauge-value" style={{ color, fontWeight: 700 }}>{value}<span className="diag-gauge-unit" style={{ fontSize: '0.8em', marginLeft: '2px' }}>{unit}</span></span>
    </div>
    <div className="diag-gauge-bar" style={{ background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '4px', overflow: 'hidden', marginTop: '6px' }}>
      <div className="diag-gauge-fill" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}66, ${color})`, height: '100%', borderRadius: '4px' }}></div>
    </div>
  </div>
);

/* ─── Preset queries ──────────────────────────────────────────────────────── */
const PRESETS = [
  { icon: '🪵', text: 'Compare Composite vs Timber Decking', short: 'Composite vs Timber' },
  { icon: '📏', text: 'What are SANS building codes for raised decks?', short: 'SANS Regulations' },
  { icon: '🏊', text: 'Tell me about swimming pool construction options', short: 'Pool Construction' },
  { icon: '🏡', text: 'How much does a custom pergola cost?', short: 'Pergola Pricing' },
  { icon: '📍', text: 'What are your hours and Midrand office location?', short: 'Office Details' },
  { icon: '💰', text: 'Give me a general price guide for all services', short: 'Price Guide' },
];

/* ─── Main Chat Component ─────────────────────────────────────────────────── */
export default function Chat() {
  const chatEndRef = useRef(null);
  const [diagnostics, setDiagnostics] = useState({ loadLimit: 80, soilBearing: 150, slopeIncline: 12 });
  const [scanning, setScanning] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init',
      role: 'assistant',
      content: "Welcome to **Magalela AI Construction Consult** 👋\n\nI'm Magalela Assistent, your structural project assistant. I can assist you with composite or timber decking specs, swimming pool concrete/fibreglass installations, pergolas, SANS building regulations, or Midrand contact details.\n\nWhat outdoor project can I help you plan today?"
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsg = { id: Math.random().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // 2. Start Substructure Diagnostic Scanner animation
    setScanning(true);
    const diagTimer = setTimeout(() => {
      setDiagnostics({
        loadLimit: 60 + Math.floor(Math.random() * 35),
        soilBearing: 100 + Math.floor(Math.random() * 120),
        slopeIncline: 2 + Math.floor(Math.random() * 25),
      });
      setScanning(false);
    }, 1200);

    const conversationHistory = [...messages, userMsg];
    let reply = "";
    let successfullyFetched = false;

    // 3. Fetch response from Puter or local fallback
    if (typeof window !== 'undefined' && window.puter && window.puter.ai) {
      try {
        const msgs = [{ role: 'system', content: SYSTEM_PERSONA }, ...conversationHistory.map(m => ({ role: m.role, content: m.content }))];
        const response = await window.puter.ai.chat(msgs);
        reply = typeof response === 'string' ? response : (response?.message?.content || JSON.stringify(response));
        successfullyFetched = true;
      } catch (err) {
        console.error('Puter AI error on Chat page, using fallback:', err);
      }
    }

    if (!successfullyFetched) {
      reply = buildFallbackResponse(conversationHistory);
    }

    // 4. Add placeholder assistant message
    const assistantMsgId = Math.random().toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    // 5. Stream typing effect
    const tokens = reply.split(/(?=\s+)/);
    let currentText = '';
    for (let i = 0; i < tokens.length; i++) {
      currentText += tokens[i];
      setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: currentText } : m));
      await new Promise(resolve => setTimeout(resolve, 15));
    }

    setIsLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    const text = inputVal;
    setInputVal('');
    sendMessage(text);
  };

  const sendPreset = useCallback((text) => {
    sendMessage(text);
  }, [messages]);

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const bullet = bold.startsWith('• ') ? `<span class="chat-bullet">•</span>${bold.slice(2)}` : bold;
      const mdTable = bold.startsWith('|') ? `<span class="chat-table-row">${bold}</span>` : bullet;
      return <p key={i} dangerouslySetInnerHTML={{ __html: mdTable || '&nbsp;' }} className={line.startsWith('• ') ? 'chat-bullet-line' : ''} style={{ margin: '0 0 8px 0', lineHeight: 1.6 }} />;
    });
  };

  return (
    <div className="chat-page" style={{ display: 'grid', gridTemplateColumns: '1fr', minHeight: 'calc(100vh - var(--header-height))', background: 'var(--color-bg-deep)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', padding: '30px 24px' }}>
        
        <div className="chat-interface-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', alignItems: 'stretch' }}>
          
          {/* ── Sidebar (Structural Diagnostics) ────────────────────────── */}
          <aside style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Structural Scanner Widget */}
            <div className="scanner-widget" style={{ textAlign: 'center' }}>
              <div className={`scanner-face ${scanning ? 'scanning' : ''}`} style={{ position: 'relative', width: '200px', margin: '0 auto' }}>
                <svg viewBox="0 0 200 220" style={{ width: '100%', height: 'auto', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '10px', background: 'rgba(0,0,0,0.2)' }}>
                  <defs>
                    <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-gold-base)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--color-laser)" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Deck joist structural grid lines */}
                  <rect x="25" y="30" width="150" height="150" fill="none" stroke="url(#scanGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Beams */}
                  <line x1="25" y1="80" x2="175" y2="80" stroke="var(--color-gold-base)" strokeWidth="2.5" opacity="0.7" />
                  <line x1="25" y1="130" x2="175" y2="130" stroke="var(--color-gold-base)" strokeWidth="2.5" opacity="0.7" />
                  
                  {/* Joists */}
                  <line x1="55" y1="30" x2="55" y2="180" stroke="var(--color-accent)" strokeWidth="1" opacity="0.5" />
                  <line x1="85" y1="30" x2="85" y2="180" stroke="var(--color-accent)" strokeWidth="1" opacity="0.5" />
                  <line x1="115" y1="30" x2="115" y2="180" stroke="var(--color-accent)" strokeWidth="1" opacity="0.5" />
                  <line x1="145" y1="30" x2="145" y2="180" stroke="var(--color-accent)" strokeWidth="1" opacity="0.5" />
                  
                  {/* Foundation Piers (dots) */}
                  <circle cx="55" cy="80" r="5" fill="var(--color-laser)" />
                  <circle cx="115" cy="80" r="5" fill="var(--color-laser)" />
                  <circle cx="145" cy="80" r="5" fill="var(--color-laser)" />
                  <circle cx="55" cy="130" r="5" fill="var(--color-laser)" />
                  <circle cx="115" cy="130" r="5" fill="var(--color-laser)" />
                  <circle cx="145" cy="130" r="5" fill="var(--color-laser)" />
                  
                  {/* Laser scanning line */}
                  <line x1="20" y1="30" x2="180" y2="30" stroke="var(--color-laser)" strokeWidth="2" opacity="0.9" className="scan-line" style={{ animation: scanning ? 'scanAnimation 1.5s infinite ease-in-out' : 'none' }} />
                </svg>
                <div style={{ fontSize: '0.8rem', color: scanning ? 'var(--color-laser)' : 'var(--color-text-muted)', fontWeight: 700, marginTop: '8px', letterSpacing: '0.05em' }}>
                  {scanning ? 'BEAM CALCULATION IN PROGRESS...' : 'SUBSTRUCTURE DIAGNOSTIC READY'}
                </div>
              </div>
            </div>

            {/* Diagnostics Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', fontWeight: 600, fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Structural Diagnostics
              </div>
              <Gauge label="Beam Load Capacity" value={diagnostics.loadLimit} color="var(--color-gold-base)" unit="%" />
              <Gauge label="Soil Bearing Capacity" value={Math.round(diagnostics.soilBearing / 2.4)} color="var(--color-accent)" unit="kPa" />
              <Gauge label="Slope Incline Angle" value={diagnostics.slopeIncline} color="var(--color-laser)" unit="°" />
            </div>

            {/* Presets Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', fontWeight: 600, fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Quick Topics
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {PRESETS.map((p, i) => (
                  <button 
                    key={i} 
                    onClick={() => sendPreset(p.text)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontSize: '0.82rem', color: 'var(--color-text-sec)', transition: 'var(--transition-fast)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = 'var(--color-text-sec)'; }}
                  >
                    <span>{p.icon}</span>
                    <span>{p.short}</span>
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* ── Chat Feed ────────────────────────────────────────────────── */}
          <div style={{ background: 'var(--color-bg-card)', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', height: '620px' }}>
            
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <img src="/images/magalela_logo.png" alt="Magalela Assistent" style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: '3px' }} />
                <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', border: '2px solid var(--color-bg-card)' }}></span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>Magalela Assistent <span className="chat-ai-badge" style={{ fontSize: '0.62rem', background: 'var(--color-gold-base)', color: 'var(--color-bg-deep)', padding: '2px 5px', borderRadius: '4px', marginLeft: '6px', fontWeight: 800 }}>AI</span></div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Online · Structural Engineering Assistant</div>
              </div>
            </div>

            {/* Message Thread */}
            <div className="chat-messages-container" style={{ flexGrow: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {messages.map((m) => (
                <div key={m.id} style={{ display: 'flex', gap: '12px', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {m.role !== 'user' && (
                    <img src="/images/magalela_logo.png" alt="" style={{ width: '32px', height: '32px', objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: '2px', alignSelf: 'flex-start' }} />
                  )}
                  <div 
                    className={`chat-bubble ${m.role}`}
                    style={{ 
                      padding: '14px 18px', 
                      borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px', 
                      background: m.role === 'user' ? 'var(--color-gold-dark)' : 'var(--color-bg-sec)', 
                      border: '1px solid var(--color-border)',
                      color: '#fff', 
                      maxWidth: '75%', 
                      fontSize: '0.92rem', 
                      textAlign: 'left' 
                    }}
                  >
                    {renderContent(m.content)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <img src="/images/magalela_logo.png" alt="Magalela" style={{ width: '32px', height: '32px', objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: '2px', alignSelf: 'flex-start' }} />
                  <div style={{ padding: '14px 18px', borderRadius: '12px', background: 'var(--color-bg-sec)', border: '1px solid var(--color-border)' }}>
                    <div className="typing-indicator-v2" style={{ display: 'flex', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-text-muted)', display: 'inline-block', animation: 'typingBounce 1.4s infinite ease-in-out' }}></span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-text-muted)', display: 'inline-block', animation: 'typingBounce 1.4s infinite ease-in-out', animationDelay: '0.2s' }}></span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-text-muted)', display: 'inline-block', animation: 'typingBounce 1.4s infinite ease-in-out', animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Zone */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid var(--color-border)', background: 'rgba(0,0,0,0.1)' }}>
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask about composite vs timber, SANS regulations, pool pricing..."
                  disabled={isLoading}
                  style={{ flexGrow: 1, padding: '14px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff', outline: 'none', fontSize: '0.92rem' }}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !inputVal.trim()}
                  style={{ width: '48px', height: '48px', borderRadius: '6px', background: 'var(--color-gold-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-bg-deep)', cursor: 'pointer', border: 'none', transition: 'var(--transition-fast)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </form>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '8px 0 0 0', textAlign: 'left' }}>
                Magalela Assistent provides estimations. All builds require detailed structural engineering drawings and site evaluations.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
