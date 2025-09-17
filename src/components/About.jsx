import React from "react";

const About = () => (
  <section className="bg-gradient-to-br from-black via-zinc-900 to-red-900 py-16 px-6">
    <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl bg-zinc-950/90 p-10 flex flex-col md:flex-row gap-10 items-center">
      <div className="flex-1">
        <h2 className="text-5xl font-extrabold text-red-500 mb-4 font-[Orbitron] tracking-tight uppercase">About This Project</h2>
        <p className="text-zinc-200 text-lg mb-6 leading-relaxed">
          This Formula 1 Simulation Dashboard lets you predict lap times and simulate race pace for your favorite drivers and circuits. Built with a modern, dynamic UI inspired by official F1 digital platforms, it features interactive data blocks, real-time graphing, and a bold, high-contrast color scheme.
        </p>
        <div className="bg-zinc-900 rounded-xl p-6 mb-4 border-l-4 border-red-500 shadow">
          <h3 className="text-2xl font-bold text-white mb-2">Key Features</h3>
          <ul className="list-disc list-inside text-zinc-300 text-base space-y-1">
            <li>Lap time prediction using real F1 data</li>
            <li>Race pace simulation with interactive charts</li>
            <li>Modern dashboard layout and block design</li>
            <li>Responsive, mobile-friendly interface</li>
          </ul>
        </div>
        <div className="mt-6 text-zinc-400 text-sm italic">
          Made by <span className="text-red-400 font-semibold">Yash Shinde</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src="/vite.svg" alt="F1 Dashboard" className="w-64 h-64 object-contain drop-shadow-2xl" />
      </div>
    </div>
  </section>
);

export default About;
