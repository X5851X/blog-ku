'use client';

import { useState, useEffect } from "react";

export default function Writing() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [theme, setTheme] = useState('light');
  
  const articles = [
    {
      id: 1,
      url: "https://www.linkedin.com/posts/activity-7226957896872255489-sJOR?utm_source=share&utm_medium=member_desktop&rcm=ACoAADkOffcBvFNclC16JdEAMJ1t1ud4jy-D0vo",
      title: "Artikel LinkedIn 1",
      color: "from-blue-400 to-purple-500"
    },
    {
      id: 2,
      url: "https://www.linkedin.com/posts/activity-7186023223774347264-aO69?utm_source=share&utm_medium=member_desktop&rcm=ACoAADkOffcBvFNclC16JdEAMJ1t1ud4jy-D0vo",
      title: "Artikel LinkedIn 2",
      color: "from-purple-400 to-pink-500"
    }
  ];

  useEffect(() => {
    // Detect system theme preference
    if (typeof window !== 'undefined') {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
      
      // Listen for theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e) => {
        setTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleThemeChange);
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }
  }, []);

  useEffect(() => {
    // Trigger entrance animations after component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative min-h-screen py-24 px-6 overflow-hidden ${
      theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900' : 'bg-gradient-to-br from-white via-indigo-50/30 to-white'
    }`}>
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl animate-float-medium"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400/20 to-yellow-400/20 blur-xl animate-float-fast"></div>
      
      {/* Notebook paper effect in the background */}
      <div className="absolute inset-0 bg-notebook-lines opacity-5 pointer-events-none"></div>
      
      {/* Main content wrapper */}
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header with animated underline */}
        <div className={`text-center mb-16 transition-all duration-1000 ${animationComplete ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
          }`}
        >
          Tulisan
        </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Berikut adalah beberapa artikel yang saya tulis di LinkedIn.
          </p>
        </div>
        
        {/* Articles with hover and staggered animation effects */}
        <div className="space-y-6 mb-12">
          {articles.map((article, index) => (
            <div 
              key={article.id}
              className={`transition-all duration-1000 ${
                animationComplete ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
              }`} 
              style={{ transitionDelay: `${300 + (index * 150)}ms` }}
              onMouseEnter={() => setActiveIndex(article.id)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block relative overflow-hidden rounded-xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* Animated gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${article.color} opacity-0 transition-opacity duration-300 ${
                  activeIndex === article.id ? 'opacity-100' : ''
                }`} style={{ zIndex: -1 }}></div>
                
                {/* Inner content with 1px border offset for gradient effect */}
                <div className={`relative m-0.5 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } p-6 flex items-center justify-between z-10`}>
                  <div className="flex items-center">
                    {/* LinkedIn Logo SVG */}
                    <div className={`mr-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                      activeIndex === article.id ? 'scale-110' : ''
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                           className={`w-6 h-6 ${activeIndex === article.id ? 'text-blue-500' : 'text-gray-500'}`} 
                           fill="currentColor">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                      </svg>
                    </div>
                    
                    {/* Article title */}
                    <span className={`font-medium text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>{article.title}</span>
                  </div>
                  
                  {/* Arrow with animation */}
                  <div className={`text-xl transition-all duration-300 transform ${
                    activeIndex === article.id 
                      ? 'translate-x-0 text-blue-500' 
                      : '-translate-x-2 opacity-70'
                  } ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    →
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        
        {/* "View all" button with hover effect */}
        <div className={`text-center transition-all duration-1000 ${
          animationComplete ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: `${300 + (articles.length * 150) + 150}ms` }}>
          <a 
            href="https://www.linkedin.com/in/risfandhiani/recent-activity/all/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center px-8 py-3 rounded-full font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:translate-y-px`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            Lihat Semua Artikel Saya di LinkedIn
          </a>
        </div>
      </div>
      
      {/* Global animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        .bg-notebook-lines {
          background-image: linear-gradient(transparent 31px, ${theme === 'dark' ? '#374151' : '#E5E7EB'} 31px),
                            linear-gradient(90deg, transparent 31px, ${theme === 'dark' ? '#374151' : '#E5E7EB'} 31px);
          background-size: 32px 32px;
        }
      `}</style>
    </section>
  );
}