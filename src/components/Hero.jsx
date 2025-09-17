import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-red-500 mb-4">
          F1 Lap Time Predictor
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Predict lap times & simulate race pace like a pro 🏎️
        </p>
        <a href="#lap-predictor" className="inline-block mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded text-white">
          Start Simulation
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;