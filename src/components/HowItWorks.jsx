import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <section className="p-8 bg-zinc-950 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-red-400 mb-4">How It Works</h2>
        <p className="text-gray-300">
          This tool uses real historical F1 data from the Ergast API. It predicts lap times based on
          the driver’s past performance at a given circuit, adjusts for tyre compound, and adds
          random variation to simulate full race pace. The simulation helps visualize expected race
          performance before race day!
        </p>
      </motion.div>
    </section>
  );
};

export default HowItWorks;

