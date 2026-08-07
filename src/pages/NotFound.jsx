import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { IconCode, IconArrowRight } from '../components/icons'

export default function NotFound() {
  return (
<div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-50 py-28">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold-200/40 blur-3xl" />
      <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-100 text-brand-600 shadow-soft">
          <IconCode className="h-10 w-10" />
        </span>
        <p className="mt-8 font-display text-8xl font-semibold text-brand-200">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-slate-800">Halaman Tidak Ditemukan</h1>
        <p className="mt-4 text-slate-500">
          Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
        </p>
        <Link to="/" className="btn-gold mt-8">
          Kembali ke Beranda
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </div>
  )
}

