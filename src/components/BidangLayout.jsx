import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import QuickNav from './QuickNav'
import Reveal from './Reveal'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'
import logoAi from '../../assets/ai.png'
import logoGame from '../../assets/game.png'

const bidangMeta = {
  Robotic: {
    icon: 'fas fa-robot',
    logo: logoRobotic,
    tagline: 'Robotika, IoT & Mikrokontroler',
    badge: 'Hardware & IoT',
  },
  Website: {
    icon: 'fas fa-code',
    logo: logoWebsite,
    tagline: 'Modern Web Development & React',
    badge: 'Fullstack Web',
  },
  'Desain Grafis': {
    icon: 'fas fa-palette',
    logo: logoDesain,
    tagline: 'UI/UX, Branding & Visual Content',
    badge: 'Visual & Branding',
  },
  'Artificial Intelligence': {
    icon: 'fas fa-brain',
    logo: logoAi,
    tagline: 'Machine Learning & Data Cerdas',
    badge: 'AI & Data Science',
  },
  Game: {
    icon: 'fas fa-gamepad',
    logo: logoGame,
    tagline: 'Game Design & Development',
    badge: 'Game & Interaktif',
  },
}

export default function BidangLayout({ bidang, deskripsi }) {
  const { data } = useData()
  const meta = bidangMeta[bidang] || bidangMeta['Robotic']
  const kegiatanBidang = (data.kegiatan || []).filter((k) => k.bidang === bidang)
  const jadwalBidang = (data.jadwal || []).filter((j) => j.bidang === bidang)

  return (
    <div className="space-y-12 pb-20 pt-6">
      {/* ===== HEADER BANNER ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-10 shadow-card">
          <div className="badge-bidang">
            <i className={`${meta.icon} text-xs text-slate-900`} />
            <span>SUB-BIDANG EKSTRAKURIKULER</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-1.5 shadow-sm sm:h-20 sm:w-20">
              <img src={meta.logo} alt={`Logo ${bidang}`} className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {bidang}
                </h1>
                <span className="badge-bidang">{meta.badge}</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">{meta.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESKRIPSI & OVERVIEW ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-card">
            <div className="badge-bidang">
              <i className="fas fa-info-circle text-xs text-slate-900" />
              <span>TENTANG PROGRAM</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              Mengenal Program {bidang}
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">
              {deskripsi}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/pendaftaran" className="btn-primary">
                <span>Daftar Bidang {bidang}</span>
                <i className="fas fa-arrow-right text-xs" />
              </Link>
              <Link to="/artikel" className="btn-secondary">
                <span>Artikel Terkait</span>
                <i className="fas fa-newspaper text-xs" />
              </Link>
            </div>
          </div>

          {/* Right Visual & Schedule Card */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-card">
            <div className="flex h-40 items-center justify-center rounded-2xl border-2 border-slate-200 bg-slate-100 p-4">
              <img
                src={meta.logo}
                alt={`Logo ${bidang}`}
                className="h-32 w-auto object-contain"
              />
            </div>

            <div className="mt-5 rounded-2xl border-2 border-slate-200 bg-slate-100 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <i className="fas fa-calendar-check text-slate-900" />
                <span>Jadwal Latihan Rutin</span>
              </div>
              {jadwalBidang[0] ? (
                <div className="mt-2 text-xs sm:text-sm font-bold text-slate-900 space-y-1">
                  <p className="text-slate-900">
                    {jadwalBidang[0].hari} â€¢ {jadwalBidang[0].waktu}
                  </p>
                  <p className="text-xs text-slate-700 font-semibold">
                    <i className="fas fa-location-dot mr-1" />
                    {jadwalBidang[0].tempat}
                  </p>
                </div>
              ) : (
                <p className="mt-1 text-xs text-slate-700">Menyesuaikan pengumuman pembina.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEGIATAN SPESIFIK ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b-2 border-slate-200 pb-4">
          <div className="badge-bidang">
            <i className="fas fa-images text-xs text-slate-900" />
            <span>DOKUMENTASI</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Kegiatan Bidang {bidang}
          </h2>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kegiatanBidang.map((k, i) => (
            <Reveal key={k.id} delay={i * 80}>
              <div className="card-hover flex h-full flex-col overflow-hidden">
                <div className="relative h-44 w-full overflow-hidden border-b-2 border-slate-200 bg-slate-900">
                  <img
                    src={k.gambar}
                    alt={k.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute left-3.5 top-3.5 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-900">
                    {k.bidang}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold text-slate-900">{k.judul}</h3>
                  <p className="mt-2 text-xs text-slate-700 leading-relaxed line-clamp-3">{k.deskripsi}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {kegiatanBidang.length === 0 && (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center text-xs font-bold text-slate-700">
              Belum ada dokumentasi kegiatan khusus untuk bidang {bidang}.
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-slate-200 bg-slate-900 p-8 sm:p-10 text-white shadow-card">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
            <div>
              <span className="badge-bidang !border-slate-200 !bg-slate-100 !text-slate-900">
                REGISTRASI
              </span>
              <h3 className="font-display text-2xl font-bold mt-2 text-white">Tertarik dengan Bidang {bidang}?</h3>
              <p className="mt-1 text-xs text-slate-200">
                Daftarkan dirimu melalui formulir pendaftaran resmi Ekstrakurikuler RPL SMK Krian 1.
              </p>
            </div>
            <Link to="/pendaftaran" className="btn-primary !bg-slate-700 hover:!bg-white hover:!text-slate-900">
              <span>Daftar Sekarang</span>
              <i className="fas fa-arrow-right text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUICK SWITCHER ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <QuickNav title="Jelajahi Sub-Bidang Lainnya" />
      </section>
    </div>
  )
}
