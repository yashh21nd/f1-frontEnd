import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LapTimePrediction = () => {
  const [form, setForm] = useState({
    driver: "",
    year: "",
    circuit: "",
    compound: "soft",
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getPrediction = async () => {
    try {
      const res = await axios.get("https://f1-sim-backend.onrender.com/predict/lap_time", {
        params: form,
      });
      setPrediction(res.data);
    } catch (error) {
      alert("Error fetching prediction");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full text-center"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-red-500 mb-6 tracking-widest uppercase font-[Orbitron]">
        Predict Lap Time
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {["driver", "year", "circuit", "compound"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="px-4 py-2 bg-zinc-900 border-2 border-red-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 font-semibold shadow"
          />
        ))}
      </div>

      <button
        onClick={getPrediction}
        className="px-8 py-2 bg-gradient-to-r from-red-600 to-red-400 text-white rounded-lg font-bold shadow-lg hover:scale-105 transition text-lg tracking-wide"
      >
        Predict Lap Time
      </button>

      {prediction && (
        <div className="mt-8 bg-zinc-900 p-6 rounded-xl text-left border-l-4 border-red-500 shadow-xl max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-2 text-red-400">
            Predicted Lap Time: <span className="text-white">{prediction.predicted_lap_time_formatted}</span>
          </h3>
          <div className="grid grid-cols-2 gap-2 text-zinc-300 text-base mt-2">
            <span className="font-semibold">Driver:</span> <span>{prediction.driver}</span>
            <span className="font-semibold">Year:</span> <span>{prediction.year}</span>
            <span className="font-semibold">Circuit:</span> <span>{prediction.circuit}</span>
            <span className="font-semibold">Compound:</span> <span>{prediction.compound}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LapTimePrediction;