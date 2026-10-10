import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-slate-100 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 tech-grid-bg opacity-50" />

      <Reveal className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-slate-900 shadow-card">
          <i className="fas fa-circle-question text-4xl" />
        </div>
        <p className="mt-6 font-display text-7xl sm:text-8xl font-black text-slate-200">404</p>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl font-black text-slate-900">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          Halaman yang Anda tuju tidak tersedia atau tautan yang Anda ikuti telah dipindahkan.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/" className="btn-primary !px-7 !py-3.5 font-bold shadow-glow">
            <i className="fas fa-house text-xs" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
