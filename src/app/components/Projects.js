'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Human Resource Information System',
    description:
      'Sistem Informasi Sumber Daya Manusia (HRIS) adalah aplikasi berbasis web yang dirancang untuk membantu perusahaan dalam mengelola data karyawan',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'jQuery', 'AJAX'],
    link: 'https://github.com/X5851X?tab=repositories',
    image: '/images/dashboard.png',
  },
];

export default function Projects() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkMode =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e) => {
        setTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleThemeChange);
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }
  }, []);

  return (
    <div
      className={`relative w-full h-screen flex flex-col items-center justify-center px-4 py-16 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div
        className={`absolute inset-0 z-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30'
            : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'
        }`}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 z-10"
      >
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
          } bg-clip-text text-transparent`}
        >
          My Project
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Explore my HRIS implementation project
        </p>
      </motion.div>

      <div className="z-10 flex justify-center">
        {projects.map((project) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-full max-w-md rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="relative overflow-hidden group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3
                className={`text-xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 text-xs rounded-full ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
