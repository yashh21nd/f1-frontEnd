import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: "⚡",
      title: "Advanced ML Algorithms",
      description: "Machine learning models trained on historical F1 data for accurate lap time predictions"
    },
    {
      icon: "📊",
      title: "Interactive Visualizations",
      description: "Real-time charts and graphs powered by Chart.js for comprehensive race analysis"
    },
    {
      icon: "🏁",
      title: "Race Pace Simulation",
      description: "Complete race simulation with tire degradation and performance analysis"
    },
    {
      icon: "🔄",
      title: "Real-time Data",
      description: "Integration with Ergast F1 API for up-to-date circuit and driver information"
    }
  ];

  const techStack = [
    "React.js", "Vite", "Chart.js", "Framer Motion", 
    "Tailwind CSS", "Python", "FastAPI", "Ergast API"
  ];

  return (
    <div className="section-container">
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="page-header">
          <h1 className="page-title" style={{ color: 'var(--f1-red)' }}>
            About F1 Race Pace Simulator
          </h1>
          <p className="page-subtitle">
            Professional Formula 1 analytics platform built with cutting-edge technology
          </p>
        </motion.div>

        {/* Project Information Section */}
        <motion.div variants={itemVariants} className="about-project-card">
          <h2 className="about-project-title">
            The Project
          </h2>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              The <span className="font-bold text-red-600">F1 Race Pace Simulator</span> is a cutting-edge Formula 1 simulation platform that brings the excitement and precision of F1 racing to your fingertips. Built with modern web technologies and inspired by the official F1 digital ecosystem, this application delivers real-time lap time predictions and comprehensive race pace analysis.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Leveraging historical F1 data from the Ergast API, our sophisticated algorithms analyze driver performance, circuit characteristics, and tire compound dynamics to provide accurate predictions. The platform features an intuitive dashboard with interactive charts, real-time data visualization, and a sleek Formula 1-inspired design language.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're a seasoned F1 enthusiast, a data analyst, or simply curious about racing performance metrics, this platform offers deep insights into the strategic elements that define Formula 1 racing. From tire strategy optimization to lap time forecasting, every feature is designed to enhance your understanding of the sport's technical complexities.
            </p>
          </div>

          {/* Features Grid */}
          <div className="feature-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developer Information Section */}
        <motion.div variants={itemVariants} className="developer-card">
          <h2 className="developer-title">
            Meet the Developer
          </h2>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Hi! I'm <span className="font-bold text-blue-600">Yash Shinde</span>, a passionate full-stack developer and Formula 1 enthusiast. This project combines my love for motorsport with my expertise in modern web development and data science.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              With experience in React.js, Python, and machine learning, I built this platform to showcase the intersection of technology and motorsport. The goal was to create a professional-grade application that could provide real insights into F1 performance while maintaining an engaging user experience.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              This project demonstrates proficiency in frontend development, API integration, data visualization, and modern design principles. It's designed to be both functional for F1 analysis and impressive for potential employers and collaborators.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Technologies Used</h3>
            <div className="tech-stack-grid">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  className="tech-item"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.8 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Links */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Let's Connect</h3>
            <div className="contact-buttons">
              <motion.a
                href="https://github.com/yashh21nd"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-github"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/yash-shinde-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-linkedin"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </motion.a>
              
              <motion.a
                href="mailto:yashshinde.dev.work@gmail.com"
                className="contact-btn contact-btn-email"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.064l9.3 6.99 9.3-6.99h1.064A1.636 1.636 0 0 1 24 5.457z"/>
                </svg>
                Email
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;