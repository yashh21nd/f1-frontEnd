// ✅ F1 Simulator App - Modern UI with Orbitron, Glow, and Neon Effects

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
    } catch (e) {
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
    } catch (e) {
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
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white font-[Inter]">
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md shadow-lg p-4 flex justify-center space-x-8">
        <button
          onClick={() => scrollToSection("about")}
          className="text-white font-[Orbitron] hover:text-purple-400 transition duration-300"
        >
          ABOUT
        </button>
        <button
          onClick={() => scrollToSection("creator")}
          className="text-white font-[Orbitron] hover:text-pink-400 transition duration-300"
        >
          CREATOR
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="text-white font-[Orbitron] hover:text-blue-400 transition duration-300"
        >
          CONTACT
        </button>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 mb-12 font-[Orbitron] animate-pulse">
          F1 Lap Time & Race Pace Simulator
        </h1>

        <section id="about" className="relative bg-gray-900/70 p-10 rounded-2xl shadow-2xl mb-12 space-y-10 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-glow" />

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <label className="block mb-2 text-sm font-semibold">Driver Code</label>
              <input type="text" value={driver} onChange={(e) => setDriver(e.target.value)} className="w-full p-3 text-black rounded-lg" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Year</label>
              <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="w-full p-3 text-black rounded-lg" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Circuit ID</label>
              <input type="text" value={circuit} onChange={(e) => setCircuit(e.target.value)} className="w-full p-3 text-black rounded-lg" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Tyre Compound</label>
              <select value={compound} onChange={(e) => setCompound(e.target.value)} className="w-full p-3 text-black rounded-lg">
                <option value="soft">Soft</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Laps</label>
              <input type="number" value={laps} onChange={(e) => setLaps(parseInt(e.target.value))} className="w-full p-3 text-black rounded-lg" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 pt-6">
            <button onClick={getLapTime} disabled={loading} className="btn-neon w-full">
              {loading ? "Simulating..." : "Get Lap Time"}
            </button>
            <button onClick={getRacePace} disabled={loading} className="btn-neon w-full bg-red-600">
              {loading ? "Simulating..." : "Simulate Race Pace"}
            </button>
          </div>
        </section>

        {lapPrediction && (
          <div className="bg-black/60 p-6 rounded-lg mb-6 backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-2 text-purple-400">Predicted Lap Time</h2>
            <p>
              <strong>{lapPrediction.driver}</strong> @ {lapPrediction.circuit} →
              <span className="text-green-400 text-2xl font-mono ml-2">
                {lapPrediction.predicted_lap_time_formatted} sec
              </span>
            </p>
          </div>
        )}

        {racePace && (
          <div className="bg-black/60 p-6 rounded-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Race Pace Simulation</h2>
            <Line data={chartData} />
            <p className="mt-4 text-lg">
              Total Race Time: <span className="text-green-300 font-semibold text-xl">{racePace.total_race_time}</span>
            </p>
          </div>
        )}

        <section id="creator" className="mt-16 bg-gray-800 p-8 rounded-xl shadow-inner">
          <h3 className="text-3xl font-extrabold mb-4 text-white font-[Orbitron]">Project Description</h3>
          <p className="leading-relaxed text-gray-200 text-md font-light">
            This project is a real-time Formula 1 Lap Time and Race Pace Simulator built using a FastAPI backend and a React + Chart.js frontend. It fetches historical lap data via the Ergast Developer API, processes it using custom logic for tire compound effects, averages, and fluctuations, and presents predictions for both individual lap times and full race simulations. With an intuitive UI, animated charts, and modern styling including RGB gradients and animated buttons, it provides users with an immersive experience to test different race configurations.
          </p>
        </section>

        <footer id="contact" className="mt-10 text-sm text-gray-400 text-center">
          <p>Built & Deployed by <strong className="text-white">Yash Shinde</strong></p>
          <p>
            GitHub: <a className="text-blue-400" href="https://github.com/yashh21nd" target="_blank">yashh21nd</a> | Email: <a className="text-blue-400" href="mailto:yashshinde.dev.work@gmail.com">yashshinde.dev.work@gmail.com</a> | LinkedIn: <a className="text-blue-400" href="https://www.linkedin.com/in/yashshinde21/" target="_blank">linkedin.com/in/yashshinde21</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
