import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import QuickNav from './QuickNav'
import Reveal from './Reveal'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'

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
        <div className="rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-10 shadow-card">
          <div className="badge-bidang">
            <i className={`${meta.icon} text-xs text-[#2196F3]`} />
            <span>SUB-BIDANG EKSTRAKURIKULER</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#90CAF9] bg-white p-1.5 shadow-sm sm:h-20 sm:w-20">
              <img src={meta.logo} alt={`Logo ${bidang}`} className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-3xl font-bold tracking-tight text-[#0D47A1] sm:text-4xl">
                  {bidang}
                </h1>
                <span className="badge-bidang">{meta.badge}</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-[#0D47A1]/80">{meta.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESKRIPSI & OVERVIEW ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-8 shadow-card">
            <div className="badge-bidang">
              <i className="fas fa-info-circle text-xs text-[#2196F3]" />
              <span>TENTANG PROGRAM</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1] mt-2">
              Mengenal Program {bidang}
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#0D47A1]/85">
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
          <div className="lg:col-span-5 rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-8 shadow-card">
            <div className="flex h-40 items-center justify-center rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-4">
              <img
                src={meta.logo}
                alt={`Logo ${bidang}`}
                className="h-32 w-auto object-contain"
              />
            </div>

            <div className="mt-5 rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
                <i className="fas fa-calendar-check text-[#2196F3]" />
                <span>Jadwal Latihan Rutin</span>
              </div>
              {jadwalBidang[0] ? (
                <div className="mt-2 text-xs sm:text-sm font-bold text-[#0D47A1] space-y-1">
                  <p className="text-[#2196F3]">
                    {jadwalBidang[0].hari} • {jadwalBidang[0].waktu}
                  </p>
                  <p className="text-xs text-[#0D47A1]/70 font-semibold">
                    <i className="fas fa-location-dot mr-1" />
                    {jadwalBidang[0].tempat}
                  </p>
                </div>
              ) : (
                <p className="mt-1 text-xs text-[#0D47A1]/70">Menyesuaikan pengumuman pembina.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEGIATAN SPESIFIK ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b-2 border-[#90CAF9] pb-4">
          <div className="badge-bidang">
            <i className="fas fa-images text-xs text-[#2196F3]" />
            <span>DOKUMENTASI</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1] mt-1">
            Kegiatan Bidang {bidang}
          </h2>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kegiatanBidang.map((k, i) => (
            <Reveal key={k.id} delay={i * 80}>
              <div className="card-hover flex h-full flex-col overflow-hidden">
                <div className="relative h-44 w-full overflow-hidden border-b-2 border-[#90CAF9] bg-[#0D47A1]">
                  <img
                    src={k.gambar}
                    alt={k.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute left-3.5 top-3.5 rounded-lg border border-[#90CAF9] bg-[#E3F2FD] px-2.5 py-1 text-xs font-bold text-[#0D47A1]">
                    {k.bidang}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold text-[#0D47A1]">{k.judul}</h3>
                  <p className="mt-2 text-xs text-[#0D47A1]/80 leading-relaxed line-clamp-3">{k.deskripsi}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {kegiatanBidang.length === 0 && (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-[#90CAF9] bg-white p-8 text-center text-xs font-bold text-[#0D47A1]/60">
              Belum ada dokumentasi kegiatan khusus untuk bidang {bidang}.
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-[#90CAF9] bg-[#0D47A1] p-8 sm:p-10 text-white shadow-card">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
            <div>
              <span className="badge-bidang !border-[#90CAF9] !bg-[#E3F2FD] !text-[#0D47A1]">
                REGISTRASI
              </span>
              <h3 className="font-display text-2xl font-bold mt-2 text-[#E3F2FD]">Tertarik dengan Bidang {bidang}?</h3>
              <p className="mt-1 text-xs text-[#90CAF9]">
                Daftarkan dirimu melalui formulir pendaftaran resmi Ekstrakurikuler RPL SMK Krian 1.
              </p>
            </div>
            <Link to="/pendaftaran" className="btn-primary !bg-[#2196F3] hover:!bg-white hover:!text-[#0D47A1]">
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
