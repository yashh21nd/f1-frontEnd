// ✅ F1 Simulator App - Modern Block Layout UI Inspired by F1 Review Site

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
    <div className="min-h-screen bg-[#1e1e1e] text-white font-sans">
      {/* Navigation Bar */}
      <nav className="bg-[#100014] p-4 flex justify-around items-center text-sm font-semibold border-b border-purple-900">
        {[{ label: "About", target: "about" }, { label: "Creator", target: "creator" }, { label: "Contact", target: "contact" }].map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.target)}
            className="text-white hover:text-pink-400 transition-colors duration-300 border-b-2 border-transparent hover:border-white"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-white tracking-wide font-[Orbitron]">
          F1 Lap Time & Race Pace Simulator
        </h1>

        {/* Input Cards */}
        <section id="about" className="grid md:grid-cols-3 gap-8 mb-12">
          {[{
            label: "Driver Code",
            value: driver,
            onChange: (e) => setDriver(e.target.value),
            type: "text",
          }, {
            label: "Year",
            value: year,
            onChange: (e) => setYear(+e.target.value),
            type: "number",
          }, {
            label: "Circuit ID",
            value: circuit,
            onChange: (e) => setCircuit(e.target.value),
            type: "text",
          }, {
            label: "Tyre Compound",
            value: compound,
            onChange: (e) => setCompound(e.target.value),
            type: "select",
          }, {
            label: "Laps",
            value: laps,
            onChange: (e) => setLaps(+e.target.value),
            type: "number",
          }].map((input, idx) => (
            <div
              key={idx}
              className="bg-[#1c001d] p-6 rounded-lg shadow-xl text-center border border-purple-900"
            >
              <h2 className="text-lg font-bold mb-2 font-[Orbitron]">{input.label}</h2>
              {input.type === "select" ? (
                <select
                  value={input.value}
                  onChange={input.onChange}
                  className="w-full mt-2 p-2 rounded text-black"
                >
                  <option value="soft">Soft</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              ) : (
                <input
                  type={input.type}
                  value={input.value}
                  onChange={input.onChange}
                  className="w-full mt-2 p-2 rounded text-black"
                />
              )}
            </div>
          ))}
        </section>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mb-12">
          <button onClick={getLapTime} disabled={loading} className="bg-[#e10600] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
            {loading ? "Simulating..." : "Get Lap Time"}
          </button>
          <button onClick={getRacePace} disabled={loading} className="bg-[#007bff] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
            {loading ? "Simulating..." : "Simulate Race Pace"}
          </button>
        </div>

        {/* Output Cards */}
        {lapPrediction && (
          <div className="bg-[#0f0f0f] p-6 rounded-lg text-center mb-8">
            <h2 className="text-xl font-bold text-green-400 mb-2">Predicted Lap Time</h2>
            <p>
              <strong>{lapPrediction.driver}</strong> @ {lapPrediction.circuit} →
              <span className="text-green-300 text-2xl ml-2 font-mono">
                {lapPrediction.predicted_lap_time_formatted} sec
              </span>
            </p>
          </div>
        )}

        {racePace && (
          <div className="bg-[#0f0f0f] p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-blue-400 mb-4 text-center">Race Pace Simulation</h2>
            <Line data={chartData} />
            <p className="mt-4 text-center text-lg">
              Total Race Time:
              <span className="text-green-300 font-semibold text-xl ml-2">
                {racePace.total_race_time}
              </span>
            </p>
          </div>
        )}

        <section id="creator" className="text-white text-md mb-12">
          <h2 className="text-2xl font-[Orbitron] mb-4">Project Description</h2>
          <p className="text-gray-300">
            This project is a real-time Formula 1 Lap Time and Race Pace Simulator built using a FastAPI backend and a React + Chart.js frontend. It fetches historical lap data via the Ergast Developer API, processes it using custom logic for tire compound effects, averages, and fluctuations, and presents predictions for both individual lap times and full race simulations.
          </p>
        </section>

        <footer id="contact" className="text-center text-gray-400 text-sm">
          <p>Built & Deployed by <strong className="text-white">Yash Shinde</strong></p>
          <p>
            GitHub: <a className="text-blue-400" href="https://github.com/yashh21nd" target="_blank">yashh21nd</a> | Email: <a className="text-blue-400" href="mailto:yashshinde.dev.work@gmail.com">yashshinde.dev.work@gmail.com</a> | LinkedIn: <a className="text-blue-400" href="https://linkedin.com/in/yashshinde21" target="_blank">linkedin.com/in/yashshinde21</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
