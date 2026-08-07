import { useState } from 'react'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'
import { IconCamera, IconX } from '../components/icons'

export default function Galeri() {
  const { data } = useData()
  const [selected, setSelected] = useState(null)

  return (
    <div>
{/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-50 py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold-200/40 blur-3xl" />
        <Reveal className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Dokumentasi</p>
          <h1 className="mt-3 font-display text-5xl font-semibold text-slate-800">Galeri Kegiatan</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Momen-momen berharga selama latihan, workshop, dan lomba Ekstrakulikuler RPL.
          </p>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.galeri.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 120}>
              <button
                type="button"
                onClick={() => setSelected(g)}
                className="group relative block w-full overflow-hidden rounded-[2rem] shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <img
                  src={g.gambar}
                  alt={g.judul}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <p className="text-left font-display text-lg font-semibold text-white">{g.judul}</p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                    <IconCamera className="h-5 w-5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-4xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute -top-14 right-0 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Tutup
              <IconX className="h-4 w-4" />
            </button>
            <img
              src={selected.gambar}
              alt={selected.judul}
              className="max-h-[75vh] w-full rounded-3xl object-contain bg-brand-900/60"
            />
            <p className="mt-4 text-center font-display text-xl font-semibold text-white">
              {selected.judul}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

