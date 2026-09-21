import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'
import PromoCarousel from '../components/PromoCarousel'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'

const bidangList = [
  {
    to: '/robotic',
    title: 'Robotik',
    tagline: 'Robotika & Mikrokontroler',
    icon: 'fas fa-robot',
    logo: logoRobotic,
    desc: 'Merakit dan memprogram robot dari dasar elektronika, sensor otomatis, hingga siap bertanding dalam kejuaraan robotika tingkat pelajar.',
    points: ['Dasar Elektronika & Rangkaian Sensor', 'Pemrograman Arduino & Mikrokontroler', 'Proyek Robot Line Follower & IoT'],
  },
  {
    to: '/website',
    title: 'Website & Pemrograman',
    tagline: 'Pengembangan Web Modern',
    icon: 'fas fa-code',
    logo: logoWebsite,
    desc: 'Membangun aplikasi web interaktif berstandar industri, mulai dari dasar HTML, CSS, JavaScript hingga framework React dan Tailwind CSS.',
    points: ['HTML5, CSS3 & JavaScript Modern', 'Arsitektur Komponen React', 'Deployment & Integrasi API Web'],
  },
  {
    to: '/desain-grafis',
    title: 'Desain Grafis',
    tagline: 'UI/UX & Desain Visual',
    icon: 'fas fa-palette',
    logo: logoDesain,
    desc: 'Mengasah kreativitas visual melalui pembuatan poster, konten media sosial, antarmuka UI/UX aplikasi, dan identitas branding profesional.',
    points: ['Prinsip Komposisi & Tipografi Geometris', 'Desain UI/UX Aplikasi & Wireframe', 'Branding, Desain Logo & Vektor'],
  },
]

export default function Home() {
  const { data } = useData()
  const { artikel = [], pengumuman = [] } = data
  const [activeArticle, setActiveArticle] = useState(null)

  return (
    <div className="space-y-12 pb-20 pt-6">
      {/* ===== 1. ANIMATED PROMO BANNER (PRD Section 3.3) ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PromoCarousel />
      </section>

      {/* ===== 2. HERO HIGHLIGHT EKSTRAKURIKULER RPL ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-10 shadow-card">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Col */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#90CAF9] bg-[#E3F2FD] px-3 py-1 text-xs font-bold text-[#0D47A1]">
                <i className="fas fa-users-gear text-xs text-[#2196F3]" />
                <span>EKSTRAKURIKULER RPL SMK KRIAN 1</span>
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#0D47A1] sm:text-4xl lg:text-5xl leading-tight">
                Pusat Eksplorasi & Publikasi Ekstrakurikuler Siswa
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-[#0D47A1]/80 leading-relaxed max-w-2xl">
                Ekstrakurikuler RPL dirancang untuk mempermudah siswa mengeksplorasi kegiatan ekstrakurikuler sekolah, mendaftar secara terstruktur, dan memantau karya sains, teknologi, serta desain visual secara terpadu.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/pendaftaran"
                  className="btn-primary"
                >
                  <i className="fas fa-user-plus text-xs" />
                  <span>Daftar Anggota Sekarang</span>
                </Link>
                <Link
                  to="/artikel"
                  className="btn-secondary"
                >
                  <i className="fas fa-newspaper text-xs" />
                  <span>Jelajahi Artikel Siswa</span>
                </Link>
              </div>
            </div>

            {/* Right Col: 3 Quick Metric Cards */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-3">
              <div className="rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-4 text-center">
                <p className="font-display text-2xl font-bold text-[#0D47A1]">3 Bidang Utama</p>
                <p className="text-xs font-semibold text-[#0D47A1]/70 mt-0.5">Robotik, Web & Desain</p>
              </div>
              <div className="rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-4 text-center">
                <p className="font-display text-2xl font-bold text-[#0D47A1]">50+ Proyek Siswa</p>
                <p className="text-xs font-semibold text-[#0D47A1]/70 mt-0.5">Karya aplikasi & robotika</p>
              </div>
              <div className="rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-4 text-center">
                <p className="font-display text-2xl font-bold text-[#0D47A1]">10+ Kejuaraan</p>
                <p className="text-xs font-semibold text-[#0D47A1]/70 mt-0.5">Prestasi di berbagai ajang</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. SUB-BIDANG EKSTRAKURIKULER ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="badge-bidang">
            <i className="fas fa-users-gear text-xs text-[#2196F3]" />
            <span>FOKUS KEGIATAN</span>
          </div>
          <h2 className="section-title mt-2">Tiga Bidang Peminatan Ekstrakurikuler</h2>
          <p className="section-subtitle">
            Pilih bidang yang paling sesuai dengan passion dan tujuan belajarmu di SMK Krian 1.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {bidangList.map((b, i) => (
            <Reveal key={b.to} delay={i * 100}>
              <div className="card-hover flex h-full flex-col p-6 sm:p-7 justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-1.5 shadow-sm">
                      <img src={b.logo} alt={b.title} className="h-full w-full object-contain" />
                    </div>
                    <span className="badge-bidang">{b.tagline}</span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-[#0D47A1]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#0D47A1]/80 leading-relaxed">
                    {b.desc}
                  </p>

                  <div className="mt-5 border-t border-[#90CAF9]/40 pt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0D47A1]">
                      Materi Inti:
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {b.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs font-semibold text-[#0D47A1]">
                          <i className="fas fa-check text-[#2196F3] text-xs mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#90CAF9]/40">
                  <Link
                    to={b.to}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#90CAF9] bg-[#E3F2FD] px-4 py-2.5 text-xs font-bold text-[#0D47A1] transition hover:bg-[#2196F3] hover:text-white"
                  >
                    <span>Detail Program {b.title}</span>
                    <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 4. ANIMATED ARTICLES FEED (PRD Section 3.3 & 3.4) ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#90CAF9] pb-4">
          <div>
            <div className="badge-bidang">
              <i className="fas fa-newspaper text-xs text-[#2196F3]" />
              <span>PUBLIKASI TERBARU</span>
            </div>
            <h2 className="section-title mt-1">Feed Artikel Sains, Teknologi & Desain</h2>
            <p className="section-subtitle">
              Karya tulis, panduan teknis, dan portofolio pembelajaran siswa Ekstrakurikuler RPL.
            </p>
          </div>
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2196F3] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0D47A1]"
          >
            <span>Semua Artikel</span>
            <i className="fas fa-arrow-right text-xs" />
          </Link>
        </div>

        {/* Scroll-Reveal Feed Cards (PRD Section 3.3: Fade Up & Hover TranslateY with border #90CAF9) */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artikel.slice(0, 3).map((art, idx) => (
            <Reveal key={art.id} delay={idx * 120}>
              <div className="card-hover flex h-full flex-col overflow-hidden">
                {/* Thumbnail Image */}
                <div className="relative h-44 w-full overflow-hidden border-b-2 border-[#90CAF9] bg-[#0D47A1]">
                  <img
                    src={art.gambar}
                    alt={art.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Badge Bidang (PRD 3.4: Latar #E3F2FD, border #90CAF9, teks & ikon #0D47A1) */}
                  <div className="absolute left-3.5 top-3.5 rounded-lg border border-[#90CAF9] bg-[#E3F2FD] px-2.5 py-1 text-xs font-bold text-[#0D47A1] shadow-sm">
                    <i className={`${art.icon || 'fas fa-newspaper'} mr-1.5 text-xs text-[#2196F3]`} />
                    <span>{art.bidang}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1]/60">
                      {art.tanggal} • Oleh {art.penulis}
                    </span>
                    {/* Judul & Summary (PRD 3.4: Teks tebal #0D47A1 font Space Grotesk) */}
                    <h3 className="mt-2 font-display text-base font-bold text-[#0D47A1] leading-snug line-clamp-2">
                      {art.judul}
                    </h3>
                    <p className="mt-2 text-xs text-[#0D47A1]/80 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  {/* Tombol Aksi (PRD 3.4: Tombol "Baca Selengkapnya" warna #2196F3 dengan fas fa-arrow-right) */}
                  <div className="mt-5 pt-4 border-t border-[#90CAF9]/40">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(art)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#0D47A1] active:scale-[0.98]"
                    >
                      <span>Baca Selengkapnya</span>
                      <i className="fas fa-arrow-right text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 5. PENGUMUMAN SEKOLAH TERKINI ===== */}
      {pengumuman.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-2.5">
              <i className="fas fa-bullhorn text-[#2196F3] text-lg" />
              <h2 className="font-display text-xl font-bold text-[#0D47A1]">
                Pengumuman Ekstrakurikuler
              </h2>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {pengumuman.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-4 text-[#0D47A1]"
                >
                  <span className="rounded-md border border-[#90CAF9] bg-white px-2 py-0.5 text-[10px] font-bold text-[#0D47A1]">
                    {p.tanggal}
                  </span>
                  <h3 className="mt-2 text-sm font-bold">{p.judul}</h3>
                  <p className="mt-1 text-xs text-[#0D47A1]/80 leading-relaxed">{p.isi}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 6. CTA BANNER PENDAFTARAN ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-[#90CAF9] bg-[#0D47A1] p-8 sm:p-12 text-center text-[#E3F2FD] shadow-card">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] text-[#0D47A1] mb-4">
              <i className="fas fa-rocket text-2xl text-[#2196F3]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E3F2FD]">
              Siap Menjadi Bagian dari Ekstrakurikuler RPL?
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#90CAF9] leading-relaxed">
              Tingkatkan keahlian teknologimu, rakit proyek impian, dan bergabunglah bersama komunitas siswa berprestasi di SMK Krian 1 Sidoarjo.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/pendaftaran"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2196F3] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0D47A1] active:scale-[0.98]"
              >
                <i className="fas fa-user-plus" />
                <span>Daftar Sekarang (Alur 5 Langkah)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Modal Baca Selengkapnya ===== */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-8 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#90CAF9]/40 pb-4">
              <div className="badge-bidang">
                <i className={`${activeArticle.icon || 'fas fa-newspaper'} text-xs text-[#2196F3]`} />
                <span>{activeArticle.bidang}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#90CAF9] text-[#0D47A1] hover:bg-[#E3F2FD]"
              >
                <i className="fas fa-xmark text-sm" />
              </button>
            </div>

            <div className="mt-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1] leading-tight">
                {activeArticle.judul}
              </h2>
              <p className="mt-1 text-xs text-[#0D47A1]/60 font-semibold">
                {activeArticle.tanggal} • Oleh {activeArticle.penulis}
              </p>

              <div className="my-4 overflow-hidden rounded-2xl border border-[#90CAF9]">
                <img
                  src={activeArticle.gambar}
                  alt={activeArticle.judul}
                  className="max-h-64 w-full object-cover"
                />
              </div>

              <div className="rounded-xl border border-[#90CAF9] bg-[#E3F2FD] p-4 text-xs sm:text-sm font-semibold text-[#0D47A1]">
                <strong className="block mb-1 font-bold">Ringkasan Materi:</strong>
                {activeArticle.summary}
              </div>

              <div className="mt-4 text-xs sm:text-sm text-[#0D47A1] leading-relaxed">
                {activeArticle.konten}
              </div>
            </div>

            <div className="mt-6 border-t border-[#90CAF9]/40 pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="btn-primary"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
