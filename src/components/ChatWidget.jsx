import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';

/* ─── Local streaming fetch (mirrors Chat.jsx handler) ──────────────────── */
const buildResponse = (messages) => {
  const last = messages[messages.length - 1]?.content?.toLowerCase() || '';
  if (last.match(/transplant|fue|fut|hair loss|balding|alopecia/)) return '**Ethnic Hair Transplants** at MASA are our flagship service. We specialise in African, mixed-race & textured hair follicle structures. FUE & FUT techniques available. Consultation required — ask us to book your free assessment!';
  if (last.match(/hair restoration|prp|scalp|thinning|regrowth/)) return '**Hair Restoration options** at MASA include PRP therapy (from R3,500), scalp micro-pigmentation (from R2,800), and laser hair growth therapy (from R1,200/session).';
  if (last.match(/hair|laser hair|shave|follicle/)) return '**Diode Laser Hair Removal** is calibrated for darker skin tones at MASA. From R850/session. Shave 24h before, avoid sun for 14 days. 6–8 sessions for permanent results. Want to book a free consultation?';
  if (last.match(/filler|lip|volume|hyaluronic|inject/)) return '**Dermal HA Fillers** at MASA start from R3,800/syringe. Premium brands (Juvederm, Restylane). Results last 6–18 months. A prior medical assessment is required at our Forest Town clinic.';
  if (last.match(/ipl|photo|pigment|dark spot|hyperpigment|pih|redness/)) return '**IPL Photo Facial** targets PIH and dark spots — very common in darker skin tones. From R1,400/session. Zero downtime. Spots clear within 5–7 days!';
  if (last.match(/tight|sag|collagen|wrinkle|body/)) return '**Skin Tightening & Body Contouring** uses RF thermal energy to stimulate collagen. From R1,800/session. Results improve over 3–6 months.';
  if (last.match(/peel|acne|scar|pore|texture|chemical/)) return '**Medical Chemical Peels** treat PIH & acne scarring — our most requested service for darker complexions. From R950/session. Light peeling for 2–5 days post-treatment.';
  if (last.match(/hour|location|address|where|open|forest town|johannesburg/)) return '📍 1 Torwood Road, Forest Town, Randburg 2193, Johannesburg\n⏰ Mon–Sat: 9AM–7PM\n📞 +27 11 234 1234\n📸 @masaaesthetics';
  if (last.match(/price|cost|how much|rand/)) return 'Laser Hair: from R850 · IPL Facial: from R1,400 · Skin Tightening: from R1,800 · Peels: from R950 · Fillers: from R3,800/syringe · PRP Hair: from R3,500.';
  if (last.match(/hello|hi|hey|help/)) return 'Hi! I\'m MasaBot 👋 Ask me about our ethnic hair restoration & transplants, laser treatments, skincare, pricing, or our Forest Town clinic in Johannesburg!';
  return 'I can help with ethnic hair transplants, laser hair removal, IPL facials, skin tightening, chemical peels, or dermal fillers. What would you like to know?';
};

const localFetch = async (url, options) => {
  const body = JSON.parse(options.body);
  const content = buildResponse(body.messages);
  const words = content.split(' ');
  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      for (let i = 0; i < words.length; i++) {
        controller.enqueue(enc.encode(`0:${JSON.stringify((i === 0 ? '' : ' ') + words[i])}\n`));
        await new Promise(r => setTimeout(r, 30 + Math.random() * 25));
      }
      controller.enqueue(enc.encode('e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n'));
      controller.enqueue(enc.encode('d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n'));
      controller.close();
    }
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'X-Vercel-AI-Data-Stream': 'v1' } });
};

/* ─── Render simple markdown ─────────────────────────────────────────────── */
const renderText = (text) =>
  text.split('\n').map((line, i) => (
    <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '&nbsp;' }} />
  ));

/* ─── Widget Component ───────────────────────────────────────────────────── */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    initialMessages: [{
      id: 'w-init',
      role: 'assistant',
      content: 'Hi! I\'m MasaBot 👋 I\'m your MASA wellness assistant. Ask me about our ethnic hair restoration & transplants, advanced laser treatments, skincare, or our luxury Forest Town spa in Johannesburg!'
    }],
    fetch: localFetch,
    onFinish: () => {
      if (!open) setUnread(n => n + 1);
    }
  });

  useEffect(() => {
    if (open) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  const handleOpen = () => setOpen(true);

  const quickReplies = ['Hair transplants', 'IPL & dark spots', 'Clinic location'];

  return (
    <>
      {/* ── Floating Bubble ──────────────────────────────────────────── */}
      {!open && (
        <button className="widget-bubble" onClick={handleOpen} aria-label="Open chat">
          <div className="widget-bubble-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          {unread > 0 && <span className="widget-unread">{unread}</span>}
          <div className="widget-bubble-ring"></div>
        </button>
      )}

      {/* ── Chat Panel ───────────────────────────────────────────────── */}
      {open && (
        <div className="widget-panel">
          {/* Header */}
          <div className="widget-header">
            <div className="widget-header-left">
              <div className="widget-avatar-wrap">
                <img src="/images/ai_consultant.png" alt="DermaBot" className="widget-avatar" />
                <span className="widget-online"></span>
              </div>
              <div>
                <div className="widget-name">MasaBot <span className="widget-ai-badge">AI</span></div>
                <div className="widget-status">
                  <span className="widget-status-dot"></span>
                  {isLoading ? 'Thinking...' : 'Online · MASA Forest Town'}
                </div>
              </div>
            </div>
            <button className="widget-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="widget-messages">
            {messages.map((m) => (
              <div key={m.id} className={`widget-msg-row ${m.role}`}>
                {m.role === 'assistant' && (
                  <img src="/images/ai_consultant.png" alt="" className="widget-msg-avatar" />
                )}
                <div className={`widget-bubble-msg ${m.role}`}>
                  {renderText(m.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="widget-msg-row assistant">
                <img src="/images/ai_consultant.png" alt="" className="widget-msg-avatar" />
                <div className="widget-bubble-msg assistant widget-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div className="widget-quick-row">
            {quickReplies.map((q, i) => (
              <button key={i} className="widget-quick-chip" onClick={() => append({ role: 'user', content: q })}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form className="widget-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              className="widget-input"
              placeholder="Ask a question..."
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button type="submit" className="widget-send" disabled={isLoading || !input.trim()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
