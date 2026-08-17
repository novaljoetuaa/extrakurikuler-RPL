import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App'
import SplashScreen from './components/SplashScreen'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'

function Root() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <AnimatePresence>
              {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
            </AnimatePresence>
            <App />
            <SpeedInsights />
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)

