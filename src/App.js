// ✅ F1 Simulator App - Fixed API interaction & layout styles

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

  const API_BASE = "https://f1-sim-backend.onrender.com";

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const getLapTime = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/predict/lap_time`, {
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
      const res = await axios.get(`${API_BASE}/predict/race_pace`, {
        params: { driver, year, circuit, compound, laps },
      });
      setRacePace(res.data);
    } catch (e) {
      alert("Failed to fetch race pace");
    } finally {
      setLoading(false);
    }
  };

  const chartData = racePace?.lap_times
    ? {
        labels: racePace.lap_times.map((_, i) => `Lap ${i + 1}`),
        datasets: [
          {
            label: `${driver} - Lap Times`,
            data: racePace.lap_times.map((time) => {
              const [min, sec] = time.split(":");
              return parseFloat(min) * 60 + parseFloat(sec);
            }),
            borderColor: "#e10600",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white font-[Inter]">
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md shadow-lg p-4 flex justify-center gap-4 animate-fade-in">
        {[
          { label: "ABOUT", target: "about" },
          { label: "CREATOR", target: "creator" },
          { label: "CONTACT", target: "contact" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.target)}
            className="bg-black border border-white px-4 py-2 rounded hover:bg-white hover:text-black font-[Orbitron] transition-all"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl mt-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 font-[Orbitron] animate-pulse">
          F1 Lap Time & Race Pace Simulator
        </h1>

        <section
          id="about"
          className="bg-gray-900/70 mt-14 p-8 rounded-2xl shadow-2xl mx-auto animate-fade-in"
        >
          <div className="grid md:grid-cols-3 gap-6 justify-center">
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

          <div className="flex flex-col md:flex-row gap-6 mt-8 justify-center">
            <button onClick={getLapTime} disabled={loading} className="btn-neon w-full max-w-xs">
              {loading ? "Simulating..." : "Get Lap Time"}
            </button>
            <button onClick={getRacePace} disabled={loading} className="btn-neon bg-red-600 w-full max-w-xs">
              {loading ? "Simulating..." : "Simulate Race Pace"}
            </button>
          </div>
        </section>

        {lapPrediction && (
          <div className="bg-black/60 p-6 rounded-lg mt-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-2 text-purple-400">
              Predicted Lap Time
            </h2>
            <p>
              <strong>{lapPrediction.driver}</strong> @ {lapPrediction.circuit} →
              <span className="text-green-400 text-2xl font-mono ml-2">
                {lapPrediction.predicted_lap_time_formatted} sec
              </span>
            </p>
          </div>
        )}

        {racePace && chartData && (
          <div className="bg-black/60 p-6 rounded-lg mt-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Race Pace Simulation
            </h2>
            <Line data={chartData} />
            <p className="mt-4 text-lg">
              Total Race Time: <span className="text-green-300 font-semibold text-xl">{racePace.total_race_time}</span>
            </p>
          </div>
        )}

        <div className="mt-16 text-left animate-fade-in">
          <h2 className="text-2xl font-bold font-[Orbitron] mb-2">Circuit Description</h2>
          <p className="text-gray-300 text-md">
            Enter a circuit ID like <strong>monza</strong>, <strong>spa</strong>, or <strong>silverstone</strong> to simulate different race conditions. Each circuit varies in characteristics such as average speed, corner count, and historical data, which influence the predicted performance of the driver.
          </p>
        </div>

        <section id="creator" className="mt-12 text-left animate-fade-in">
          <h3 className="text-2xl font-bold font-[Orbitron] mb-2">Project Description</h3>
          <p className="text-gray-300 text-md">
            This project is a real-time Formula 1 Lap Time and Race Pace Simulator built using a FastAPI backend and a React + Chart.js frontend. It fetches historical lap data via the Ergast Developer API, processes it using custom logic for tire compound effects, averages, and fluctuations, and presents predictions for both individual lap times and full race simulations. With an immersive animated UI and precision control inputs, the app delivers an engaging simulation experience for motorsport enthusiasts.
          </p>
        </section>

        <footer id="contact" className="mt-16 text-center text-sm text-gray-400 animate-fade-in">
          <p>Built & Deployed by <strong className="text-white">Yash Shinde</strong></p>
          <p>
            GitHub: <a className="text-blue-400" href="https://github.com/yashh21nd" target="_blank">yashh21nd</a> |
            Email: <a className="text-blue-400" href="mailto:yashshinde.dev.work@gmail.com">yashshinde.dev.work@gmail.com</a> |
            LinkedIn: <a className="text-blue-400" href="https://linkedin.com/in/yashshinde21" target="_blank">linkedin.com/in/yashshinde21</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
