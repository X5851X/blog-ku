'use client';

import { useEffect, useState, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Writing from './components/Writing';
import Contact from './components/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const sections = [
    { component: Hero, id: 'hero' },
    { component: About, id: 'about' },
    { component: Projects, id: 'projects' },
    { component: Skills, id: 'skills' },
    { component: Writing, id: 'writing' },
    { component: Contact, id: 'contact' }
  ];

  // Single ref to control if scrolling is allowed
  const canScroll = useRef(true);
  const lastScrollTime = useRef(Date.now());
  const touchStartY = useRef(null);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Section change handler - significantly simplified
  const changeSection = (newSection) => {
    // Don't do anything if already transitioning or invalid section
    if (!canScroll.current || newSection < 0 || newSection >= sections.length) return;
    
    // Lock scrolling immediately
    canScroll.current = false;
    setTransitioning(true);
    
    // Set timeout for fade out
    setTimeout(() => {
      // Change the section
      setCurrentSection(newSection);
      
      // Set timeout for fade in
      setTimeout(() => {
        setTransitioning(false);
        
        // Add delay before allowing next scroll
        setTimeout(() => {
          canScroll.current = true;
        }, 800); // Longer cooldown to fix rapid scrolling issues
        
      }, 300);
    }, 300);
  };

  // Handle scroll input from any source (wheel, touch, keyboard)
  const handleScrollInput = (direction) => {
    const now = Date.now();
    // Force minimum time between scroll actions
    if (!canScroll.current || now - lastScrollTime.current < 1000) {
      return;
    }
    
    lastScrollTime.current = now;
    
    if (direction === 'down' && currentSection < sections.length - 1) {
      changeSection(currentSection + 1);
    } else if (direction === 'up' && currentSection > 0) {
      changeSection(currentSection - 1);
    }
  };

  // Set up event listeners
  useEffect(() => {
    if (loading) return;

    // Wheel event handler with strong debounce
    const handleWheel = (e) => {
      e.preventDefault();
      handleScrollInput(e.deltaY > 0 ? 'down' : 'up');
    };

    // Touch controls for mobile
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEnd;
      
      // Use a more generous threshold to avoid accidental scrolling
      if (Math.abs(diff) > 70) {
        handleScrollInput(diff > 0 ? 'down' : 'up');
      }
      
      touchStartY.current = null;
    };

    // Keyboard navigation (arrow keys)
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleScrollInput('down');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleScrollInput('up');
      }
    };

    // Prevent default body scrolling completely
    const preventScroll = (e) => {
      e.preventDefault();
    };

    // Add event listeners with proper options
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', preventScroll, { passive: false });
    
    // Lock body scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      // Remove all event listeners
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', preventScroll);
      
      // Restore normal scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [currentSection, loading, sections.length]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <div 
        style={{ 
          height: '100vh', 
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: `translateY(-${currentSection * 100}vh)`
        }}
      >
        {sections.map((section, index) => {
          const Component = section.component;
          return (
            <div 
              key={section.id}
              id={section.id}
              style={{
                height: '100vh',
                width: '100%',
                opacity: transitioning ? 0 : 1,
                transition: 'opacity 0.3s ease',
                position: 'relative'
              }}
            >
              <Component />
            </div>
          );
        })}
      </div>
      
      {/* Navigation Dots - same as original */}
      <div style={{
        position: 'fixed',
        right: '25px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 100
      }}>
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => changeSection(index)}
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: currentSection === index ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </main>
  );
}