import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';

/* ─── Local streaming fetch (mirrors Chat.jsx handler) ──────────────────── */
const buildResponse = (messages) => {
  const last = messages[messages.length - 1]?.content?.toLowerCase() || '';
  if (last.match(/hair|laser|follicle/)) return 'Our **Diode Laser Hair Removal** starts from $89/session. Shave 24h before, avoid sun for 14 days. 6–8 sessions for permanent results. Want to book a free consultation?';
  if (last.match(/filler|lip|volume|dermalax|inject/)) return '**Dermalax HA Fillers** start from $399/syringe. Results last 6–12 months. A medical assessment with Dr. Hajjaj is required before treatment.';
  if (last.match(/ipl|photo|spot|pigment|redness/)) return '**IPL Photo Facial** targets sunspots and rosacea. From $149/session. Zero downtime — return to daily activities immediately!';
  if (last.match(/tight|sag|collagen|wrinkle/)) return '**Skin Tightening** uses thermal energy to stimulate collagen from $199/session. Results improve over 3–6 months.';
  if (last.match(/peel|acne|scar|pore/)) return '**Chemical Peels** resurface skin and target acne scarring from $99/session. Light peeling for 2–5 days post-treatment.';
  if (last.match(/hour|location|address|where|open/)) return '📍 425 McArthur Ave, Ottawa, ON\n⏰ Mon–Sat: 9AM–7PM\n📞 +1 (613) 555-0182';
  if (last.match(/price|cost|how much/)) return 'Laser Hair: from $89 · IPL Facial: from $149 · Skin Tightening: from $199 · Peels: from $99 · Fillers: from $399/syringe.';
  if (last.match(/hello|hi|hey|help/)) return 'Hi! I\'m DermaBot 👋 Ask me about our laser treatments, dermal fillers, pricing, or how to prepare for a procedure!';
  return 'I can help with laser hair removal, IPL facials, skin tightening, chemical peels, or Dermalax fillers. What would you like to know?';
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
      content: 'Hi! I\'m DermaBot 👋 Ask me anything about our laser treatments, dermal fillers, or clinic information!'
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

  const quickReplies = ['Hair removal prep', 'Filler pricing', 'Clinic hours'];

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
                <div className="widget-name">DermaBot <span className="widget-ai-badge">AI</span></div>
                <div className="widget-status">
                  <span className="widget-status-dot"></span>
                  {isLoading ? 'Thinking...' : 'Online · Dermalaz Clinic'}
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
