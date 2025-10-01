
import React, { useState, useEffect } from "react";
import LapTimePrediction from "./components/LapTimePrediction";
import RacePace from "./components/RacePace";
import About from "./components/About";
import Footer from "./components/footer";
import ConnectionTest from "./components/ConnectionTest";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Dashboard", id: "dashboard" },
  { label: "Lap Prediction", id: "lap" },
  { label: "Race Pace", id: "race" },
  { label: "Connection Test", id: "test" },
  { label: "About", id: "about" },
];

const AnimatedF1Car = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: "100vw", opacity: 1 }}
          exit={{ x: "100vw", opacity: 0 }}
          transition={{ 
            duration: 6,
            ease: "easeInOut"
          }}
          className="fixed top-20 z-10 pointer-events-none"
        >
          <svg width="80" height="24" viewBox="0 0 80 24" className="drop-shadow-lg">
            <defs>
              <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E10600" />
                <stop offset="50%" stopColor="#FF3333" />
                <stop offset="100%" stopColor="#E10600" />
              </linearGradient>
            </defs>
            <path d="M5 18 L20 12 L35 12 L50 6 L65 6 L75 12" stroke="url(#carGradient)" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="20" r="3" fill="#1a1a1a" stroke="#FACC15" strokeWidth="1.5" />
            <circle cx="60" cy="20" r="3" fill="#1a1a1a" stroke="#FACC15" strokeWidth="1.5" />
            <rect x="25" y="8" width="25" height="6" rx="2" fill="url(#carGradient)" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [section, setSection] = useState("dashboard");

  return (
    <div className="min-h-screen font-['Inter'] relative bg-white">
      {/* Professional Navigation Bar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="navbar"
      >
        <div className="navbar-container">
          <motion.div 
            className="navbar-brand"
            whileHover={{ scale: 1.05 }}
          >
            <span>
              F1 Race Pace Simulator
            </span>
          </motion.div>
          
          <ul className="navbar-nav">
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setSection(item.id)}
                  className={`nav-link ${section === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {section === "dashboard" && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="section-container"
            >
              <div className="page-header">
                <h1 className="page-title" style={{ color: 'var(--f1-red)' }}>
                  F1 Race Pace Simulator
                </h1>
                <p className="page-subtitle">
                  Professional Formula 1 lap time prediction and race pace analysis platform
                </p>
              </div>
              <div className="grid-2">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <LapTimePrediction />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <RacePace />
                </motion.div>
              </div>
            </motion.div>
          )}
          {section === "lap" && (
            <motion.div 
              key="lap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="section-container"
            >
              <LapTimePrediction />
            </motion.div>
          )}
          
          {section === "race" && (
            <motion.div 
              key="race"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="section-container"
            >
              <RacePace />
            </motion.div>
          )}
          
          {section === "test" && (
            <motion.div 
              key="test"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="section-container"
            >
              <ConnectionTest />
            </motion.div>
          )}
          
          {section === "about" && (
            <motion.div 
              key="about"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6 }}
              className="section-container"
            >
              <About />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
