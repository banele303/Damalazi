import React, { useState, useRef, useEffect } from 'react';

const systemPrompt = `You are Magalela Assistent, an expert structural project assistant for Magalela Trading & Projects located in Midrand, South Africa. You specialize in answering questions about:
- Composite Decking (Eva-Last, MoistureShield) starting at R1,650/m2
- Timber Decking (Garapa, Balau, Pine) starting at R1,800/m2
- Swimming Pools (Concrete Marbelite, Fibreglass) starting at R85,000
- Custom Timber Pergolas starting at R12,000
- SANS 10400 building regulations and safety compliances.
Contact: +27 87 510 1772, info@magalelatrading.co.za
Keep answers concise, extremely helpful, and format with markdown/bullet points where necessary. Never mention that you are an AI.`;

const buildFallbackResponse = (userMessages) => {
  const lastMsg = userMessages[userMessages.length - 1]?.content?.toLowerCase() || '';

  if (lastMsg.match(/composite|eva-last|moistureshield|innofibe|plastic deck/)) {
    return `**Premium Composite Decking** is our most requested outdoor solution:\n\n• **Zero Maintenance:** No sanding, oiling, or sealing required.\n• **High Durability:** 15 to 25-year manufacturer warranties against warping and rotting.\n• **Neat Installation:** Hidden clip system for a clean, screw-free finish.\n• **Cost:** Starts from **R1,650 per m²** installed (includes subframe and labor).`;
  } else if (lastMsg.match(/timber|wood|balau|garapa|pine|hardwood|softwood/)) {
    return `**Natural Wood Decking Options at Magalela:**\n\n• **Garapa (Hardwood):** Highly durable golden timber. From R1,800/m².\n• **Balau (Hardwood):** Classic reddish-brown hardwood. Requires annual oiling. From R1,900/m².\n• **Treated Pine (Softwood):** Cost-effective structural timber treated to H3/H4 specifications. From R1,100/m².`;
  } else if (lastMsg.match(/pool|swimming pool|marbelite|fibreglass|fiberglass/)) {
    return `**Swimming Pool Construction at Magalela:**\n\n• **Concrete Marbelite Pools:** Custom shapes, concrete shells, marbelite plaster finishes. From R85,000.\n• **Fibreglass Pools:** Pre-formed shells, fast 1-2 week installation. From R70,000.\n• **SANS Compliance:** We manage structural engineer sign-offs and soil tests.`;
  } else if (lastMsg.match(/pergola|gazebo|shading|roof/)) {
    return `**Custom Pergolas & Shading:**\n\n• **Framing:** Treated structural Pine, Balau, or Garapa hardwood.\n• **Options:** Angled slatted timber for shade, or clear polycarbonate roofing for waterproofing.\n• **Pricing:** Custom builds starting from **R12,000**.`;
  } else if (lastMsg.match(/sans|regulation|code|law|safety|height|engineer|council|municipal/)) {
    return `**SANS 10400 Regulations (South Africa):**\n\n• **Elevated Decks:** Any deck raised over 300mm requires plans. Over 1.5m requires structural engineer sign-off.\n• **Safety Handrails:** Decks raised over 600mm must have 1.0m high balustrades with vertical slats spaced max 100mm apart.\n• **Pool Fencing:** Must be min 1.2m high with self-closing, self-latching gates.`;
  } else if (lastMsg.match(/price|cost|how much|rate|estimate/)) {
    return `**Quick Price Guide (ZAR):**\n\n• Composite Decking: R1,650 – R2,400 / m².\n• Hardwood Decking: R1,800 – R2,300 / m².\n• Pools: From R85,000.\n• Pergolas: From R12,000.\n\nUse our interactive **Cost Calculator** on the navbar for a detailed breakdown!`;
  } else if (lastMsg.match(/location|address|hours|where|office|midrand|gauteng/)) {
    return `📍 **Office Address:** Block G, 3rd Floor, Hertford Office Park, 90 Bekker Rd, Vorna Valley, Midrand, 1686\n• **Hours:** Mon-Fri 8AM-5PM, Sat 9AM-1PM\n• **Phone:** +27 87 510 1772\n• **Email:** info@magalelatrading.co.za`;
  } else if (lastMsg.match(/hello|hi|hey|good/)) {
    return `Welcome to **Magalela AI Construction Consult** 👋\n\nHow can I help you plan your outdoor space today?\n\n• 🪵 Composite vs Timber decking specs\n• 🏊 Swimming Pools concrete/fibreglass\n• 🏡 Pergolas & building extensions\n• 📏 SANS 10400 Safety Codes`;
  }
  return `Thank you for your question. As Magalela's project assistant, I can help you with composite/timber decking, custom pools, timber pergolas, and SANS compliance. Could you please specify which service you'd like details on?`;
};

const renderText = (text) =>
  text.split('\n').map((line, i) => (
    <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '&nbsp;' }} style={{ margin: '0 0 4px 0', lineHeight: 1.4 }} />
  ));

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'w-init',
      role: 'assistant',
      content: "Hi! I'm Magalela Assistent 👋 I'm your AI structural project assistant. Ask me about composite/timber decking, swimming pools, pergolas, safety regulations, or our Midrand office!"
    }
  ]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  const handleOpen = () => setOpen(true);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsg = { id: Math.random().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const conversationHistory = [...messages, userMsg];
    let reply = "";
    let successfullyFetched = false;

    // 2. Fetch response from Puter or Fallback
    if (typeof window !== 'undefined' && window.puter && window.puter.ai) {
      try {
        const msgs = [{ role: 'system', content: systemPrompt }, ...conversationHistory.map(m => ({ role: m.role, content: m.content }))];
        const response = await window.puter.ai.chat(msgs);
        reply = typeof response === 'string' ? response : (response?.message?.content || JSON.stringify(response));
        successfullyFetched = true;
      } catch (err) {
        console.error('Puter AI error, using fallback:', err);
      }
    }

    if (!successfullyFetched) {
      reply = buildFallbackResponse(conversationHistory);
    }

    // 3. Add empty placeholder for streaming effect
    const assistantMsgId = Math.random().toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    // 4. Stream typing effect
    const tokens = reply.split(/(?=\s+)/);
    let currentText = '';
    for (let i = 0; i < tokens.length; i++) {
      currentText += tokens[i];
      setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: currentText } : m));
      await new Promise(resolve => setTimeout(resolve, 15));
    }

    setIsLoading(false);
    if (!open) {
      setUnread(n => n + 1);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    const text = inputVal;
    setInputVal('');
    sendMessage(text);
  };

  return (
    <>
      {!open && (
        <button 
          className="widget-bubble" 
          onClick={handleOpen} 
          aria-label="Open chat" 
          style={{ padding: '6px', background: '#fff', border: '2px solid var(--accent-primary)', overflow: 'hidden' }}
        >
          <img 
            src="/images/magalela_logo.png" 
            alt="Magalela Chat" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} 
          />
          {unread > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent-secondary)', color: '#000', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>{unread}</span>}
        </button>
      )}

      {open && (
        <div className="widget-panel">
          <div className="widget-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: '1px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2px' }}>
                  <img src="/images/magalela_logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                </div>
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: '#00E5FF', borderRadius: '50%', border: '2px solid var(--color-border)' }}></span>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Magalela Assistent <span style={{ fontSize: '0.65rem', background: 'var(--accent-primary)', color: '#000', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' }}>AI</span></div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{isLoading ? 'Puter AI Thinking...' : 'Online · Midrand Office'}</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#fff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div className="widget-messages">
            {messages.map((m) => (
              <div key={m.id} className={`widget-msg-row ${m.role}`}>
                <div className={`widget-bubble-msg ${m.role}`}>
                  {renderText(m.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="widget-msg-row assistant">
                <div className="widget-bubble-msg assistant" style={{ padding: '12px 20px', display: 'flex', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'pulse 1.5s infinite' }}></div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'pulse 1.5s infinite 0.2s' }}></div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'pulse 1.5s infinite 0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form className="widget-input-row" onSubmit={handleFormSubmit}>
            <input type="text" className="widget-input" placeholder="Ask Puter AI..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} disabled={isLoading} />
            <button type="submit" className="widget-send" disabled={isLoading || !inputVal.trim()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
