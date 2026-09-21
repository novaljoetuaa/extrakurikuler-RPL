import { useState } from 'react'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'
import { IconCamera, IconCode, IconPalette, IconRobot, IconX } from '../components/icons'

const bidangFilters = [
  { id: 'Semua', label: 'Semua Bidang', Icon: IconCamera },
  { id: 'Robotic', label: 'Robotic', Icon: IconRobot },
  { id: 'Website', label: 'Website', Icon: IconCode },
  { id: 'Desain Grafis', label: 'Desain Grafis', Icon: IconPalette },
  { id: 'Umum', label: 'Kegiatan Umum', Icon: IconCamera },
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
    <div className="space-y-12 pb-16 md:space-y-16 md:pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/50 py-16 md:py-20 border-b border-slate-200/60">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="badge-pill">
              <span>Dokumentasi Kegiatan</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Galeri Kegiatan</h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-600">
              Koleksi momen berharga selama proses belajar, praktek workshop, dan keikutsertaan lomba siswa Ekstrakurikuler RPL.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-5">
            {bidangFilters.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseBidang(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  bidang === id
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 hover:text-brand-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
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
                className="group relative block w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus:outline-none"
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={g.gambar}
                    alt={g.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-left text-white">
                    <div>
                      <p className="font-display text-base font-bold sm:text-lg leading-snug text-white">{g.judul}</p>
                      <span className="mt-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        {g.bidang || 'Umum'}
                      </span>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
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

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-4xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/30"
            >
              <IconX className="h-4 w-4" />
              Tutup
            </button>
            <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl ring-1 ring-white/10">
              <img
                src={selected.gambar}
                alt={selected.judul}
                className="max-h-[75vh] w-full object-contain"
              />
              <div className="bg-slate-900/90 p-5 text-center">
                <p className="font-display text-lg font-bold text-white">
                  {selected.judul}
                </p>
                <p className="mt-1 text-xs font-semibold text-brand-400">
                  Bidang: {selected.bidang || 'Umum'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

