import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { runAllTests, DRIVER_CODES, CIRCUIT_CODES } from '../utils/apiTest';

const ConnectionTest = () => {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunTests = async () => {
    setLoading(true);
    try {
      const results = await runAllTests();
      setTestResults(results);
    } catch (error) {
      console.error('Test execution failed:', error);
      setTestResults({ error: 'Test execution failed' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (success) => {
    return success ? '✅' : '❌';
  };

  const getStatusColor = (success) => {
    return success ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="modern-card">
      <div className="card-header">
        <h3 className="card-title">🔧 API Connection Test</h3>
        <p className="card-subtitle">
          Test backend connectivity and API endpoints
        </p>
      </div>

      <div className="space-y-6">
        <motion.button
          onClick={handleRunTests}
          disabled={loading}
          className="btn-primary w-full"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="loading-spinner"></div>
              Running Tests...
            </div>
          ) : (
            "🚀 Run Connection Tests"
          )}
        </motion.button>

        {testResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-3">Test Results</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Backend Connection:</span>
                  <span className={getStatusColor(testResults.connection?.success)}>
                    {getStatusIcon(testResults.connection?.success)} 
                    {testResults.connection?.success ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Lap Time Prediction:</span>
                  <span className={getStatusColor(testResults.lapTime?.success)}>
                    {getStatusIcon(testResults.lapTime?.success)} 
                    {testResults.lapTime?.success ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Race Pace Simulation:</span>
                  <span className={getStatusColor(testResults.racePace?.success)}>
                    {getStatusIcon(testResults.racePace?.success)} 
                    {testResults.racePace?.success ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              </div>

              {testResults.lapTime?.success && testResults.lapTime.data && (
                <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <h5 className="text-green-400 font-medium">Sample Lap Time Result:</h5>
                  <p className="text-gray-300 text-sm">
                    {testResults.lapTime.data.driver} at {testResults.lapTime.data.circuit} ({testResults.lapTime.data.year}): 
                    <span className="text-yellow-400 font-mono ml-2">
                      {testResults.lapTime.data.predicted_lap_time_formatted}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <h5 className="text-blue-400 font-medium mb-2">Quick Reference:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300 font-medium">Driver Codes:</p>
                  <p className="text-gray-400">{DRIVER_CODES.slice(0, 6).join(', ')}, ...</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Circuit Codes:</p>
                  <p className="text-gray-400">{CIRCUIT_CODES.slice(0, 6).join(', ')}, ...</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConnectionTest;