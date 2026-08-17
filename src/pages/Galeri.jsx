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
        <Reveal>
          <div className="flex flex-col gap-4 rounded-3xl border border-stone-200/70 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink">Jelajahi berdasarkan bidang</p>
              <p className="mt-0.5 text-xs text-stone-500">Pilih sub-bidang untuk melihat dokumentasi yang terpisah.</p>
            </div>
            <select
              value={bidang}
              onChange={(e) => chooseBidang(e.target.value)}
              className="input-field w-full sm:w-52"
              aria-label="Pilih bidang galeri"
            >
              {bidangFilters.map((filter) => <option key={filter.id} value={filter.id}>{filter.label}</option>)}
            </select>
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {bidangFilters.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseBidang(id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  bidang === id ? 'bg-brand-700 text-white shadow-soft' : 'bg-stone-100 text-stone-600 hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galeriTersaring.map((g, i) => (
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
                  <div className="text-left">
                    <p className="font-display text-lg font-semibold text-white">{g.judul}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">{g.bidang || 'Umum'}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                    <IconCamera className="h-5 w-5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        {galeriTersaring.length === 0 && (
          <div className="mt-9 rounded-3xl border border-dashed border-stone-300 p-12 text-center text-stone-500">
            Belum ada dokumentasi untuk bidang {bidang}.
          </div>
        )}
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

