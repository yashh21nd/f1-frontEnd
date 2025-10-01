import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const simulateRace = async () => {
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

    // Validate laps
    const lapNum = parseInt(form.laps);
    if (isNaN(lapNum) || lapNum < 1 || lapNum > 100) {
      setError("Please enter a valid number of laps between 1 and 100.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://f1-sim-backend.onrender.com/predict/race_pace",
        { params: form }
      );
      setLapTimes(res.data);
    } catch (err) {
      setError("Error simulating race pace. Please check your inputs and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Chart configuration for lap times
  const chartData = {
    labels: lapTimes?.lap_times?.map((_, index) => `Lap ${index + 1}`) || [],
    datasets: [
      {
        label: 'Lap Times',
        data: lapTimes?.lap_times?.map(time => {
          const [min, sec] = time.split(':');
          return parseFloat(min) * 60 + parseFloat(sec);
        }) || [],
        borderColor: '#DC2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#F59E0B',
        pointBorderColor: '#DC2626',
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF',
          font: {
            family: 'Orbitron',
            size: 14,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: 'Race Pace Analysis',
        color: '#FFFFFF',
        font: {
          family: 'Orbitron',
          size: 18,
          weight: '700'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#F59E0B',
        bodyColor: '#FFFFFF',
        borderColor: '#DC2626',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#64748B',
          font: {
            family: 'Orbitron',
            size: 12
          }
        },
        grid: {
          color: 'rgba(100, 116, 139, 0.2)',
        }
      },
      y: {
        ticks: {
          color: '#64748B',
          font: {
            family: 'Orbitron',
            size: 12
          },
          callback: function(value) {
            const minutes = Math.floor(value / 60);
            const seconds = (value % 60).toFixed(3);
            return `${minutes}:${seconds.padStart(6, '0')}`;
          }
        },
        grid: {
          color: 'rgba(100, 116, 139, 0.2)',
        }
      },
    },
  };

  return (
    <div className="modern-card">
      <div className="card-header">
        <h3 className="card-title">
          Race Pace Simulation
        </h3>
        <p className="card-subtitle">
          Advanced F1 race pace analysis with performance insights
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
        
        <div className="form-group">
          <label className="form-label">Race Distance</label>
          <input
            name="laps"
            type="number"
            placeholder="Number of laps (1-100)"
            min="1"
            max="100"
            value={form.laps}
            onChange={handleChange}
            className="form-input"
          />
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
          onClick={simulateRace}
          disabled={loading || !form.driver.trim() || !form.year.trim() || !form.circuit.trim()}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`btn-primary w-full ${
            !form.driver.trim() || !form.year.trim() || !form.circuit.trim() 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
          style={{ width: '100%', padding: '16px' }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="loading-spinner"></div>
              Analyzing Race Data...
            </div>
          ) : (
            "🏁 Simulate Race Pace"
          )}
        </motion.button>
      </div>

      {/* Performance Overview */}
      {lapTimes ? (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Performance Overview
          </h4>
          <div className="grid-4">
            <div className="stat-card">
              <div className="stat-value">
                {lapTimes.fastest_lap || "N/A"}
              </div>
              <div className="stat-label">Fastest Lap</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">
                {lapTimes.average_lap_time || "N/A"}
              </div>
              <div className="stat-label">Average Pace</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">
                {lapTimes.lap_times?.length || 0}
              </div>
              <div className="stat-label">Total Laps</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">
                {lapTimes.driver?.toUpperCase() || "N/A"}
              </div>
              <div className="stat-label">Driver</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 mt-6">
          <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Ready for Analysis
          </h4>
          <p style={{ color: 'var(--text-tertiary)' }}>
            Configure race parameters and start simulation
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="error mt-6"
        >
          <div className="error-title">Simulation Error</div>
          <div className="error-message">{error}</div>
        </motion.div>
      )}

      {/* Chart Visualization */}
      {lapTimes && lapTimes.lap_times && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="chart-container mt-8"
        >
          <div className="chart-title">Race Pace Visualization</div>
          <div className="chart-subtitle">
            Interactive analysis of lap-by-lap performance throughout the race
          </div>
          
          <div className="h-96 mb-8">
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Detailed Lap Times Grid */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              📊 Detailed Lap Analysis
            </h4>
            <div className="max-h-80 overflow-y-auto">
              <div className="grid-4">
                {lapTimes.lap_times.slice(0, 12).map((time, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="stat-card"
                  >
                    <div className="stat-value" style={{ fontSize: '18px' }}>
                      {time}
                    </div>
                    <div className="stat-label">
                      Lap {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RacePace;
