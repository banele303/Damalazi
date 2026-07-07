import React, { useState, useRef, useEffect } from 'react';

const presetQueries = [
  { text: 'How do I prepare for laser hair removal?', keyword: 'laser' },
  { text: 'What is the pricing for Dermalax fillers?', keyword: 'dermalax' },
  { text: 'What is the recovery time for IPL facials?', keyword: 'ipl' },
  { text: 'Where is the clinic and what are your hours?', keyword: 'location' }
];

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am the Dermalaz clinical assistant. How can I help you with your skincare, laser hair removal, or Dermalax filler questions today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleBotResponse = (userInput) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const inputLower = userInput.toLowerCase();
      let replyText = '';

      if (inputLower.includes('laser') || inputLower.includes('prepare') || inputLower.includes('prep') || inputLower.includes('shave')) {
        replyText = 'To prepare for Diode Laser Hair Removal:\n1. Shave the treatment zone 24 hours prior (do NOT pluck, wax, or thread).\n2. Avoid sun exposure and tanning beds for 14 days before.\n3. Arrive with clean skin (no lotions, oils, or deodorants).';
      } else if (inputLower.includes('filler') || inputLower.includes('dermalax') || inputLower.includes('price') || inputLower.includes('cost')) {
        replyText = 'We use monophasic Hyaluronic Acid Dermalax fillers starting at $399 per syringe. Common areas include lips, cheeks, and nasolabial folds. An assessment with Dr. Hajjaj is required to check suitability.';
      } else if (inputLower.includes('ipl') || inputLower.includes('photo') || inputLower.includes('rejuvenation') || inputLower.includes('sunspot')) {
        replyText = 'IPL Photo Facials target sunspots, freckles, and redness. Spots will darken like "coffee grounds" and flake off in 3-7 days. Pre-care requires stopping retinol 5 days before, and post-care requires strict SPF 50+.';
      } else if (inputLower.includes('hour') || inputLower.includes('address') || inputLower.includes('contact') || inputLower.includes('location') || inputLower.includes('phone') || inputLower.includes('where')) {
        replyText = 'Dermalaz Laser Clinic is located at 425 McArthur Ave, Unit 10, Ottawa, ON K1K 1G5.\nWe are open Monday to Saturday from 9:00 AM to 7:00 PM.\nYou can reach us at +1 (613) 555-0182 or via book consultation section on main site.';
      } else {
        replyText = 'I can assist you with details about Diode Laser Hair Removal, IPL Photo Facials, Dermalax fillers, pre-care steps, or booking hours. What specific treatment are you interested in?';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const newUserMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    handleBotResponse(textToSend);
  };

  return (
    <section className="chat-console-wrapper">
      {/* Scope isolated styles for Chat */}
      <style dangerouslySetInnerHTML={{ __html: `
        .chat-console-wrapper {
          display: flex;
          height: calc(100vh - var(--header-height));
          margin-top: var(--header-height);
          background-color: var(--color-bg-deep);
          color: var(--color-text-pri);
          font-family: var(--font-body);
        }
        
        .chat-sidebar {
          width: 320px;
          border-right: 1px solid var(--color-border);
          background-color: rgba(16, 24, 30, 0.4);
          display: flex;
          flex-direction: column;
          padding: 32px 24px;
        }

        .chat-avatar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }

        .chat-avatar-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid var(--color-gold-base);
          box-shadow: 0 0 20px var(--color-border-glow);
          margin-bottom: 16px;
          object-fit: cover;
        }

        .chat-avatar-container h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text-pri);
          margin-bottom: 4px;
        }

        .chat-avatar-container span {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-gold-base);
          font-weight: 600;
        }

        .chat-preset-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          margin-bottom: 16px;
          font-weight: 700;
        }

        .chat-preset-btn {
          text-align: left;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          padding: 12px 16px;
          font-size: 0.85rem;
          color: var(--color-text-sec);
          margin-bottom: 12px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .chat-preset-btn:hover {
          background: rgba(197, 168, 128, 0.05);
          border-color: var(--color-gold-base);
          color: var(--color-text-pri);
        }

        .chat-main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          background-color: var(--color-bg-sec);
        }

        .chat-header-bar {
          padding: 24px 40px;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: rgba(8, 12, 14, 0.3);
        }

        .chat-header-info h3 {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 400;
        }

        .chat-status {
          font-size: 0.75rem;
          color: var(--color-laser);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background-color: var(--color-laser);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--color-laser);
          animation: status-pulse 1.8s infinite;
        }

        @keyframes status-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .chat-messages-container {
          flex-grow: 1;
          padding: 40px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .chat-bubble-row {
          display: flex;
          width: 100%;
        }

        .chat-bubble-row.user {
          justify-content: flex-end;
        }

        .chat-bubble-row.bot {
          justify-content: flex-start;
        }

        .chat-bubble {
          max-width: 65%;
          padding: 16px 20px;
          border-radius: 8px;
          font-size: 0.95rem;
          line-height: 1.5;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .chat-bubble-row.user .chat-bubble {
          background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
          color: var(--color-bg-deep);
          border-bottom-right-radius: 1px;
          font-weight: 500;
        }

        .chat-bubble-row.bot .chat-bubble {
          background-color: var(--color-bg-card);
          border: 1px solid var(--color-border);
          color: var(--color-text-pri);
          border-bottom-left-radius: 1px;
          white-space: pre-line;
        }

        .chat-time {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          margin-top: 6px;
          display: block;
          text-align: right;
        }

        .chat-bubble-row.user .chat-time {
          color: rgba(8, 12, 14, 0.5);
        }

        /* Typing indicator */
        .typing-bubble {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 12px 20px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background-color: var(--color-text-muted);
          border-radius: 50%;
          animation: typing-bounce 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }

        .chat-input-bar {
          padding: 24px 40px;
          background-color: rgba(8, 12, 14, 0.5);
          border-top: 1px solid var(--color-border);
        }

        .chat-input-form {
          display: flex;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          overflow: hidden;
          background-color: rgba(8, 12, 14, 0.8);
          padding: 4px;
        }

        .chat-input-form input {
          flex-grow: 1;
          padding: 14px 20px;
          font-size: 0.95rem;
          color: var(--color-text-pri);
          background: none;
          border: none;
        }

        .chat-input-form button {
          padding: 0 24px;
          background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
          color: var(--color-bg-deep);
          font-weight: 700;
          cursor: pointer;
          border-radius: 4px;
          transition: var(--transition-fast);
        }

        .chat-input-form button:hover {
          background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold-base));
        }

        @media (max-width: 768px) {
          .chat-console-wrapper {
            flex-direction: column;
          }
          
          .chat-sidebar {
            width: 100%;
            height: auto;
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            padding: 20px;
          }

          .chat-avatar-container {
            margin-bottom: 20px;
            padding-bottom: 16px;
          }

          .chat-avatar-img {
            width: 60px;
            height: 60px;
            margin-bottom: 8px;
          }

          .chat-preset-title, .chat-preset-btn {
            display: none; /* hide preset buttons on mobile sidebar to save vertical space */
          }

          .chat-header-bar {
            padding: 16px 20px;
          }

          .chat-messages-container {
            padding: 20px;
          }

          .chat-bubble {
            max-width: 85%;
          }

          .chat-input-bar {
            padding: 16px 20px;
          }
        }
      ` }} />

      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-avatar-container">
          <img 
            src="/images/ai_consultant.png" 
            alt="AI Aesthetics Consultant" 
            className="chat-avatar-img" 
          />
          <h4>DermaBot</h4>
          <span>Clinical AI Assistant</span>
        </div>
        
        <h5 className="chat-preset-title">Recommended Topics</h5>
        {presetQueries.map((q, idx) => (
          <button 
            key={idx} 
            className="chat-preset-btn"
            onClick={() => handleSendMessage(q.text)}
          >
            {q.text}
          </button>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {/* Chat Header */}
        <div className="chat-header-bar">
          <div className="chat-header-info">
            <h3>Dermalaz AI skin consult</h3>
            <div className="chat-status">
              <span className="status-dot"></span>
              <span>Ask about prep, pricing, or guidelines</span>
            </div>
          </div>
          <a href="/" className="btn btn-secondary nav-cta" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
            Main Site
          </a>
        </div>

        {/* Chat Message List */}
        <div className="chat-messages-container">
          {messages.map((m) => (
            <div key={m.id} className={`chat-bubble-row ${m.sender}`}>
              <div className="chat-bubble">
                {m.text}
                <span className="chat-time">{m.time}</span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-bubble-row bot">
              <div className="chat-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="chat-input-bar">
          <form 
            className="chat-input-form" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
          >
            <input 
              type="text" 
              placeholder="Ask anything about our laser treatments or Dermalax fillers..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping}>Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}
