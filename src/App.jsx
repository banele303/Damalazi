import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Calculator from './components/Calculator';
import Portfolio from './components/Portfolio';
import ServicePage from './components/ServicePage';
import QuoteInvoiceGenerator from './components/QuoteInvoiceGenerator';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import QuoteRequest from './components/QuoteRequest';
import Footer from './components/Footer';
import Chat from './components/Chat';
import ChatWidget from './components/ChatWidget';
import './App.css';

function App() {
  const [view, setView] = useState('landing');
  const [serviceId, setServiceId] = useState('composite-decking');
  const [quoteData, setQuoteData] = useState(null);

  // Auto route matching for /invoice or #/invoice path triggers
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('invoice') || hash.includes('invoice')) {
      setView('visualizer');
    }
  }, []);

  // Setup fade-in scroll animation triggers when landing view is active
  useEffect(() => {
    if (view !== 'landing') return;

    const timer = setTimeout(() => {
      const fadeElements = document.querySelectorAll('.fade-in-up');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
      );
      fadeElements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [view]);

  // Direct view rendering
  const renderViewContent = () => {
    switch (view) {
      case 'landing':
        return (
          <>
            <Hero setView={setView} />
            <About setView={setView} />
            <Services setView={setView} setServiceId={setServiceId} />
            <BeforeAfter />
            <Portfolio />
            <Blog />
            <Testimonials />
          </>
        );
      case 'about':
        return (
          <>
            <About setView={setView} />
            <Testimonials />
          </>
        );
      case 'projects':
        return <Portfolio />;
      case 'service-detail':
        return <ServicePage serviceId={serviceId} setView={setView} />;
      case 'calculator':
        return <Calculator setView={setView} setQuoteData={setQuoteData} />;
      case 'visualizer':
        return <QuoteInvoiceGenerator setView={setView} setQuoteData={setQuoteData} />;
      case 'contact':
      case 'quote':
        return <QuoteRequest quoteData={quoteData} setQuoteData={setQuoteData} />;
      case 'chat':
        return <Chat />;
      default:
        return <Hero setView={setView} />;
    }
  };

  return (
    <>
      {view !== 'visualizer' && (
        <Navbar setView={setView} currentView={view} setServiceId={setServiceId} />
      )}

      <main style={{ minHeight: view === 'visualizer' ? '100vh' : 'calc(100vh - var(--header-height) - 100px)' }}>
        {renderViewContent()}
      </main>

      {view !== 'visualizer' && (
        <Footer setView={setView} setServiceId={setServiceId} />
      )}
      
      {/* Floating Chat Widget – visible on all pages except the full Chat page and visualizer */}
      {view !== 'chat' && view !== 'visualizer' && <ChatWidget />}
    </>
  );
}

export default App;
