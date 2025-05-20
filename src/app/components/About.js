'use client';

import { useState, useEffect } from 'react';

export default function About() {
  const [theme, setTheme] = useState('light');
  
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

  return (
    <section className={`min-h-screen flex items-center justify-center py-16 px-6 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image with Animation */}
          <div className="flex justify-center">
            <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden 
              ${theme === 'dark' ? 'shadow-blue-400/30' : 'shadow-blue-500/30'} 
              shadow-xl transform hover:scale-105 transition-all duration-500`}>
              {/* Profile image */}
              <img 
                src="/images/photo.jpeg" 
                alt="Risfandhiani Triara Putri" 
                className="w-full h-full object-cover"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-70 blur-md"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full opacity-70 blur-md"></div>
              
              {/* Border effect */}
              <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
            </div>
          </div>
          
          {/* About Content */}
          <div className={`text-left ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
            <div className="inline-block">
              <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Tentang Saya
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"></div>
            </div>
            
            <p className={`text-lg mb-6 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Halo! Saya adalah <span className="font-semibold">Risfandhiani Triara Putri</span>, seorang Cloud Engineer dan Web Developer dengan pengalaman dalam membuat solusi berbasis cloud dan pengembangan web yang inovatif.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className={`px-5 py-3 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-blue-400 border border-blue-400/30' 
                  : 'bg-white text-blue-600 shadow-md'
              }`}>
                <span className="font-medium">Cloud Engineer</span>
              </div>
              
              <div className={`px-5 py-3 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-purple-400 border border-purple-400/30' 
                  : 'bg-white text-purple-600 shadow-md'
              }`}>
                <span className="font-medium">Web Development</span>
              </div>
              
              <div className={`px-5 py-3 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-pink-400 border border-pink-400/30' 
                  : 'bg-white text-pink-600 shadow-md'
              }`}>
                <span className="font-medium">UI/UX Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}