
import React, { useState } from "react";
import LapTimePrediction from "./components/LapTimePrediction";
import RacePace from "./components/RacePace";
import About from "./components/About";


const navItems = [
  { label: "Dashboard", id: "dashboard" },
  { label: "Lap Prediction", id: "lap" },
  { label: "Race Pace", id: "race" },
  { label: "About", id: "about" },
];

const F1CarSilhouette = () => (
  <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 -translate-x-1/2 top-8 opacity-10 pointer-events-none">
    <path d="M10 24 L30 16 L50 16 L70 8 L90 8 L110 16 L120 16" stroke="#E10600" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="30" cy="28" rx="6" ry="4" fill="#222" stroke="#FACC15" strokeWidth="2" />
    <ellipse cx="90" cy="28" rx="6" ry="4" fill="#222" stroke="#FACC15" strokeWidth="2" />
  </svg>
);


function App() {
  const [section, setSection] = useState("dashboard");

  return (
    <div
      className="min-h-screen font-[Orbitron] relative overflow-x-hidden"
      style={{
        background: `url('/checkered-bg.svg') repeat top left, linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 60%, #2d0000 100%)`,
        backgroundSize: '180px, cover',
      }}
    >
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-zinc-950/90 shadow-lg sticky top-0 z-50 animate-fade-in-down">
        <div className="flex items-center gap-3">
          <img src="/f1-logo.svg" alt="F1 Logo" className="h-12 w-12 drop-shadow-lg animate-pulse" />
          <span className="text-2xl md:text-3xl font-extrabold text-red-500 tracking-widest uppercase animate-fade-in">F1 Sim Dashboard</span>
        </div>
        <ul className="flex gap-8 text-lg">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer px-3 py-1 rounded transition font-semibold duration-200 ${section === item.id ? "bg-red-600 text-white scale-110 shadow-lg" : "text-zinc-300 hover:text-red-400 hover:scale-105"}`}
              onClick={() => setSection(item.id)}
              style={{ transition: 'all 0.2s cubic-bezier(.4,2,.6,1)' }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      {/* F1 Car Silhouette and subtle background effect */}
      <F1CarSilhouette />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 animate-fade-in-up">
        {section === "dashboard" && (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-2xl shadow-2xl bg-zinc-950/80 p-8 border-t-4 border-red-600 hover:shadow-red-600/40 transition-shadow duration-300 animate-fade-in-up">
              <LapTimePrediction />
            </div>
            <div className="rounded-2xl shadow-2xl bg-zinc-950/80 p-8 border-t-4 border-yellow-400 hover:shadow-yellow-400/40 transition-shadow duration-300 animate-fade-in-up">
              <RacePace />
            </div>
          </div>
        )}
        {section === "lap" && (
          <div className="rounded-2xl shadow-2xl bg-zinc-950/80 p-8 border-t-4 border-red-600 animate-fade-in-up">
            <LapTimePrediction />
          </div>
        )}
        {section === "race" && (
          <div className="rounded-2xl shadow-2xl bg-zinc-950/80 p-8 border-t-4 border-yellow-400 animate-fade-in-up">
            <RacePace />
          </div>
        )}
        {section === "about" && <About />}
      </main>

      {/* Subtle checkered flag overlay for extra F1 feel */}
      <img src="/checkered-bg.svg" alt="Checkered Flag" className="fixed bottom-0 right-0 w-48 opacity-20 pointer-events-none select-none animate-fade-in" />
    </div>
  );
}

export default App;
