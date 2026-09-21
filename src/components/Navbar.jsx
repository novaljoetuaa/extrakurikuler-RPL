import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  IconX,
  IconChevronDown,
  IconRobot,
  IconCode,
  IconPalette,
  IconShield,
  IconMail,
  IconLock,
} from './icons'
import logo from '../../assets/rpl.png'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/pendaftaran', label: 'Pendaftaran' },
]

const bidangLinks = [
  { to: '/robotic', label: 'Robotic', tagline: 'Robotika & Mikrokontroler', icon: IconRobot, logo: logoRobotic, color: 'from-brand-400 to-brand-600' },
  { to: '/website', label: 'Website', tagline: 'Pengembangan Web', icon: IconCode, logo: logoWebsite, color: 'from-sky-400 to-sky-600' },
  { to: '/desain-grafis', label: 'Desain Grafis', tagline: 'Desain Visual', icon: IconPalette, logo: logoDesain, color: 'from-teal-400 to-teal-600' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  // Kunci scroll body saat menu mobile / login modal terbuka
  useEffect(() => {
    document.body.style.overflow = open || loginOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, loginOpen])

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

  const linkClass = ({ isActive }) =>
    `relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  const isActiveBidang = bidangLinks.some((b) => location.pathname === b.to)

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200/80 bg-white/90 shadow-soft backdrop-blur-md'
            : 'border-b border-slate-100/60 bg-white/80 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo Brand */}
          <Link to="/" className="group flex items-center gap-3.5" onClick={handleLogoClick}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-subtle ring-1 ring-slate-200 transition-all duration-300 group-hover:shadow-soft group-hover:ring-brand-300 sm:h-12 sm:w-12"
            >
              <img src={logo} alt="Logo RPL" className="h-full w-full object-contain" />
            </motion.div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <p className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">Ekstrakurikuler RPL</p>
                <span className="hidden rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 sm:inline-block">SMK</span>
              </div>
              <p className="text-xs font-medium text-slate-500">Robotic · Website · Desain Grafis</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1.5 md:flex">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>

            {/* Dropdown Bidang */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdown((prev) => !prev)}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActiveBidang || dropdown
                    ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Bidang
                <IconChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${dropdown ? 'rotate-180 text-brand-600' : 'text-slate-400'}`}
                />
              </button>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-1/2 mt-2.5 w-72 -translate-x-1/2 origin-top overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-lift ring-1 ring-black/5"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Pilihan Sub-Bidang
                    </div>
                    {bidangLinks.map((b, i) => {
                      const active = location.pathname === b.to
                      return (
                        <motion.div
                          key={b.to}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link
                            to={b.to}
                            className={`flex items-center gap-3.5 rounded-xl p-2.5 transition-all duration-200 ${
                              active
                                ? 'bg-brand-50/80 text-brand-900 ring-1 ring-brand-200'
                                : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-subtle ring-1 ${
                                active ? 'ring-brand-400' : 'ring-slate-200'
                              }`}
                            >
                              <img src={b.logo} alt={`Logo ${b.label}`} className="h-full w-full object-contain" />
                            </span>
                            <div className="min-w-0">
                              <p className={`text-sm font-bold ${active ? 'text-brand-700' : 'text-slate-800'}`}>
                                {b.label}
                              </p>
                              <p className="truncate text-xs text-slate-500">{b.tagline}</p>
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/galeri" className={linkClass}>
              Galeri
            </NavLink>

            {/* Desktop CTA / Auth */}
            <div className="ml-3 flex items-center gap-2 border-l border-slate-200 pl-3">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100"
                  >
                    <IconShield className="h-3.5 w-3.5" />
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={signOut}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <Link
                  to="/pendaftaran"
                  className="btn-primary !px-5 !py-2 !text-xs font-bold tracking-wide"
                >
                  Daftar Sekarang
                </Link>
              )}
            </div>
          </div>

          {/* Hamburger button */}
          <button
            type="button"
            className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute h-0.5 w-5 rounded-full bg-current"
            />
            <motion.span
              animate={open ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute h-0.5 w-5 rounded-full bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="absolute h-0.5 w-5 rounded-full bg-current"
            />
          </button>
        </nav>
      </header>

      {/* ===== Mobile menu (di luar header agar tidak terpotong backdrop-blur) ===== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-brand-900/40 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[65] flex w-[85%] max-w-sm flex-col bg-white shadow-lift md:hidden"
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-slate-200">
                    <img src={logo} alt="Logo RPL" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Ekstrakurikuler RPL</p>
                    <p className="text-[11px] text-slate-500">Navigasi Menu</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Tutup menu"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile menu items */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <p className="px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Menu Utama
                </p>
                <div className="mt-2.5 space-y-1.5">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                            isActive
                              ? 'bg-brand-50 text-brand-700 font-bold ring-1 ring-brand-200'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Pilihan Sub-Bidang
                </p>
                <div className="mt-2.5 space-y-2">
                  {bidangLinks.map((b, i) => {
                    return (
                      <motion.div
                        key={b.to}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.05 }}
                      >
                        <NavLink
                          to={b.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `group flex items-center gap-3.5 rounded-2xl border p-3 transition ${
                              isActive
                                ? 'border-brand-300 bg-brand-50/80 shadow-sm'
                                : 'border-slate-200/80 bg-white hover:border-brand-200 hover:bg-slate-50'
                            }`
                          }
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-subtle ring-1 ring-slate-200">
                            <img src={b.logo} alt={`Logo ${b.label}`} className="h-full w-full object-contain" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-slate-900">{b.label}</p>
                            <p className="truncate text-xs text-slate-500">{b.tagline}</p>
                          </div>
                        </NavLink>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Mobile menu bottom action */}
              <div className="border-t border-slate-200/80 bg-slate-50/50 p-5">
                {user ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        navigate('/admin')
                      }}
                      className="btn-primary flex-1 !py-2.5 !text-xs font-bold"
                    >
                      <IconShield className="h-4 w-4" />
                      Dashboard Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        signOut()
                      }}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
                    >
                      Keluar
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/pendaftaran"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full !py-3 !text-sm font-bold"
                  >
                    Daftar Anggota Sekarang
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== Login Admin Modal ===== */}
      <AnimatePresence>
        {loginOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-brand-900/50 backdrop-blur-sm"
              onClick={() => setLoginOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="fixed inset-0 z-[85] flex items-center justify-center p-4"
            >
              <div
                className={`w-full max-w-sm rounded-3xl bg-white p-7 shadow-lift ${shake ? 'animate-shake' : ''}`}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-900/25">
                  <IconShield className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-center font-display text-2xl font-semibold text-ink">
                  Login Admin
                </h3>
                <p className="mt-1 text-center text-sm text-stone-500">
                  Masuk untuk mengelola konten ekskul.
                </p>

                <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                        <IconMail className="h-4 w-4" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        placeholder="admin@sekolah.sch.id"
                        className="input-field !pl-10"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">Password</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                        <IconLock className="h-4 w-4" />
                      </span>
                      <input
                        type="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        placeholder="Masukkan password"
                        className="input-field !pl-10"
                      />
                    </div>
                  </div>

                  {loginError && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-600"
                    >
                      {loginError}
                    </motion.p>
                  )}

                  <button type="submit" className="btn-primary w-full py-3">
                    <IconLock className="h-4 w-4" />
                    Masuk
                  </button>
                </form>

                {!isConfigured && (
                  <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-600">
                    Login belum dikonfigurasi. Tambahkan variabel Supabase terlebih dahulu.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setLoginOpen(false)}
                  className="mt-4 w-full text-center text-xs font-semibold text-stone-400 transition hover:text-brand-700"
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
