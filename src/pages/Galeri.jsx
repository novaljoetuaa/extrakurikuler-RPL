import { useState } from 'react'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'
import { IconCamera, IconCode, IconPalette, IconRobot, IconX, IconSparkle } from '../components/icons'

const bidangFilters = [
  { id: 'Semua', label: 'Semua Dokumentasi', Icon: IconCamera },
  { id: 'Robotic', label: 'Robotic', Icon: IconRobot },
  { id: 'Website', label: 'Website', Icon: IconCode },
  { id: 'Desain Grafis', label: 'Desain Grafis', Icon: IconPalette },
  { id: 'Umum', label: 'Kegiatan Umum', Icon: IconSparkle },
]

export default function Galeri() {
  const { data } = useData()
  const [selected, setSelected] = useState(null)
  const [bidang, setBidang] = useState('Semua')
  const galeriTersaring = data.galeri.filter((item) => bidang === 'Semua' || (item.bidang || 'Umum') === bidang)

  const chooseBidang = (value) => {
    setBidang(value)
    setSelected(null)
  }

  return (
    <div className="space-y-12 pb-20 md:space-y-16 md:pb-28">
      {/* ===== HEADER BANNER ===== */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/50 py-14 md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 tech-grid-bg opacity-50" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="badge-pill">
              <IconSparkle className="h-3.5 w-3.5" />
              <span>Dokumentasi & Portofolio</span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Galeri Kegiatan
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
              Dokumentasi proses belajar, praktik di laboratorium komputer, perakitan robotika, dan partisipasi siswa dalam berbagai ajang kompetisi.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== FILTER TABS & GALLERY GRID ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-5">
            {bidangFilters.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseBidang(id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  bidang === id
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galeriTersaring.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 100}>
              <button
                type="button"
                onClick={() => setSelected(g)}
                className="group relative block w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift focus:outline-none"
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={g.gambar}
                    alt={g.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                  
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-left text-white">
                    <div className="pr-3">
                      <span className="inline-block rounded-md border border-white/20 bg-white/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                        {g.bidang || 'Umum'}
                      </span>
                      <p className="mt-1.5 text-base font-bold sm:text-lg leading-snug text-white">
                        {g.judul}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <IconCamera className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {galeriTersaring.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-400">
            Belum ada dokumentasi untuk kategori {bidang}.
          </div>
        )}
      </section>

      {/* ===== LIGHTBOX MODAL ===== */}
      {selected && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-4xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <IconX className="h-4 w-4" />
              <span>Tutup</span>
            </button>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
              <img
                src={selected.gambar}
                alt={selected.judul}
                className="max-h-[75vh] w-full object-contain bg-black/40"
              />
              <div className="border-t border-white/10 bg-slate-950/90 p-5 text-center">
                <p className="text-lg font-bold text-white">{selected.judul}</p>
                <p className="mt-1 text-xs font-semibold text-cyan-400">
                  Kategori: {selected.bidang || 'Umum'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
