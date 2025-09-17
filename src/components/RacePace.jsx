import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RacePace = () => {
  const [form, setForm] = useState({
    driver: "verstappen",
    year: "2023",
    circuit: "monza",
    compound: "soft",
    laps: 50
  });
  const [lapTimes, setLapTimes] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const simulateRace = async () => {
    try {
      const res = await axios.get(
        `https://f1-sim-backend.onrender.com/predict/race_pace`,
        { params: form }
      );
      setLapTimes(res.data);
      setError(null);
    } catch (err) {
      setError("Error simulating race pace");
      setLapTimes(null);
    }
  };

  const chartData = lapTimes
    ? {
        labels: lapTimes.lap_times.map((_, i) => `Lap ${i + 1}`),
        datasets: [
          {
            label: `${lapTimes.driver.toUpperCase()} Lap Times (mm:ss)`,
            data: lapTimes.lap_times.map((t) => {
              const [min, sec] = t.split(":");
              return parseFloat((parseInt(min) * 60 + parseFloat(sec)).toFixed(2));
            }),
            fill: false,
            borderColor: "#facc15",
            tension: 0.4
          }
        ]
      }
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 text-center mb-6 tracking-widest uppercase font-[Orbitron]">
        🏎️ F1 Race Pace Simulation
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {["driver", "year", "circuit", "compound", "laps"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="px-4 py-2 bg-zinc-900 border-2 border-yellow-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 font-semibold shadow"
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={simulateRace}
        className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-bold px-8 py-2 rounded-lg shadow-lg hover:scale-105 transition text-lg tracking-wide mb-6"
      >
        Simulate Race
      </motion.button>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {lapTimes && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 p-6 rounded-xl shadow-xl border-l-4 border-yellow-400">
            <h3 className="text-2xl font-bold text-yellow-300 mb-2">
              Total Race Time: <span className="text-white">{lapTimes.total_race_time}</span>
            </h3>
            <div className="overflow-y-auto h-64 text-base border-t pt-2 text-zinc-200">
              <ol className="list-decimal ml-6 space-y-1">
                {lapTimes.lap_times.map((t, idx) => (
                  <li key={idx}>Lap {idx + 1}: {t}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl shadow-xl border-l-4 border-yellow-400 flex flex-col items-center">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">
              Lap Time Chart
            </h3>
            <div className="w-full max-w-xs md:max-w-md">
              <Line data={chartData} />
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 border-t border-zinc-700 pt-8">
        <h4 className="text-2xl text-yellow-400 font-bold mb-2">How It Works</h4>
        <p className="text-base text-zinc-300 leading-relaxed">
          This simulation fetches historical lap data for a selected F1 driver using the Ergast API.
          It calculates average lap times, applies tyre-based performance modifiers, and introduces slight
          randomness to emulate real race scenarios. The results are visualized with lap-by-lap timings and total race time.
        </p>
      </div>
    </motion.div>
  );
};

export default RacePace;