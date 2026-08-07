import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Robotic from './pages/Robotic'
import Website from './pages/Website'
import DesainGrafis from './pages/DesainGrafis'
import Galeri from './pages/Galeri'
import Pendaftaran from './pages/Pendaftaran'
import AdminPanel from './pages/AdminPanel'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-clip">
      <Navbar />
      <main className="w-full flex-1 overflow-x-clip">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/robotic" element={<Robotic />} />
          <Route path="/website" element={<Website />} />
          <Route path="/desain-grafis" element={<DesainGrafis />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

