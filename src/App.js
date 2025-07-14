// ✅ F1 Simulator App - Enhanced UI with Futuristic Glow, Orbitron Headings, Animated Dashboard Navigation

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-[Inter]">
      {/* Navigation Dashboard */}
      <nav className="fixed top-4 right-6 z-50 flex gap-4 animate-fade-in">
        <button
          onClick={() => scrollToSection("about")}
          className="bg-black border border-gray-600 px-4 py-2 text-white rounded-full hover:bg-gray-900 transition duration-300 shadow-md"
        >
          ABOUT
        </button>
        <button
          onClick={() => scrollToSection("creator")}
          className="bg-black border border-gray-600 px-4 py-2 text-white rounded-full hover:bg-gray-900 transition duration-300 shadow-md"
        >
          CREATOR
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="bg-black border border-gray-600 px-4 py-2 text-white rounded-full hover:bg-gray-900 transition duration-300 shadow-md"
        >
          CONTACT
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16 animate-fade-up">
        <h1 className="text-6xl text-center font-[Orbitron] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-red-500 to-purple-500 mb-12 animate-pulse">
          F1 Lap Time & Race Pace Simulator
        </h1>

        {/* Input Card */}
        <section id="about" className="bg-gray-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl space-y-10 animate-fade-up">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <label className="block mb-2 font-semibold">Driver Code</label>
              <input type="text" value={driver} onChange={(e) => setDriver(e.target.value)} className="w-full p-3 rounded-md text-black" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Year</label>
              <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="w-full p-3 rounded-md text-black" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Circuit ID</label>
              <input type="text" value={circuit} onChange={(e) => setCircuit(e.target.value)} className="w-full p-3 rounded-md text-black" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tyre Compound</label>
              <select value={compound} onChange={(e) => setCompound(e.target.value)} className="w-full p-3 rounded-md text-black">
                <option value="soft">Soft</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Laps</label>
              <input type="number" value={laps} onChange={(e) => setLaps(parseInt(e.target.value))} className="w-full p-3 rounded-md text-black" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 pt-4">
            <button onClick={getLapTime} disabled={loading} className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl w-full transition duration-300 shadow-lg">
              {loading ? "Simulating..." : "Get Lap Time"}
            </button>
            <button onClick={getRacePace} disabled={loading} className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl w-full transition duration-300 shadow-lg">
              {loading ? "Simulating..." : "Simulate Race Pace"}
            </button>
          </div>
        </section>

        {lapPrediction && (
          <div className="bg-gray-800/70 p-6 mt-10 rounded-lg shadow-md animate-fade-up">
            <h2 className="text-2xl font-[Orbitron] text-purple-400 mb-2">Predicted Lap Time</h2>
            <p>
              <strong>{lapPrediction.driver}</strong> @ {lapPrediction.circuit} →
              <span className="text-green-400 text-xl font-mono ml-2">
                {lapPrediction.predicted_lap_time_formatted} sec
              </span>
            </p>
          </div>
        )}

        {racePace && (
          <div className="bg-gray-800/70 p-6 mt-6 rounded-lg shadow-md animate-fade-up">
            <h2 className="text-2xl font-[Orbitron] text-blue-400 mb-4">Race Pace Simulation</h2>
            <Line data={chartData} />
            <p className="mt-4 text-lg">
              Total Race Time: <span className="text-green-300 font-semibold text-xl">{racePace.total_race_time}</span>
            </p>
          </div>
        )}

        {/* Circuit Info */}
        <section className="mt-16 bg-gray-800/90 p-8 rounded-xl shadow-lg animate-fade-up">
          <h3 className="text-3xl font-[Orbitron] mb-4 text-white">Circuit Description</h3>
          <p className="text-gray-300 text-md font-light leading-relaxed">
            Enter a circuit ID like <strong>monza</strong>, <strong>spa</strong>, or <strong>silverstone</strong> to simulate different race conditions. Each circuit varies in characteristics such as average speed, corner count, and historical data, which influence the predicted performance of the driver.
          </p>
        </section>

        {/* Project Description */}
        <section id="creator" className="mt-16 bg-gray-900/90 p-8 rounded-xl shadow-lg animate-fade-up">
          <h3 className="text-3xl font-[Orbitron] mb-4 text-white">Project Description</h3>
          <p className="text-gray-300 text-md font-light leading-relaxed">
            This project is a real-time Formula 1 Lap Time and Race Pace Simulator built using a FastAPI backend and a React + Chart.js frontend. It fetches historical lap data via the Ergast Developer API, processes it using custom logic for tire compound effects, averages, and fluctuations, and presents predictions for both individual lap times and full race simulations. With an immersive animated UI and precision control inputs, the app delivers an engaging simulation experience for motorsport enthusiasts.
          </p>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-16 text-sm text-gray-400 text-center animate-fade-up">
          <p>
            Built & Deployed by <strong className="text-white">Yash Shinde</strong>
          </p>
          <p>
            GitHub: <a className="text-blue-400" href="https://github.com/yashh21nd" target="_blank">yashh21nd</a> |
            Email: <a className="text-blue-400" href="mailto:yashshinde.dev.work@gmail.com">yashshinde.dev.work@gmail.com</a> |
            LinkedIn: <a className="text-blue-400" href="https://www.linkedin.com/in/yashshinde21/" target="_blank">linkedin.com/in/yashshinde21</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
