import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yashh21nd',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yash-shinde-dev',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:yashshinde.dev.work@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.064l9.3 6.99 9.3-6.99h1.064A1.636 1.636 0 0 1 24 5.457z"/>
        </svg>
      )
    }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="footer"
    >
      <div className="footer-content">
        
        {/* Brand Section */}
        <div className="footer-section">
          <motion.div 
            className="flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl font-bold text-white">
              F1 Race Pace Simulator
            </span>
          </motion.div>
          <p>
            Professional Formula 1 lap time prediction and race pace simulation platform built with modern web technologies.
          </p>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3>Connect With Developer</h3>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                title={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Technical Info */}
        <div className="footer-section">
          <h3>Built With</h3>
          <ul className="footer-links">
            <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React.js & Vite</a></li>
            <li><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS</a></li>
            <li><a href="https://fastapi.tiangolo.com" target="_blank" rel="noopener noreferrer">Python & FastAPI</a></li>
            <li><a href="https://www.framer.com/motion" target="_blank" rel="noopener noreferrer">Framer Motion</a></li>
            <li><a href="https://www.chartjs.org" target="_blank" rel="noopener noreferrer">Chart.js</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© 2025 F1 Analytics Hub. Built with for F1 fans worldwide. • Powered by Ergast F1 API • 
        <motion.a 
          href="https://github.com/yashh21nd" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: 'var(--f1-red)', marginLeft: '8px' }}
          whileHover={{ scale: 1.05 }}
        >
          @yashh21nd
        </motion.a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
