# 🏎️ F1 Race Pace Simulator - Frontend

A professional, company-ready F1 race simulation application with stunning visuals and advanced machine learning predictions.

## ✨ Features

- **🎨 Professional F1-themed UI** with Max Verstappen championship wallpaper
- **🔮 Lap Time Prediction** using advanced machine learning algorithms
- **🏁 Race Pace Simulation** with interactive charts and visualizations
- **📊 Real-time Data Visualization** using Chart.js
- **🔗 Backend API Integration** with comprehensive error handling
- **✅ Form Validation** and connection testing utilities
- **💫 Glass-morphism Design** with transparent overlays
- **📱 Fully Responsive** design optimized for all devices

## 🛠️ Technical Stack

- **Frontend**: React.js + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Charts**: Chart.js for data visualization
- **HTTP Client**: Axios for API calls
- **Backend**: FastAPI (deployed on Render)
- **Deployment**: Vercel

## 🚀 Live Demo

🌐 **Frontend**: Coming soon on Vercel
🔧 **Backend API**: https://f1-sim-backend.onrender.com

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yashh21nd/f1-frontEnd.git
cd f1-frontEnd

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Environment Variables
No environment variables required - the app connects directly to the hosted backend.

### Backend Integration
The app is configured to work with:
- **API Base URL**: `https://f1-sim-backend.onrender.com`
- **Endpoints**: 
  - `GET /predict/lap_time` - Lap time predictions
  - `GET /predict/race_pace` - Race pace simulations

## 📱 Usage

1. **Connection Test**: Use the "Connection Test" tab to verify API connectivity
2. **Lap Time Prediction**: Enter driver code, year, circuit, and tire compound
3. **Race Pace Simulation**: Configure race parameters and analyze performance
4. **Valid Inputs**:
   - **Driver codes**: `verstappen`, `hamilton`, `leclerc`, `sainz`, etc.
   - **Circuits**: `monza`, `silverstone`, `monaco`, `spa`, etc.
   - **Years**: 1950-2025

## 🎨 Design Features

- **Max Verstappen F1 Background**: Championship celebration wallpaper
- **Transparent Glass Effects**: 5-20% opacity overlays with backdrop blur
- **F1 Color Scheme**: Professional red (#E10600) accents
- **Inter Font Family**: Clean, professional typography
- **Responsive Grid Layout**: Optimized for desktop and mobile

## 📡 API Integration

### Sample API Calls

```javascript
// Lap Time Prediction
GET /predict/lap_time?driver=verstappen&year=2023&circuit=monza&compound=soft

// Race Pace Simulation  
GET /predict/race_pace?driver=hamilton&year=2023&circuit=silverstone&compound=medium&laps=50
```

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically with every push

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy dist folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Yash Shinde**
- 🌐 LinkedIn: [www.linkedin.com/in/yash-shinde-dev](https://www.linkedin.com/in/yash-shinde-dev)
- 📧 Email: yashshinde.dev.work@gmail.com
- 🐙 GitHub: [@yashh21nd](https://github.com/yashh21nd)

---

⭐ **Ready for company presentations and professional demos!** ⭐
