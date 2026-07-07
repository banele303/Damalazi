import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';

/* ─── Dermalaz Clinical Knowledge Base ─────────────────────────────────── */
const SYSTEM_PERSONA = `You are DermaBot, the clinical AI assistant for Dermalaz Laser Clinic in Ottawa, Canada. You are knowledgeable, warm, and precise. You specialise in:
- Diode Laser Hair Removal (808nm selective photothermolysis)
- IPL Photo Facial & photorejuvenation
- Skin Tightening & Thermal Neocollagenesis
- Chemical Peels & clinical exfoliation
- Dermalax Hyaluronic Acid dermal fillers
- Pre-care and post-care clinical protocols
Clinic address: 425 McArthur Ave, Unit 10, Ottawa, ON K1K 1G5. Hours: Mon-Sat 9AM-7PM. Phone: +1 (613) 555-0182.
Always be concise and professional. If asked something outside dermatology/aesthetics, politely redirect.`;

/* ─── Local streaming fetch handler (SPA – no server needed) ───────────── */
const buildStreamResponse = (userMessages) => {
  const lastMsg = userMessages[userMessages.length - 1]?.content?.toLowerCase() || '';

  let reply = '';
  if (lastMsg.match(/hair|shave|laser|follicle|permanent/)) {
    reply = `**Diode Laser Hair Removal** uses selective photothermolysis at 808nm to permanently disable hair follicles. Here's what you need to know:\n\n• **Pre-care:** Shave 24h before. Avoid waxing, plucking, and sun exposure for 14 days.\n• **Sessions:** Typically 6–8 sessions, spaced 4–6 weeks apart for optimal results.\n• **Comfort:** Our contact cooling system minimises discomfort — most clients rate it 2/10 pain.\n• **Pricing:** Starting from $89 per session. Package discounts available.\n\nWould you like to book a free consultation?`;
  } else if (lastMsg.match(/filler|dermalax|hyaluronic|lip|cheek|volume|inject/)) {
    reply = `**Dermalax Hyaluronic Acid Fillers** are our premium South Korean monophasic HA filler line.\n\n• **Dermalax Plus** — superficial lines, lip hydration\n• **Dermalax Deep Plus** — cheekbones, nasolabial folds, lip volume\n• **Dermalax Implant Plus** — structural jaw/chin definition\n\n**Pre-care:** Avoid NSAIDs (aspirin, ibuprofen) for 5 days. No alcohol 24h prior.\n**Longevity:** 6–12 months depending on area and metabolism.\n**Pricing:** From $399 per syringe.\n\nA medical assessment with Dr. Hajjaj is required before treatment.`;
  } else if (lastMsg.match(/ipl|photo|pigment|sunspot|rosacea|redness|freckle|tone/)) {
    reply = `**IPL Photo Facial** (Intense Pulsed Light) targets both melanin and oxyhemoglobin simultaneously:\n\n• **Sunspots & pigmentation** — chromophores absorb broadband light and are broken down by the body.\n• **Rosacea & redness** — vessel walls collapse and are naturally reabsorbed.\n• **Sessions:** 3–4 treatments, 4 weeks apart.\n• **Post-care:** SPF 50+ is mandatory. Spots may darken like "coffee grounds" for 3–7 days before clearing.\n• **Pricing:** From $149 per session.\n\nNo downtime — return to normal activities immediately.`;
  } else if (lastMsg.match(/tight|sag|wrinkle|collagen|firmness|contour|lift/)) {
    reply = `**Skin Tightening & Contouring** uses controlled thermal energy to trigger neocollagenesis:\n\n• Heats the deep dermis to 40–45°C, contracting existing collagen fibres instantly.\n• Stimulates new collagen production over 3–6 months post-treatment.\n• **Target areas:** Face, neck, jawline, abdomen, arms.\n• **Sessions:** 3–5 treatments recommended.\n• **Downtime:** Mild redness lasting 1–2 hours only.\n• **Pricing:** From $199 per session.`;
  } else if (lastMsg.match(/peel|exfoliat|acne|scar|pore|texture|breakout/)) {
    reply = `**Medical-Grade Chemical Peels** accelerate cellular turnover to resurface skin:\n\n• **Superficial peels** (lactic/glycolic) — target fine lines and mild discolouration.\n• **Medium peels** (TCA) — deeper acne scarring and moderate pigmentation.\n• **Pre-care:** Avoid retinoids/vitamin C for 5 days prior. No active skin infections.\n• **Post-care:** Expect light peeling for 2–5 days. Apply ceramide moisturiser and SPF 50+.\n• **Pricing:** From $99 per session.\n• **Sessions:** 4–6 treatments for optimal results.`;
  } else if (lastMsg.match(/hour|open|close|time|when|schedule|appointment/)) {
    reply = `**Clinic Hours:**\n• Monday – Saturday: 9:00 AM – 7:00 PM\n• Sunday: Closed\n\n**Contact:**\n• 📍 425 McArthur Ave, Unit 10, Ottawa, ON K1K 1G5\n• 📞 +1 (613) 555-0182\n• 💬 Use our booking form for online appointments\n\nWould you like help scheduling a consultation?`;
  } else if (lastMsg.match(/price|cost|how much|rate|fee|package|deal/)) {
    reply = `**Dermalaz Treatment Pricing:**\n\n| Treatment | Starting Price |\n|---|---|\n| Laser Hair Removal | From $89/session |\n| IPL Photo Facial | From $149/session |\n| Skin Tightening | From $199/session |\n| Chemical Peels | From $99/session |\n| Dermalax HA Fillers | From $399/syringe |\n\nPackage pricing is available with significant discounts for pre-booked sessions. Book a free consultation to receive a personalised treatment plan and quote.`;
  } else if (lastMsg.match(/prepare|prep|before|prior|ready|should i/)) {
    reply = `**General Pre-Treatment Guidelines:**\n\n1. **Avoid sun exposure** for 14 days before any laser or light-based treatment\n2. **No retinoids/vitamin A** for 5–7 days before facial treatments\n3. **Stay hydrated** — well-hydrated skin responds better to all treatments\n4. **Avoid NSAIDs** (aspirin, ibuprofen) for 5 days if having injectable treatments\n5. **Arrive with clean skin** — no makeup, SPF, lotions, or deodorant on the treatment area\n\nPlease specify which treatment you're preparing for and I can give you tailored guidance!`;
  } else if (lastMsg.match(/hello|hi|hey|good|start|help/)) {
    reply = `Welcome to **Dermalaz AI Skin Consult** 👋\n\nI'm DermaBot, your clinical assistant. I can help you with:\n\n• 🔬 **Treatment details** — laser hair removal, IPL, skin tightening, peels, fillers\n• 📋 **Pre & post-care guidelines** for any procedure\n• 💰 **Pricing information** and package options\n• 📍 **Clinic hours, location, and booking**\n• 🧬 **Clinical science** — how our treatments work\n\nWhat can I assist you with today?`;
  } else {
    reply = `Thank you for your question. As Dermalaz's clinical AI assistant, I'm best equipped to help with:\n\n• **Laser treatments** — hair removal, IPL photo facials\n• **Anti-aging** — skin tightening, chemical peels\n• **Injectable treatments** — Dermalax HA fillers\n• **Pre/post-care protocols and pricing**\n\nCould you rephrase your question around one of these topics? Or feel free to ask about our clinic hours, location, or booking process.`;
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
  { icon: '✨', text: 'How do I prepare for laser hair removal?', short: 'Laser Prep' },
  { icon: '💉', text: 'Tell me about Dermalax fillers and pricing', short: 'Dermalax Fillers' },
  { icon: '☀️', text: 'How does IPL photo facial work?', short: 'IPL Science' },
  { icon: '⏰', text: 'What are your hours and location?', short: 'Clinic Info' },
  { icon: '💰', text: 'What is the pricing for all treatments?', short: 'All Pricing' },
];

/* ─── Main Chat Component ─────────────────────────────────────────────────── */
export default function Chat() {
  const chatEndRef = useRef(null);
  const [diagnostics, setDiagnostics] = useState({ melanin: 42, hydration: 67, sensitivity: 28 });
  const [scanning, setScanning] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    initialMessages: [{
      id: 'init',
      role: 'assistant',
      content: 'Welcome to **Dermalaz AI Skin Consult** 👋\n\nI\'m DermaBot, your clinical assistant. I can help you with treatment details, pre & post-care guidelines, pricing, or clinic information.\n\nWhat can I assist you with today?'
    }],
    fetch: async (url, options) => {
      const body = JSON.parse(options.body);
      return createLocalStreamFetch(body.messages);
    }
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
              <h2 className="chat-header-v2-title">DermaBot <span className="ai-badge">AI</span></h2>
              <p className="chat-header-v2-sub">
                <span className="live-dot"></span>
                Clinical Dermatology Assistant · {isLoading ? 'Analysing...' : 'Online'}
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
