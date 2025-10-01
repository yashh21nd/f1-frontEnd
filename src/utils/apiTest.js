// API Integration Test Utility
// This file contains test functions to validate backend connectivity

const API_BASE_URL = 'https://f1-sim-backend.onrender.com';

export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const data = await response.json();
    console.log('✅ Backend Connection:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Backend Connection Failed:', error);
    return { success: false, error: error.message };
  }
};

export const testLapTimePrediction = async () => {
  const testParams = {
    driver: 'verstappen',
    year: 2023,
    circuit: 'monza',
    compound: 'soft'
  };

  try {
    const queryString = new URLSearchParams(testParams).toString();
    const response = await fetch(`${API_BASE_URL}/predict/lap_time?${queryString}`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Lap Time Prediction Test:', data);
      return { success: true, data };
    } else {
      console.error('❌ Lap Time Prediction Failed:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('❌ Lap Time Prediction Error:', error);
    return { success: false, error: error.message };
  }
};

export const testRacePaceSimulation = async () => {
  const testParams = {
    driver: 'verstappen',
    year: 2023,
    circuit: 'monza',
    compound: 'soft',
    laps: 5
  };

  try {
    const queryString = new URLSearchParams(testParams).toString();
    const response = await fetch(`${API_BASE_URL}/predict/race_pace?${queryString}`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Race Pace Simulation Test:', data);
      return { success: true, data };
    } else {
      console.error('❌ Race Pace Simulation Failed:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('❌ Race Pace Simulation Error:', error);
    return { success: false, error: error.message };
  }
};

export const runAllTests = async () => {
  console.log('🚀 Starting API Integration Tests...\n');
  
  const results = {
    connection: await testBackendConnection(),
    lapTime: await testLapTimePrediction(),
    racePace: await testRacePaceSimulation()
  };

  console.log('\n📊 Test Results Summary:');
  console.log('Connection:', results.connection.success ? '✅ PASS' : '❌ FAIL');
  console.log('Lap Time Prediction:', results.lapTime.success ? '✅ PASS' : '❌ FAIL');
  console.log('Race Pace Simulation:', results.racePace.success ? '✅ PASS' : '❌ FAIL');

  return results;
};

// Common driver codes for testing
export const DRIVER_CODES = [
  'verstappen', 'hamilton', 'leclerc', 'sainz', 'norris', 'russell',
  'perez', 'alonso', 'ocon', 'gasly', 'bottas', 'zhou', 'magnussen',
  'schumacher', 'vettel', 'albon', 'latifi', 'tsunoda', 'stroll', 'ricciardo'
];

// Common circuit codes for testing
export const CIRCUIT_CODES = [
  'monza', 'silverstone', 'monaco', 'spa', 'suzuka', 'bahrain',
  'melbourne', 'imola', 'barcelona', 'interlagos', 'austin', 'mexico',
  'abu_dhabi', 'singapore', 'zandvoort', 'hungary', 'paul_ricard',
  'azerbaijan', 'canada', 'austria', 'miami', 'saudi_arabia'
];

// Tire compounds
export const TIRE_COMPOUNDS = ['soft', 'medium', 'hard'];