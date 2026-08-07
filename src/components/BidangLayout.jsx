import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import QuickNav from './QuickNav'
import Reveal from './Reveal'
import { IconRobot, IconCode, IconPalette, IconArrowRight, IconCalendar, IconClock, IconMapPin } from './icons'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'

const bidangMeta = {
  Robotic: {
    icon: IconRobot,
    logo: logoRobotic,
    tagline: 'Robotika & Mikrokontroler',
    img: logoRobotic,
  },
  Website: {
    icon: IconCode,
    logo: logoWebsite,
    tagline: 'Pengembangan Web Modern',
    img: logoWebsite,
  },
  'Desain Grafis': {
    icon: IconPalette,
    logo: logoDesain,
    tagline: 'Kreativitas Visual',
    img: logoDesain,
  },
}

export default function BidangLayout({ bidang, deskripsi }) {
  const { data } = useData()
  const meta = bidangMeta[bidang]
  const Icon = meta.icon
  const kegiatanBidang = data.kegiatan.filter((k) => k.bidang === bidang)
  const jadwalBidang = data.jadwal.filter((j) => j.bidang === bidang)

  return (
    <div>
{/* ===== HEADER ===== */}
<section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <p className="eyebrow">Sub-Bidang Keahlian</p>
          </Reveal>
<Reveal delay={120}>
            <div className="mt-4 flex items-center gap-5">
              <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-white p-2 text-brand-600 shadow-soft ring-1 ring-stone-200">
                <img src={meta.logo} alt={`Logo ${bidang}`} className="h-full w-full object-contain" />
              </span>
              <h1 className="font-display text-4xl font-semibold text-slate-800 sm:text-5xl">{bidang}</h1>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-2xl text-lg text-slate-500">{meta.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== DESKRIPSI ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow">Tentang Bidang</p>
            <h2 className="section-title mt-3">Deskripsi Kegiatan</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">{deskripsi}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link to="/pendaftaran" className="btn-primary">
                Daftar Sekarang
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/galeri" className="btn-secondary !border-stone-300 !text-stone-700">
                Lihat Galeri
              </Link>
            </div>
          </Reveal>
<Reveal delay={150} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-stone-200/70 bg-gradient-to-br from-brand-50 via-white to-sky-100 p-10 shadow-lift">
              <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-brand-100/70 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-14 h-48 w-48 rounded-full bg-gold-100/70 blur-3xl" />
              <div className="relative flex h-56 items-center justify-center">
                <img
                  src={meta.logo}
                  alt={`Logo ${bidang}`}
                  loading="lazy"
                  className="h-44 w-auto max-w-full object-contain drop-shadow-lg"
                />
              </div>
              <div className="relative mt-6 rounded-2xl border border-stone-200/70 bg-white/90 p-4 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Jadwal Latihan</p>
                {jadwalBidang[0] ? (
                  <div className="mt-2 flex items-center gap-3 text-sm font-semibold text-ink">
                    <IconCalendar className="h-4 w-4 text-brand-600" />
                    {jadwalBidang[0].hari} · {jadwalBidang[0].waktu}
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-stone-500">Menyesuaikan</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== KEGIATAN ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Materi & Aktivitas</p>
            <h2 className="section-title mt-3">Kegiatan {bidang}</h2>
          </Reveal>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {kegiatanBidang.map((k, i) => (
              <Reveal key={k.id} delay={i * 120}>
                <div className="group overflow-hidden rounded-[2rem] border border-stone-200/70 bg-cream shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={k.gambar}
                      alt={k.judul}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
<span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-1 backdrop-blur">
                      <img src={meta.logo} alt={`Logo ${bidang}`} className="h-full w-full object-contain" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-ink">{k.judul}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">{k.deskripsi}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            {kegiatanBidang.length === 0 && (
              <div className="col-span-full rounded-3xl border border-dashed border-stone-300 p-12 text-center text-stone-400">
                Belum ada kegiatan untuk bidang ini.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== JADWAL ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Waktu & Tempat</p>
          <h2 className="section-title mt-3">Jadwal Latihan</h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl">
          {jadwalBidang.map((j, i) => (
            <Reveal key={j.id} delay={i * 120}>
              <div className="mb-4 flex flex-col gap-4 rounded-3xl border border-stone-200/70 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <IconCalendar className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">{j.hari}</p>
                    <p className="text-sm text-stone-500">{j.tempat}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gold-100 px-4 py-2 text-sm font-bold text-gold-700">
                  <IconClock className="h-4 w-4" />
                  {j.waktu}
                </div>
              </div>
            </Reveal>
          ))}
          {jadwalBidang.length === 0 && (
            <div className="rounded-3xl border border-dashed border-stone-300 p-12 text-center text-stone-400">
              Belum ada jadwal untuk bidang ini.
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal>
<div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50 to-gold-100 p-10 md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="eyebrow">Gabung Sekarang</p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-slate-800">Tertarik dengan Bidang {bidang}?</h3>
                <p className="mt-2 text-slate-500">Daftarkan dirimu dan mulai perjalananmu di dunia {bidang.toLowerCase()}.</p>
              </div>
              <Link to="/pendaftaran" className="btn-primary shrink-0">
                Daftar Sekarang
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <QuickNav />
    </div>
  )
}

