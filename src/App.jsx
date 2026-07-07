import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Quiz from './components/Quiz';
import Science from './components/Science';
import PreCare from './components/PreCare';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Chat from './components/Chat';
import ChatWidget from './components/ChatWidget';
import './App.css';

function App() {
  const [view, setView] = useState('landing');

  useEffect(() => {
    if (view !== 'landing') return;

    const timer = setTimeout(() => {
      const fadeElements = document.querySelectorAll('.fade-in-up');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('active');
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
      );
      fadeElements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [view]);

  return (
    <>
      <Navbar setView={setView} currentView={view} />

      {view === 'landing' ? (
        <>
          <main>
            <Hero />
            <About />
            <Services />
            <BeforeAfter />
            <Quiz />
            <Science />
            <PreCare />
            <Blog />
            <Testimonials />
            <Booking />
          </main>
          <Footer />
          {/* Floating Chat Widget – always visible on landing */}
          <ChatWidget />
        </>
      ) : (
        <>
          <Chat />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
