import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LapTimePrediction = () => {
  const [form, setForm] = useState({
    driver: "verstappen",
    year: "2023",
    circuit: "monza",
    compound: "soft",
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getPrediction = async () => {
    // Validate required fields
    if (!form.driver.trim() || !form.year.trim() || !form.circuit.trim()) {
      setError("Please fill in all required fields: Driver, Year, and Circuit.");
      return;
    }

    // Validate year format
    const yearNum = parseInt(form.year);
    if (isNaN(yearNum) || yearNum < 1950 || yearNum > new Date().getFullYear()) {
      setError("Please enter a valid year between 1950 and current year.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://f1-sim-backend.onrender.com/predict/lap_time", {
        params: form,
      });
      setPrediction(res.data);
    } catch (error) {
      setError("Unable to fetch prediction. Please check your inputs and try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-card">
      <div className="card-header">
        <h3 className="card-title">
          Lap Time Prediction
        </h3>
        <p className="card-subtitle">
          Advanced machine learning predictions for F1 lap times
        </p>
      </div>

      {/* Input Form Section */}
      <div className="space-y-6">
        <div className="form-group">
          <label className="form-label">Driver Code *</label>
          <input
            name="driver"
            type="text"
            placeholder="e.g., verstappen, hamilton, leclerc"
            value={form.driver}
            onChange={handleChange}
            className="form-input"
          />
          <p className="text-xs text-gray-300 mt-1">Use driver codes like: verstappen, hamilton, leclerc, sainz, norris, russell</p>
        </div>
        
        <div className="form-group">
          <label className="form-label">Season Year *</label>
          <input
            name="year"
            type="number"
            placeholder="e.g., 2023, 2024"
            min="1950"
            max="2025"
            value={form.year}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Circuit *</label>
          <input
            name="circuit"
            type="text"
            placeholder="e.g., monza, silverstone, monaco, spa"
            value={form.circuit}
            onChange={handleChange}
            className="form-input"
          />
          <p className="text-xs text-gray-300 mt-1">Use circuit codes like: monza, silverstone, monaco, spa, suzuka, bahrain</p>
        </div>
        
        <div className="form-group">
          <label className="form-label">Tire Compound</label>
          <select
            name="compound"
            value={form.compound}
            onChange={handleChange}
            className="form-select"
          >
            <option value="soft">Soft Compound</option>
            <option value="medium">Medium Compound</option>
            <option value="hard">Hard Compound</option>
          </select>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm"
          >
            <p className="text-red-100 text-sm font-medium">⚠️ {error}</p>
          </motion.div>
        )}

        <motion.button
          onClick={getPrediction}
          disabled={loading || !form.driver.trim() || !form.year.trim() || !form.circuit.trim()}
          className={`btn-primary w-full ${
            !form.driver.trim() || !form.year.trim() || !form.circuit.trim() 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="loading-spinner"></div>
              Calculating...
            </div>
          ) : (
            "🏎️ Predict Lap Time"
          )}
        </motion.button>

        {/* Results Section */}
        {prediction && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="results-section"
          >
            <div className="results-container">
              <div className="results-value">
                {prediction.predicted_lap_time || "N/A"}
              </div>
              <div className="results-subtitle">
                Predicted Lap Time
              </div>
            </div>

            <div className="grid-4">
              <div className="stat-card">
                <div className="stat-value">
                  {form.driver.toUpperCase()}
                </div>
                <div className="stat-label">Driver</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">
                  {form.circuit.toUpperCase()}
                </div>
                <div className="stat-label">Circuit</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">
                  {form.year}
                </div>
                <div className="stat-label">Season</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">
                  {form.compound.toUpperCase()}
                </div>
                <div className="stat-label">Compound</div>
              </div>
            </div>
          </motion.div>
        )}

        {!prediction && !loading && (
          <div className="text-center py-8">
            <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Ready for Prediction
            </h4>
            <p style={{ color: 'var(--text-tertiary)' }}>
              Fill in all parameters to get your prediction
            </p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="error"
          >
            <div className="error-title">Prediction Error</div>
            <div className="error-message">{error}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LapTimePrediction;