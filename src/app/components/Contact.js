'use client';

import { useState, useEffect } from "react";

export default function Contact() {
  const [theme, setTheme] = useState('light');
  const [animationComplete, setAnimationComplete] = useState(false);
  
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
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const contactLinks = [
    {
      name: "Email",
      url: "mailto:risfandhiani@gmail.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/X5851X",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/risfandhiani",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden">
      {/* Solid background - adapts to theme */}
      <div className={`absolute inset-0 ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'
      }`}></div>
      
      {/* Semi-transparent overlay - adapts to theme */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-900/70 via-purple-900/70 to-pink-900/70' 
          : 'bg-gradient-to-br from-blue-400/50 via-purple-400/50 to-pink-400/50'
      } backdrop-blur-sm z-10`}></div>
      
      {/* Content wrapper */}
      <div className="relative z-20 max-w-3xl w-full mx-auto">
        <div className={`text-center transition-all duration-700 ${
          animationComplete ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>Kontak</h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8"></div>
          
          <p className={`text-lg mb-12 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Hubungi saya melalui:
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {contactLinks.map((link, index) => (
              <a 
                key={link.name}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                } shadow-md hover:shadow-lg w-full sm:w-auto`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}