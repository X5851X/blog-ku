'use client';

import { useState, useEffect, useRef } from "react";

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState('light');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);
  
  // Extended skills list with proficiency levels and icons
  const skills = [
    { name: 'JavaScript', level: 90, icon: '⚡', description: 'Modern ES6+ and frameworks' },
    { name: 'React', level: 85, icon: '⚛️', description: 'Component-based UI development' },
    { name: 'Next.js', level: 80, icon: '🔄', description: 'Server-side rendering & static generation' },
    { name: 'Tailwind CSS', level: 95, icon: '🎨', description: 'Utility-first styling approach' },
    { name: 'Node.js', level: 75, icon: '🟢', description: 'Backend development & API integration' }
  ];

  // Detect theme preference on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for dark mode preference
      const isDarkMode = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
      
      // Set up theme change listener
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e) => {
        setTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleThemeChange);
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }
  }, []);

  // Animation trigger when component becomes visible
  useEffect(() => {
    setIsVisible(true);
    
    // Optional: Create an intersection observer to trigger animations when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Function to get dynamic background color
  const getGradient = (index) => {
    // Creating slightly different gradient for each skill while maintaining theme
    const gradients = [
      'from-blue-100 to-blue-200',
      'from-blue-200 to-indigo-200',
      'from-indigo-100 to-blue-200',
      'from-sky-100 to-blue-200',
      'from-blue-100 to-sky-200'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section 
      ref={containerRef}
      className={`relative h-screen w-full flex flex-col items-center justify-center overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        {/* Animated background circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-indigo-100 opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className={`absolute inset-0 ${
          theme === 'dark' ? 'opacity-5' : 'opacity-10'
        }`} style={{
          backgroundImage: 'linear-gradient(to right, gray 1px, transparent 1px), linear-gradient(to bottom, gray 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-4xl px-6 py-16">
        {/* Section heading with animated underline */}
        <div className="text-center mb-16">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
          } bg-clip-text text-transparent`}
        >
          Keterampilan Saya
        </h2>
          
          {/* Animated underline */}
          <div className={`w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto transition-all duration-1000 ${
            isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'
          }`}></div>
        </div>
        
        {/* Skills showcase area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className={`relative group transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } hover:z-10`}
              style={{ animationDelay: `${idx * 0.15}s`, transitionDelay: `${idx * 0.1}s` }}
              onMouseEnter={() => setHoveredSkill(idx)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className={`relative bg-gradient-to-r ${getGradient(idx)} 
                text-blue-900 px-6 py-5 rounded-xl shadow-lg
                transition-all duration-300 hover:scale-105 hover:shadow-xl
                ${hoveredSkill === idx ? 'scale-105 shadow-xl' : ''}
                overflow-hidden`}
              >
                {/* Skill icon */}
                <div className="text-4xl mb-3 opacity-90">{skill.icon}</div>
                
                {/* Skill name */}
                <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                
                {/* Skill description - only visible on hover */}
                <p className={`text-sm text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3`}>
                  {skill.description}
                </p>
                
                {/* Skill proficiency meter */}
                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-out ${
                      isVisible ? 'w-full' : 'w-0'
                    }`} 
                    style={{ 
                      width: `${skill.level}%`,
                      transitionDelay: `${0.5 + idx * 0.2}s` 
                    }}
                  ></div>
                </div>
                
                {/* Percentage indicator */}
                <div className="text-xs text-right text-blue-700 font-medium mt-1">
                  {skill.level}%
                </div>
                
                {/* Background pulse effect - subtle animated rings */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-16 h-16 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 
                  transition-all duration-500 scale-0 group-hover:scale-[4]`}>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional decoration - floating tech symbols */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-float text-blue-300" style={{ animationDelay: '0s' }}>&#123; &#125;</div>
        <div className="absolute bottom-20 right-12 text-4xl opacity-20 animate-float text-blue-300" style={{ animationDelay: '1.5s' }}>&lt;/&gt;</div>
        <div className="absolute top-1/3 right-12 text-4xl opacity-20 animate-float text-blue-300" style={{ animationDelay: '0.8s' }}>( )</div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        
        .animate-pulse {
          animation: pulse 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}