import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';

/* ─── Dermalaz Clinical Knowledge Base ─────────────────────────────────── */
const SYSTEM_PERSONA = `You are MasaBot, the clinical AI assistant for MASA Medical Aesthetic Spa Africa in Forest Town, Johannesburg. You are knowledgeable, warm, and precise. You specialise in:
- Ethnic Hair Restoration & Hair Transplants (specialist in African/textured hair)
- Diode Laser Hair Removal (safe for melanin-rich skin)
- IPL Photo Facial & skin rejuvenation
- Skin Tightening & Body Contouring
- Medical Chemical Peels (treating PIH & hyperpigmentation)
- Dermal Fillers & volume restoration
- Pre-care and post-care clinical protocols
Clinic address: 1 Torwood Road, Forest Town, Randburg 2193, Johannesburg. Hours: Mon-Sat 9AM-7PM. Phone: +27 11 234 1234.
Always be concise and professional. If asked something outside aesthetics/wellness, politely redirect.`;

/* ─── Local streaming fetch handler (SPA – no server needed) ───────────── */
const buildStreamResponse = (userMessages) => {
  const lastMsg = userMessages[userMessages.length - 1]?.content?.toLowerCase() || '';

  let reply = '';
  if (lastMsg.match(/hair transplant|transplant|fue|fut|hair loss|balding|alopecia|thinning/)) {
    reply = `**Ethnic Hair Transplant & Restoration** is one of MASA's signature specialities.\n\n• **FUE (Follicular Unit Extraction)** — minimally invasive, individual follicle grafts with no linear scar.\n• **FUT (Follicular Unit Transplant)** — ideal for larger coverage areas.\n• **Specialist expertise in African, mixed-race & textured curly hair follicle structures.**\n• **Scalp health programmes** — PRP therapy, scalp treatments, and hair wellness.\n• **Pre-care:** Stop blood thinners 5 days before. Avoid smoking 2 weeks prior.\n• **Recovery:** 7–10 days before returning to normal activity. Full results visible at 9–12 months.\n\nA thorough scalp and hair loss assessment with our trichologist is required before any transplant procedure.`;
  } else if (lastMsg.match(/hair restoration|hair growth|scalp|shedding|prp|thinning|regrowth/)) {
    reply = `**Hair Restoration at MASA** includes both surgical and non-surgical options:\n\n• **PRP Hair Therapy** — Platelet-Rich Plasma injected into the scalp to stimulate dormant follicles. From R3,500/session.\n• **Scalp Micro-pigmentation** — non-surgical camouflage for thinning areas. From R2,800/session.\n• **Laser Hair Growth Therapy** — low-level laser to energise follicles. From R1,200/session.\n• **Hair Transplant consultations** — comprehensive assessment with our trichology team.\n\nWe specialise in hair patterns common in Black African, mixed-race, and textured hair types.`;
  } else if (lastMsg.match(/laser hair|shave|follicle|permanent hair|hair removal/)) {
    reply = `**Diode Laser Hair Removal** at MASA is calibrated specifically for darker and melanin-rich skin tones:\n\n• **808nm wavelength** — safe and effective on Fitzpatrick skin types IV–VI.\n• **Pre-care:** Shave 24h before. Avoid waxing and sun exposure for 14 days.\n• **Sessions:** Typically 6–8 sessions, spaced 4–6 weeks apart.\n• **Comfort:** Contact cooling system keeps discomfort minimal.\n• **Pricing:** From R850 per session. Package deals available.\n\nWould you like to book a complimentary skin assessment?`;
  } else if (lastMsg.match(/filler|hyaluronic|lip|cheek|volume|inject|botox/)) {
    reply = `**Dermal Fillers & Injectables** at MASA restore natural volume and contour:\n\n• **HA Fillers** — lip volumisation, cheekbone lifting, nasolabial folds, jaw definition.\n• **Premium brands** — Juvederm, Restylane, and medical-grade HA products.\n• **Pre-care:** Avoid NSAIDs (aspirin, ibuprofen) for 5 days. No alcohol 24h prior.\n• **Longevity:** 6–18 months depending on product and area.\n• **Pricing:** From R3,800 per syringe.\n\nAll injectable treatments require a prior medical assessment at our Forest Town clinic.`;
  } else if (lastMsg.match(/ipl|photo|pigment|dark spot|sunspot|rosacea|redness|hyperpigment|uneven|pih/)) {
    reply = `**IPL Photo Facial & Skin Rejuvenation** is highly effective for:\n\n• **Post-Inflammatory Hyperpigmentation (PIH)** — very common in darker skin tones.\n• **Dark spots, sunspots & melasma** — broadband light breaks down excess melanin.\n• **Uneven skin tone** — restores uniform complexion across the face and body.\n• **Sessions:** 3–4 treatments, 4 weeks apart.\n• **Post-care:** SPF 50+ daily is mandatory. Expect mild darkening of spots for 5–7 days before clearing.\n• **Pricing:** From R1,400 per session.`;
  } else if (lastMsg.match(/tight|sag|wrinkle|collagen|firmness|contour|lift|body/)) {
    reply = `**Skin Tightening & Body Contouring** at MASA uses radiofrequency thermal energy:\n\n• Heats the deep dermis to stimulate collagen remodelling.\n• Immediate tightening effect with results improving over 3–6 months.\n• **Target areas:** Face, neck, jawline, abdomen, arms, thighs.\n• **Sessions:** 3–5 treatments recommended.\n• **Downtime:** Mild redness for 1–2 hours only.\n• **Pricing:** From R1,800 per session.`;
  } else if (lastMsg.match(/peel|exfoliat|acne|scar|pore|texture|breakout|chemical/)) {
    reply = `**Medical Chemical Peels** at MASA target common skin concerns in African skin:\n\n• **PIH & acne scarring** — our most requested treatment for darker complexions.\n• **Superficial peels** (lactic/glycolic) — brightening, fine lines, mild pigmentation.\n• **Medium-depth TCA peels** — deeper scarring and hyperpigmentation.\n• **Pre-care:** Stop retinoids/vitamin C for 5 days. No active breakouts or infections.\n• **Post-care:** Light peeling for 2–5 days. SPF 50+ and ceramide moisturiser required.\n• **Pricing:** From R950 per session.`;
  } else if (lastMsg.match(/hour|open|close|time|when|schedule|location|address|where|forest town|johannesburg/)) {
    reply = `**MASA Medical Aesthetic Spa — Clinic Details:**\n• 🕐 Monday – Saturday: 9:00 AM – 7:00 PM\n• ☀️ Sunday: Closed\n\n**Location:**\n• 📍 1 Torwood Road, Forest Town, Randburg 2193, Johannesburg\n• 📞 +27 11 234 1234\n• 📧 hello@masaaesthetics.co.za\n• 📸 @masaaesthetics on Instagram\n\nUse our online booking form to schedule a complimentary consultation!`;
  } else if (lastMsg.match(/price|cost|how much|rate|fee|package|deal|rand|rands/)) {
    reply = `**MASA Treatment Pricing (ZAR):**\n\n| Treatment | Starting Price |\n|---|---|\n| Laser Hair Removal | From R850/session |\n| IPL Photo Facial | From R1,400/session |\n| Skin Tightening | From R1,800/session |\n| Chemical Peels | From R950/session |\n| Dermal Fillers | From R3,800/syringe |\n| PRP Hair Therapy | From R3,500/session |\n| Hair Transplant | Consultation required |\n\nPackage pricing available. Book a free consultation for a personalised quote.`;
  } else if (lastMsg.match(/prepare|prep|before|prior|ready|should i/)) {
    reply = `**General Pre-Treatment Guidelines at MASA:**\n\n1. **Avoid sun exposure** for 14 days before laser or light treatments\n2. **No retinoids/vitamin A** for 5–7 days before facial treatments\n3. **Stay hydrated** — well-hydrated skin responds better to all treatments\n4. **Avoid NSAIDs** for 5 days if having injectable treatments\n5. **Arrive with clean skin** — no makeup, SPF, or lotions on the treatment area\n\nPlease specify which treatment you're preparing for and I'll give you tailored MASA guidance!`;
  } else if (lastMsg.match(/hello|hi|hey|good|start|help/)) {
    reply = `Welcome to **MASA AI Skin & Hair Consult** 👋\n\nI'm MasaBot, your personal wellness assistant. I can help you with:\n\n• 💇🏾 **Hair restoration & transplants** — ethnic hair specialist\n• 🔬 **Skin treatments** — laser, IPL, tightening, peels, fillers\n• 📋 **Pre & post-care guidelines** for any procedure\n• 💰 **Pricing information** and package options\n• 📍 **Clinic hours, Forest Town location & booking**\n\nWhat can I assist you with today?`;
  } else {
    reply = `Thank you for your question. As MASA's clinical assistant, I specialise in:\n\n• **Hair restoration** — ethnic hair transplants, PRP, scalp health\n• **Laser treatments** — hair removal (safe for dark skin), IPL facials\n• **Anti-aging** — skin tightening, chemical peels\n• **Injectable treatments** — dermal fillers\n• **Pre/post-care protocols and pricing (ZAR)**\n\nCould you rephrase your question around one of these topics? Or ask about our Forest Town clinic location and booking.`;
  }

  return reply;
};

/* ─── Custom fetch that simulates streaming via Vercel AI SDK format ─────── */
const createLocalStreamFetch = async (messages) => {
  const content = buildStreamResponse(messages);
  const words = content.split(' ');

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        const data = `0:${JSON.stringify(chunk)}\n`;
        controller.enqueue(encoder.encode(data));
        await new Promise(r => setTimeout(r, 28 + Math.random() * 20));
      }
      controller.enqueue(encoder.encode('e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n'));
      controller.enqueue(encoder.encode('d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n'));
      controller.close();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'X-Vercel-AI-Data-Stream': 'v1' }
  });
};

/* ─── Diagnostic Gauge Component ─────────────────────────────────────────── */
const Gauge = ({ label, value, color, unit }) => (
  <div className="diag-gauge">
    <div className="diag-gauge-header">
      <span className="diag-gauge-label">{label}</span>
      <span className="diag-gauge-value" style={{ color }}>{value}<span className="diag-gauge-unit">{unit}</span></span>
    </div>
    <div className="diag-gauge-bar">
      <div className="diag-gauge-fill" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}44, ${color})` }}></div>
    </div>
  </div>
);

/* ─── Preset queries ──────────────────────────────────────────────────────── */
const PRESETS = [
    { icon: '💇🏾', text: 'Tell me about ethnic hair transplants', short: 'Hair Transplants' },
    { icon: '✨', text: 'How do I prepare for laser hair removal?', short: 'Laser Prep' },
    { icon: '💉', text: 'Tell me about dermal fillers and pricing', short: 'Dermal Fillers' },
    { icon: '☀️', text: 'How does IPL treat dark spots and hyperpigmentation?', short: 'IPL & Pigmentation' },
    { icon: '📍', text: 'What are your hours and location in Forest Town?', short: 'Clinic Info' },
    { icon: '💰', text: 'What is the pricing for all treatments?', short: 'All Pricing' },
];

/* ─── Main Chat Component ─────────────────────────────────────────────────── */
export default function Chat() {
  const chatEndRef = useRef(null);
  const [diagnostics, setDiagnostics] = useState({ melanin: 42, hydration: 67, sensitivity: 28 });
  const [scanning, setScanning] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    initialMessages: undefined,
    fetch: async (url, options) => {
      const body = JSON.parse(options.body);
      return createLocalStreamFetch(body.messages);
    },
    initialMessages: [{
      id: 'init',
      role: 'assistant',
      content: 'Welcome to **MASA AI Skin & Hair Consult** 👋\n\nI\'m MasaBot, your personal wellness assistant at MASA Medical Aesthetic Spa Africa in Forest Town, Johannesburg. I can help with ethnic hair restoration, laser treatments, skincare, pricing, or clinic information.\n\nWhat can I assist you with today?'
    }]
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /* Animate diagnostics when bot sends a new message */
  useEffect(() => {
    if (messages.length > 1) {
      setScanning(true);
      const t = setTimeout(() => {
        setDiagnostics({
          melanin: 30 + Math.floor(Math.random() * 50),
          hydration: 40 + Math.floor(Math.random() * 55),
          sensitivity: 10 + Math.floor(Math.random() * 60),
        });
        setScanning(false);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [messages.length]);

  const sendPreset = useCallback((text) => {
    append({ role: 'user', content: text });
  }, [append]);

  /* ── Render markdown-ish content (bold, bullet, newlines) ─────────────── */
  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const bullet = bold.startsWith('• ') ? `<span class="chat-bullet">•</span>${bold.slice(2)}` : bold;
      const mdTable = bold.startsWith('|') ? `<span class="chat-table-row">${bold}</span>` : bullet;
      return <p key={i} dangerouslySetInnerHTML={{ __html: mdTable || '&nbsp;' }} className={line.startsWith('• ') ? 'chat-bullet-line' : ''} />;
    });
  };

  return (
    <div className="chat-page">
      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className="chat-sidebar-v2">
        {/* Scanner */}
        <div className="scanner-widget">
          <div className={`scanner-face ${scanning ? 'scanning' : ''}`}>
            <svg viewBox="0 0 200 240" className="scanner-svg">
              <defs>
                <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C5A880" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {/* Face outline */}
              <ellipse cx="100" cy="110" rx="65" ry="80" fill="none" stroke="url(#scanGrad)" strokeWidth="1" strokeDasharray="4 4" />
              {/* Eyes */}
              <ellipse cx="76" cy="95" rx="10" ry="6" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.7" />
              <ellipse cx="124" cy="95" rx="10" ry="6" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.7" />
              {/* Nose bridge */}
              <line x1="100" y1="105" x2="100" y2="125" stroke="#C5A880" strokeWidth="1" opacity="0.5" />
              {/* Mouth */}
              <path d="M82 145 Q100 158 118 145" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.6" />
              {/* Grid lines */}
              <line x1="35" y1="110" x2="165" y2="110" stroke="#00F0FF" strokeWidth="0.4" opacity="0.3" />
              <line x1="100" y1="30" x2="100" y2="200" stroke="#00F0FF" strokeWidth="0.4" opacity="0.3" />
              {/* Corner brackets */}
              <path d="M20 50 L20 30 L40 30" fill="none" stroke="#C5A880" strokeWidth="1.5" />
              <path d="M160 30 L180 30 L180 50" fill="none" stroke="#C5A880" strokeWidth="1.5" />
              <path d="M20 190 L20 210 L40 210" fill="none" stroke="#C5A880" strokeWidth="1.5" />
              <path d="M160 210 L180 210 L180 190" fill="none" stroke="#C5A880" strokeWidth="1.5" />
              {/* Scan line (animated via CSS) */}
              <line x1="20" y1="30" x2="180" y2="30" stroke="#00F0FF" strokeWidth="2" opacity="0.9" className="scan-line" />
            </svg>
            <div className="scanner-label">{scanning ? 'ANALYSING...' : 'SKIN SCAN READY'}</div>
          </div>
        </div>

        {/* Diagnostics */}
        <div className="diag-panel">
          <div className="diag-panel-title">Clinical Diagnostics</div>
          <Gauge label="Melanin Index" value={diagnostics.melanin} color="#C5A880" unit="%" />
          <Gauge label="Hydration Level" value={diagnostics.hydration} color="#00F0FF" unit="%" />
          <Gauge label="Sensitivity Score" value={diagnostics.sensitivity} color="#E2B3A3" unit="%" />
        </div>

        {/* Presets */}
        <div className="preset-panel">
          <div className="diag-panel-title">Quick Questions</div>
          {PRESETS.map((p, i) => (
            <button key={i} className="preset-pill" onClick={() => sendPreset(p.text)}>
              <span className="preset-pill-icon">{p.icon}</span>
              <span>{p.short}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ── Main Chat ────────────────────────────────────────────────── */}
      <div className="chat-main-v2">
        {/* Header */}
        <div className="chat-header-v2">
          <div className="chat-header-v2-left">
            <div className="chat-avatar-ring">
              <img src="/images/ai_consultant.png" alt="DermaBot" className="chat-header-avatar" />
              <span className="avatar-online-dot"></span>
            </div>
            <div>
              <h2 className="chat-header-v2-title">MasaBot <span className="ai-badge">AI</span></h2>
              <p className="chat-header-v2-sub">
                <span className="live-dot"></span>
                MASA Skin & Hair Consultant · {isLoading ? 'Analysing...' : 'Online'}
              </p>
            </div>
          </div>
          <a href="/" className="chat-back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Site
          </a>
        </div>

        {/* Messages */}
        <div className="chat-messages-v2">
          {messages.map((m) => (
            <div key={m.id} className={`chat-row-v2 ${m.role}`}>
              {m.role === 'assistant' && (
                <div className="chat-bot-avatar">
                  <img src="/images/ai_consultant.png" alt="DermaBot" />
                </div>
              )}
              <div className={`chat-bubble-v2 ${m.role}`}>
                <div className="chat-bubble-content">{renderContent(m.content)}</div>
                <span className="chat-bubble-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-row-v2 assistant">
              <div className="chat-bot-avatar">
                <img src="/images/ai_consultant.png" alt="DermaBot" />
              </div>
              <div className="chat-bubble-v2 assistant">
                <div className="typing-indicator-v2">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-zone">
          <div className="chat-preset-row">
            {PRESETS.slice(0, 3).map((p, i) => (
              <button key={i} className="chat-quick-chip" onClick={() => sendPreset(p.text)}>
                {p.icon} {p.short}
              </button>
            ))}
          </div>
          <form className="chat-input-form-v2" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about treatments, pricing, pre-care, or clinic hours..."
              disabled={isLoading}
              className="chat-input-v2"
            />
            <button type="submit" className="chat-send-btn" disabled={isLoading || !input.trim()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
          <p className="chat-disclaimer">DermaBot provides general information only. Consult our practitioners for personalised medical advice.</p>
        </div>
      </div>
    </div>
  );
}
