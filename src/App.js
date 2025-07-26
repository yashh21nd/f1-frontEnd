// ✅ F1 Simulator App - Creative UI Layout

import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "@fontsource/orbitron";
import "@fontsource/inter";
import "./styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function App() {
  const [driver, setDriver] = useState("VER");
  const [year, setYear] = useState(2023);
  const [circuit, setCircuit] = useState("monza");
  const [compound, setCompound] = useState("soft");
  const [laps, setLaps] = useState(10);
  const [lapPrediction, setLapPrediction] = useState(null);
  const [racePace, setRacePace] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://f1-sim-backend.onrender.com/predict";

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const getLapTime = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/lap_time`, {
        params: { driver, year, circuit, compound },
      });
      setLapPrediction(res.data);
    } catch {
      alert("Failed to fetch lap time");
    } finally {
      setLoading(false);
    }
  };

  const getRacePace = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/race_pace`, {
        params: { driver, year, circuit, compound, laps },
      });
      setRacePace(res.data);
    } catch {
      alert("Failed to fetch race pace");
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: racePace?.lap_times.map((_, i) => `Lap ${i + 1}`),
    datasets: [
      {
        label: `${driver} - Lap Times`,
        data: racePace?.lap_times.map((time) => {
          const [min, sec] = time.split(":");
          return parseFloat(min) * 60 + parseFloat(sec);
        }),
        borderColor: "#e10600",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-inter px-4">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md shadow-md p-4 w-full flex justify-center gap-6">
        {["ABOUT", "CREATOR", "CONTACT"].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="px-6 py-2 bg-black text-white border border-gray-300 hover:border-white hover:bg-white hover:text-black transition-all rounded-md font-orbitron"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* HERO */}
      <header className="text-center pt-12 pb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 font-orbitron mb-4">
          F1 Lap Time & Race Pace Simulator
        </h1>
        <p className="text-gray-300 text-md md:text-lg max-w-2xl mx-auto">
          Predict driver performance on any track with customizable parameters. Powered by real-time race data and smart simulation logic.
        </p>
      </header>

      {/* SIMULATOR BLOCK */}
      <section className="bg-gray-900/80 rounded-2xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-orbitron mb-6 text-center">Simulate Parameters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input type="text" value={driver} onChange={(e) => setDriver(e.target.value)} placeholder="Driver Code" className="p-3 text-black rounded-lg w-full" />
          <input type="number" value={year} onChange={(e) => setYear(+e.target.value)} placeholder="Year" className="p-3 text-black rounded-lg w-full" />
          <input type="text" value={circuit} onChange={(e) => setCircuit(e.target.value)} placeholder="Circuit ID" className="p-3 text-black rounded-lg w-full" />
          <select value={compound} onChange={(e) => setCompound(e.target.value)} className="p-3 text-black rounded-lg w-full">
            <option value="soft">Soft</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input type="number" value={laps} onChange={(e) => setLaps(+e.target.value)} placeholder="Laps" className="p-3 text-black rounded-lg w-full" />
        </div>
      </section>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
        <button onClick={getLapTime} disabled={loading} className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 font-bold text-white transition-transform transform hover:scale-105">
          {loading ? "Simulating..." : "Get Lap Time"}
        </button>
        <button onClick={getRacePace} disabled={loading} className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 font-bold text-white transition-transform transform hover:scale-105">
          {loading ? "Simulating..." : "Simulate Race Pace"}
        </button>
      </div>

      {/* RACE PACE CHART */}
      {racePace && (
        <div className="bg-gray-800/60 p-6 rounded-xl shadow-xl max-w-4xl mx-auto mb-12">
          <h3 className="text-xl font-orbitron mb-4">Race Pace Simulation Chart</h3>
          <Line data={chartData} />
        </div>
      )}

      {/* DESCRIPTION */}
      <section id="about" className="max-w-3xl mx-auto mb-8 text-left">
        <h3 className="text-2xl font-bold font-orbitron mb-2">Circuit Description</h3>
        <p className="text-gray-300 text-md">
          Enter a circuit ID like <strong>monza</strong>, <strong>spa</strong>, or <strong>silverstone</strong> to simulate different race conditions.
          Each circuit varies in average speed, corners, and characteristics.
        </p>
      </section>

      <section id="creator" className="max-w-3xl mx-auto mb-12 text-left">
        <h3 className="text-2xl font-bold font-orbitron mb-2">Project Description</h3>
        <p className="text-gray-300 text-md">
          This project is a Formula 1 simulator using FastAPI backend + React + Chart.js frontend.
          It analyzes driver performance and predicts outcomes based on tire compounds, track data, and historical trends.
        </p>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="text-center text-sm text-gray-400 pb-10">
        <p>
          Built & Deployed by <strong className="text-white">Yash Shinde</strong>
        </p>
        <p>
          GitHub: <a className="text-blue-400" href="https://github.com/yashh21nd" target="_blank">yashh21nd</a> |
          Email: <a className="text-blue-400" href="mailto:yashshinde.dev.work@gmail.com">yashshinde.dev.work@gmail.com</a> |
          LinkedIn: <a className="text-blue-400" href="https://linkedin.com/in/yashshinde21" target="_blank">linkedin.com/in/yashshinde21</a>
        </p>
      </footer>
    </div>
  );
}
