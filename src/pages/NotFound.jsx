import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { IconCode, IconArrowRight } from '../components/icons'

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/50 py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
      <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 shadow-soft ring-1 ring-slate-200">
          <IconCode className="h-10 w-10" />
        </span>
        <p className="mt-6 font-display text-7xl sm:text-8xl font-bold text-brand-200">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">Halaman Tidak Ditemukan</h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          Halaman yang Anda tuju tidak tersedia atau tautan yang Anda ikuti sudah diperbarui.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-primary">
            Kembali ke Beranda
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  )
}

