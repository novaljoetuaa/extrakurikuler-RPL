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
  const kegiatanBidang = data.kegiatan.filter((k) => k.bidang === bidang)
  const jadwalBidang = data.jadwal.filter((j) => j.bidang === bidang)

  return (
    <div className="space-y-16 pb-16 md:space-y-24 md:pb-24">
      {/* ===== HEADER BANNER ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/50 py-16 md:py-20 border-b border-slate-200/60">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="badge-pill">
              <span>Sub-Bidang Keahlian</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-soft ring-1 ring-slate-200 sm:h-20 sm:w-20">
                <img src={meta.logo} alt={`Logo ${bidang}`} className="h-full w-full object-contain" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">{bidang}</h1>
                <p className="mt-1 text-sm sm:text-base font-medium text-slate-600">{meta.tagline}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== DESKRIPSI & OVERVIEW ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left info */}
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Tentang Program</p>
            <h2 className="section-title mt-2">Mengenal Lebih Dekat Bidang {bidang}</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">{deskripsi}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link to="/pendaftaran" className="btn-primary">
                Daftar Bidang {bidang}
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/galeri" className="btn-secondary">
                Lihat Dokumentasi
              </Link>
            </div>
          </Reveal>

          {/* Right visual card */}
          <Reveal delay={150} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-brand-50/50 p-8 shadow-lift">
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand-100/50 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-sky-100/50 blur-2xl" />

              <div className="relative flex h-52 items-center justify-center">
                <img
                  src={meta.logo}
                  alt={`Logo ${bidang}`}
                  loading="lazy"
                  className="h-40 w-auto max-w-full object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Schedule Info Box */}
              <div className="relative mt-6 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Jadwal Latihan Rutin</p>
                {jadwalBidang[0] ? (
                  <div className="mt-2 space-y-1 text-sm font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      <IconCalendar className="h-4 w-4 text-brand-600 shrink-0" />
                      <span>{jadwalBidang[0].hari} · {jadwalBidang[0].waktu}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-normal text-slate-500">
                      <IconMapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{jadwalBidang[0].tempat}</span>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-slate-500">Jadwal menyesuaikan pengumuman pembina</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== KEGIATAN SUB-BIDANG ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Aktivitas & Pembelajaran</p>
          <h2 className="section-title mt-2">Kegiatan Bidang {bidang}</h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Berikut adalah beberapa agenda rutin, materi praktek, dan proyek yang dikerjakan.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {kegiatanBidang.map((k, i) => (
            <Reveal key={k.id} delay={i * 120}>
              <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={k.gambar}
                    alt={k.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3.5 top-3.5 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-1 backdrop-blur-md shadow-sm">
                    <img src={meta.logo} alt={`Logo ${bidang}`} className="h-full w-full object-contain" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">{k.judul}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{k.deskripsi}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {kegiatanBidang.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-400">
              Belum ada data kegiatan spesifik untuk bidang {bidang}.
            </div>
          )}
        </div>
      </section>

      {/* ===== JADWAL LATIHAN DETAIL ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Waktu & Tempat</p>
          <h2 className="section-title mt-2">Jadwal Pertemuan</h2>
        </Reveal>

        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          {jadwalBidang.map((j, i) => (
            <Reveal key={j.id} delay={i * 100}>
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition sm:flex-row sm:items-center sm:justify-between hover:border-brand-300">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shrink-0">
                    <IconCalendar className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-slate-900">{j.hari}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <IconMapPin className="h-3.5 w-3.5" />
                      <span>{j.tempat}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700">
                  <IconClock className="h-4 w-4 text-brand-600" />
                  <span>{j.waktu}</span>
                </div>
              </div>
            </Reveal>
          ))}

          {jadwalBidang.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-400">
              Belum ada jadwal khusus yang ditambahkan untuk bidang {bidang}.
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 p-8 sm:p-12 text-white shadow-lift">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-200">Gabung Sekarang</p>
                <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold">Tertarik dengan Bidang {bidang}?</h3>
                <p className="mt-1 text-sm sm:text-base text-brand-100">Daftarkan dirimu dan mulai belajar bersama kami di SMK Krian 1.</p>
              </div>
              <Link to="/pendaftaran" className="inline-flex items-center gap-2 shrink-0 rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-700 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50">
                Daftar Sekarang
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== QUICK SWITCHER ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <QuickNav title="Jelajahi Sub-Bidang Lainnya" />
      </section>
    </div>
  )
}

