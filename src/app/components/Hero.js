"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [theme, setTheme] = useState('light');

  const backgroundImages = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg"
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handleThemeChange);
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 700);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            currentImageIndex === index 
              ? isTransitioning 
                ? "opacity-0" 
                : "opacity-100" 
              : "opacity-0"
          }`}
          style={{ 
            backgroundImage: `url(${img})`,
            zIndex: 0,
            transform: 'scale(1.05)',
            transformOrigin: 'center'
          }}
        />
      ))}

      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-900/70 via-purple-900/70 to-pink-900/70' 
          : 'bg-gradient-to-br from-blue-400/50 via-purple-400/50 to-pink-400/50'
      } backdrop-blur-sm z-10`}></div>

      <div className="relative z-20 text-center px-6 md:px-8 max-w-4xl mx-auto">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
        } bg-clip-text text-transparent mb-6 opacity-0 animate-fadeIn`} style={{ animationDelay: "0.6s" }}>
          Risfandhiani Triara Putri
        </h1>

        <div className="w-28 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 opacity-0 animate-fadeIn" style={{ animationDelay: "0.9s" }}></div>

        <a 
          href="/Risfandhiani Triara Putri-CV.pdf" 
          download 
          className="relative z-20 mt-8 inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg opacity-0 animate-fadeIn"
          style={{ animationDelay: "1.5s" }}
        >
          Download My CV
        </a>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}
