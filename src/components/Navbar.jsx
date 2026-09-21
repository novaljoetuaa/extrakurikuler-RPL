import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../../assets/rpl.png'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Beranda', icon: 'fas fa-house' },
  { to: '/artikel', label: 'Artikel', icon: 'fas fa-newspaper' },
  { to: '/galeri', label: 'Galeri', icon: 'fas fa-images' },
  { to: '/pendaftaran', label: 'Pendaftaran', icon: 'fas fa-user-plus' },
]

const bidangLinks = [
  {
    to: '/robotic',
    label: 'Robotik',
    tagline: 'Proyek alat, mikrokontroler & IoT',
    icon: 'fas fa-robot',
    logo: logoRobotic,
  },
  {
    to: '/website',
    label: 'Website & Pemrograman',
    tagline: 'Aplikasi web modern, HTML/CSS & React',
    icon: 'fas fa-code',
    logo: logoWebsite,
  },
  {
    to: '/desain-grafis',
    label: 'Desain Grafis',
    tagline: 'UI/UX, layout tipografi & branding',
    icon: 'fas fa-palette',
    logo: logoDesain,
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [shake, setShake] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signIn, signOut, isConfigured } = useAuth()
  const clickTimer = useRef(null)
  const clickCount = useRef(0)

  useEffect(() => {
    setOpen(false)
    setDropdown(false)
  }, [location])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open || loginOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, loginOpen])

  // Secret admin trigger via 3x click on logo
  const handleLogoClick = () => {
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 1500)

    if (clickCount.current >= 3) {
      clickCount.current = 0
      setLoginForm({ email: '', password: '' })
      setLoginError('')
      setLoginOpen(true)
    }
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginForm((p) => ({ ...p, [name]: value }))
    setLoginError('')
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const { error } = await signIn(loginForm.email, loginForm.password)
    if (!error) {
      setLoginOpen(false)
      setLoginForm({ email: '', password: '' })
      navigate('/admin')
    } else {
      setLoginError(error.message === 'Invalid login credentials' ? 'Email atau password salah.' : error.message)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const isActiveBidang = bidangLinks.some((b) => location.pathname === b.to)

  return (
    <>
      {/* PRD Section 3.2: Latar belakang solid #0D47A1 dengan teks #E3F2FD. Menu aktif disorot warna #90CAF9 */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-[#90CAF9] bg-[#0D47A1] text-[#E3F2FD] shadow-md">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo Brand: Ekstrakurikuler RPL */}
          <Link
            to="/"
            className="group flex items-center gap-3 select-none"
            onClick={handleLogoClick}
            title="Ekstrakurikuler RPL"
          >
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border-2 border-[#90CAF9] bg-white p-1 shadow-sm transition hover:scale-105">
              <img src={logo} alt="Logo Ekstrakurikuler RPL" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-bold tracking-tight text-[#E3F2FD] sm:text-lg">
                  EKSTRAKURIKULER RPL
                </span>
                <span className="hidden rounded-md border border-[#90CAF9] bg-[#0D47A1] px-1.5 py-0.5 text-[10px] font-bold text-[#90CAF9] sm:inline-block">
                  SMK Krian 1
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#90CAF9]">
                Rekayasa Perangkat Lunak
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1.5 md:flex">
            {/* Beranda (fas fa-house) */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#E3F2FD] text-[#0D47A1] shadow-sm'
                    : 'text-[#E3F2FD] hover:bg-[#90CAF9]/20 hover:text-[#90CAF9]'
                }`
              }
            >
              <i className="fas fa-house text-sm" />
              <span>Beranda</span>
            </NavLink>

            {/* Extrakurikuler (fas fa-users-gear) Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdown((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold transition-all ${
                  isActiveBidang || dropdown
                    ? 'bg-[#90CAF9] text-[#0D47A1]'
                    : 'text-[#E3F2FD] hover:bg-[#90CAF9]/20 hover:text-[#90CAF9]'
                }`}
              >
                <i className="fas fa-users-gear text-sm" />
                <span>Extrakurikuler</span>
                <i
                  className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
                    dropdown ? 'rotate-180 text-[#0D47A1]' : 'text-[#90CAF9]'
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-72 rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-2 shadow-hover"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0D47A1]">
                      Pilihan Sub-Bidang
                    </div>
                    <div className="mt-1 space-y-1">
                      {bidangLinks.map((b) => {
                        const active = location.pathname === b.to
                        return (
                          <Link
                            key={b.to}
                            to={b.to}
                            className={`flex items-center gap-3 rounded-xl p-2.5 transition ${
                              active
                                ? 'border border-[#2196F3] bg-white text-[#0D47A1]'
                                : 'text-[#0D47A1] hover:bg-white/80'
                            }`}
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#90CAF9] bg-white p-1">
                              <img src={b.logo} alt={b.label} className="h-full w-full object-contain" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-[#0D47A1]">{b.label}</p>
                              <p className="truncate text-[10px] text-[#0D47A1]/70">{b.tagline}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Artikel (fas fa-newspaper) */}
            <NavLink
              to="/artikel"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#E3F2FD] text-[#0D47A1] shadow-sm'
                    : 'text-[#E3F2FD] hover:bg-[#90CAF9]/20 hover:text-[#90CAF9]'
                }`
              }
            >
              <i className="fas fa-newspaper text-sm" />
              <span>Artikel</span>
            </NavLink>

            {/* Galeri */}
            <NavLink
              to="/galeri"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#E3F2FD] text-[#0D47A1] shadow-sm'
                    : 'text-[#E3F2FD] hover:bg-[#90CAF9]/20 hover:text-[#90CAF9]'
                }`
              }
            >
              <i className="fas fa-images text-sm" />
              <span>Galeri</span>
            </NavLink>

            {/* Tombol Pendaftaran / Admin */}
            <div className="ml-2 flex items-center gap-2 border-l border-[#90CAF9]/40 pl-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#90CAF9] bg-[#E3F2FD] px-3 py-1.5 text-xs font-bold text-[#0D47A1] transition hover:bg-white"
                  >
                    <i className="fas fa-shield-halved text-xs text-[#2196F3]" />
                    <span>Admin</span>
                  </button>
                  <button
                    type="button"
                    onClick={signOut}
                    className="rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#90CAF9] transition hover:text-white"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <Link
                  to="/pendaftaran"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2196F3] px-4 py-2 text-xs font-bold text-white transition hover:bg-white hover:text-[#0D47A1] active:scale-[0.98]"
                >
                  <i className="fas fa-user-plus" />
                  <span>Daftar Sekarang</span>
                </Link>
              )}
            </div>
          </div>

          {/* Hamburger Menu Mobile */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#90CAF9] bg-[#0D47A1] text-[#E3F2FD] md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            <i className={`fas ${open ? 'fa-xmark' : 'fa-bars'} text-lg`} />
          </button>
        </nav>
      </header>

      {/* ===== Drawer Menu Mobile ===== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 right-0 z-[65] flex w-[85%] max-w-sm flex-col border-l-2 border-[#90CAF9] bg-[#0D47A1] text-[#E3F2FD] shadow-2xl md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-[#90CAF9]/40 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#90CAF9] bg-white p-1">
                    <img src={logo} alt="Logo" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-[#E3F2FD]">EKSTRAKURIKULER RPL</p>
                    <p className="text-[10px] text-[#90CAF9]">SMK Krian 1 Sidoarjo</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#90CAF9] text-[#E3F2FD]"
                  aria-label="Tutup"
                >
                  <i className="fas fa-xmark text-sm" />
                </button>
              </div>

              {/* Drawer Nav Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                <div>
                  <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-[#90CAF9]">
                    Menu Utama
                  </p>
                  <div className="mt-2 space-y-1">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/'}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
                            isActive
                              ? 'bg-[#E3F2FD] text-[#0D47A1]'
                              : 'text-[#E3F2FD] hover:bg-[#90CAF9]/20'
                          }`
                        }
                      >
                        <i className={`${link.icon} w-5 text-center text-sm`} />
                        <span>{link.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-[#90CAF9]">
                    Sub-Bidang Extrakurikuler
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {bidangLinks.map((b) => (
                      <NavLink
                        key={b.to}
                        to={b.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-xl border p-2.5 transition ${
                            isActive
                              ? 'border-[#2196F3] bg-[#E3F2FD] text-[#0D47A1]'
                              : 'border-[#90CAF9]/40 bg-[#0D47A1] text-[#E3F2FD] hover:bg-[#90CAF9]/15'
                          }`
                        }
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
                          <img src={b.logo} alt={b.label} className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold">{b.label}</p>
                          <p className="truncate text-[10px] opacity-75">{b.tagline}</p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="border-t border-[#90CAF9]/40 bg-[#0D47A1] p-5">
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      navigate('/admin')
                    }}
                    className="btn-primary w-full !py-2.5"
                  >
                    <i className="fas fa-shield-halved" />
                    <span>Dashboard Admin</span>
                  </button>
                ) : (
                  <Link
                    to="/pendaftaran"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full !py-2.5"
                  >
                    <i className="fas fa-user-plus" />
                    <span>Daftar Anggota Sekarang</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== Admin Login Modal ===== */}
      <AnimatePresence>
        {loginOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={() => setLoginOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="fixed inset-0 z-[85] flex items-center justify-center p-4"
            >
              <div
                className={`w-full max-w-sm rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-7 shadow-2xl ${
                  shake ? 'animate-shake' : ''
                }`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#90CAF9] bg-[#0D47A1] text-[#E3F2FD]">
                  <i className="fas fa-shield-halved text-2xl" />
                </div>
                <h3 className="mt-4 text-center font-display text-xl font-bold text-[#0D47A1]">
                  Login Pengelola
                </h3>
                <p className="mt-1 text-center text-xs text-[#0D47A1]/80">
                  Akses modul administrasi Ekstrakurikuler RPL
                </p>

                <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
                      Email Admin
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      placeholder="admin@sekolah.sch.id"
                      className="input-field"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      className="input-field"
                    />
                  </div>

                  {loginError && (
                    <p className="rounded-xl border border-red-300 bg-red-50 p-2.5 text-center text-xs font-bold text-red-700">
                      {loginError}
                    </p>
                  )}

                  <button type="submit" className="btn-primary w-full !py-3">
                    <i className="fas fa-lock" />
                    <span>Masuk ke Dashboard</span>
                  </button>
                </form>

                {!isConfigured && (
                  <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-2 text-center text-[11px] font-bold text-amber-800">
                    Konfigurasi Supabase belum terpasang.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setLoginOpen(false)}
                  className="mt-4 w-full text-center text-xs font-bold text-[#0D47A1]/60 hover:text-[#0D47A1]"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
