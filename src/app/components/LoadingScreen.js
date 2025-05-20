'use client';

import { useEffect, useState } from 'react';

const greetings = ["Hello", "Hola", "Bonjour", "Hallo", "Ciao", "こんにちは", "안녕하세요", "Salam", "Halo", "Hej", "Привет", "مرحبا"];

export default function LoadingScreen() {
  const [greetIndex, setGreetIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const greetInterval = setInterval(() => {
      setGreetIndex((prev) => (prev + 1) % greetings.length);
    }, 400);

    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    const hideTimeout = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearInterval(greetInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background with gradient and animated patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Animated floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-32 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-32 left-40 w-24 h-24 bg-pink-200 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-indigo-200 rounded-full opacity-20 animate-bounce"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern z-0 opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Loading image with enhanced styling */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white rounded-full shadow-2xl opacity-80 animate-pulse"></div>
          <div className="relative p-4 bg-white rounded-full shadow-xl">
            <img 
              src="/images/loading.gif" 
              alt="Loading" 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          {/* Rotating ring around image */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>

        {/* Greeting text with enhanced styling */}
        <div className="text-center mb-6">
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            {greetings[greetIndex]}!
          </p>
          <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Memuat blog...</p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-10 left-10">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      </div>
      <div className="absolute top-16 right-16">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="absolute bottom-10 left-16">
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute bottom-16 right-10">
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        
        .animate-loading-bar {
          animation: loading-bar 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}