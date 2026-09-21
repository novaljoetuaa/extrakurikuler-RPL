import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { IconCode, IconArrowRight, IconSparkle } from '../components/icons'

export default function NotFound() {
  return (
    <div className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/50 py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 tech-grid-bg opacity-50" />

      <Reveal className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-brand-600 shadow-soft">
          <IconCode className="h-10 w-10" />
        </div>
        <p className="mt-6 text-7xl sm:text-8xl font-black text-slate-200">404</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">Halaman Tidak Ditemukan</h1>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Halaman yang Anda tuju tidak tersedia atau tautan yang Anda ikuti telah dipindahkan.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/" className="btn-primary !px-7 !py-3.5 font-bold shadow-glow">
            <span>Kembali ke Beranda</span>
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
