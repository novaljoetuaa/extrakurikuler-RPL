import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Robotic from './pages/Robotic'
import Website from './pages/Website'
import DesainGrafis from './pages/DesainGrafis'
import Galeri from './pages/Galeri'
import Artikel from './pages/Artikel'
import Pendaftaran from './pages/Pendaftaran'
import AdminPanel from './pages/AdminPanel'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function ProtectedAdmin() {
  const { user, loading } = useAuth()

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center text-stone-500">Memeriksa akses...</div>
  return user ? <AdminPanel /> : <Navigate to="/" replace />
}

function App() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-clip">
      <ScrollToTop />
      <Navbar />
      <main className="w-full flex-1 overflow-x-clip">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/robotic" element={<Robotic />} />
          <Route path="/website" element={<Website />} />
          <Route path="/desain-grafis" element={<DesainGrafis />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="/admin" element={<ProtectedAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

